export default eventHandler(async (event) => {
  const todos = await useDb().select().from(tables.todos).all()

  return todos
})
