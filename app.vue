<script setup lang="ts">
const { data: todos } = await useFetch("/api/todos");
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.title }}
    </li>
  </ul>
</template>
