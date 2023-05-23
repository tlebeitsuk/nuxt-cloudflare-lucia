export default defineEventHandler(async (event) => {
  const authRequest = useAuth().handleRequest(event);
  const { session } = await authRequest.validateUser();

  if (!session) {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized"
		});
  }

	await useAuth().invalidateSession(session.sessionId); // invalidate current session
	authRequest.setSession(null); // remove session cookie
  return null;
});
