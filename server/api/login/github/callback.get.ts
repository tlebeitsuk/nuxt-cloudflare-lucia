import { OAuth2RequestError } from "arctic"
import { generateId } from "lucia"
import { github } from "@/server/utils/auth"
import { eq, sql, and } from "drizzle-orm"
import { oauth_account, user } from "@/server/db/schema"

export default defineEventHandler(async (event) => {
  const lucia = event.context.lucia
  const db = event.context.db
  const query = getQuery(event)
  const code = query.code?.toString() ?? null
  const state = query.state?.toString() ?? null
  const storedState = getCookie(event, "github_oauth_state") ?? null

  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    })
  }

  try {
    const tokens = await github.validateAuthorizationCode(code)
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    })
    const githubUser: GitHubUser = await githubUserResponse.json()
    const existingUser = await db
      .select()
      .from(oauth_account)
      .where(
        and(
          eq(oauth_account.providerId, "github"),
          eq(oauth_account.providerUserId, sql.placeholder("id"))
        )
      )
      .prepare()
      .get({ id: githubUser.id })

    if (existingUser) {
      const session = await lucia.createSession(existingUser.userId, {})
      appendHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      )
      return sendRedirect(event, "/")
    }

    const userId = generateId(15)
    await db.batch([
      db.insert(user).values({
        id: userId,
        username: githubUser.login,
      }),
      db.insert(oauth_account).values({
        providerId: "github",
        providerUserId: githubUser.id,
        userId,
      }),
    ])
    const session = await lucia.createSession(userId, {})
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    )
    return sendRedirect(event, "/")
  } catch (e) {
    console.error(e)
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      throw createError({
        status: 400,
      })
    }
    throw createError({
      status: 500,
    })
  }
})

interface GitHubUser {
  id: string
  login: string
}
