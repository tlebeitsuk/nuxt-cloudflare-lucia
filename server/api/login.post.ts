import { useValidatedBody, z } from 'h3-zod'
import { LuciaError } from "lucia-auth";

export default defineEventHandler(async (event) => {
  const { email, password } = await useValidatedBody(event, {
    email: z.string().email(),
    password: z.string().min(6)
  })

  try {
    const authRequest = auth.handleRequest(event);
    const key = await auth.useKey("email", email, password);
    const session = await auth.createSession(key.userId);
    authRequest.setSession(session);
    return null;
  } catch (error) {
    if (
      error instanceof LuciaError &&
      (error.message === "AUTH_INVALID_KEY_ID" ||
        error.message === "AUTH_INVALID_PASSWORD")
    ) {
      return {
        error: "Incorrect username or password"
      };
    }
    // database connection error
    console.log(error);
    return {
      error: "An unknown error occurred"
    };
  }
});
