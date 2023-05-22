import { useValidatedBody, z } from 'h3-zod'
import { LuciaError } from "lucia-auth";

export default defineEventHandler(async (event) => {
  const { email, password } = await useValidatedBody(event, {
    email: z.string().email(),
    password: z.string().min(6)
  })

  try {
    const user = await auth.createUser({
      primaryKey: {
        providerId: "email",
        providerUserId: email,
        password
      },
      attributes: {
        email
      }
    });
    const session = await auth.createSession(user.userId);
    const authRequest = auth.handleRequest(event);
    authRequest.setSession(session);
    return null;
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
