import { useValidatedBody, z } from 'h3-zod'
import { LuciaError } from "lucia-auth";

export default defineEventHandler(async (event) => {
  const { email, password } = await useValidatedBody(event, {
    email: z.string().email(),
    password: z.string().min(8).max(128)
  })

  try {
    const user = await useAuth().createUser({
      primaryKey: {
        providerId: "email",
        providerUserId: email,
        password
      },
      attributes: {
        email
      }
    });
    const session = await useAuth().createSession(user.userId);
    const authRequest = useAuth().handleRequest(event);
    authRequest.setSession(session);
    return null
  } catch (error) {
    if (
      error instanceof LuciaError &&
      error.message === "AUTH_DUPLICATE_KEY_ID"
    ) {
      return {
        error: "Email in use"
      };
    }
    // database connection error
    console.log(error);
    return {
      error: "An unknown error occurred"
    };
  }
});
