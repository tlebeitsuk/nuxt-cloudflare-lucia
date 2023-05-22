<script setup lang="ts">
const newTodo = ref("");

const { data: todos } = await useFetch("/api/todos");

async function addTodo() {
  const todo = await $fetch("/api/todos", {
    method: "POST",
    body: {
      title: newTodo.value,
    },
  });

  todos.value.push(todo);
  newTodo.value = "";
}
</script>

<template>
  <div>
    <input v-model="newTodo" />
    <button @click="addTodo">Add</button>
  </div>

  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.title }}
    </li>
  </ul>
</template>
