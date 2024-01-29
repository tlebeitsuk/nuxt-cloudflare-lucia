<script lang="ts" setup>
const { data } = await useFetch("/api/user")

if (!data.value) {
  navigateTo("/login")
}

async function handleLogout() {
  try {
    await $fetch("/api/logout", {
      method: "POST",
    })

    navigateTo("/login")
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <UContainer class="h-screen flex justify-center items-center">
    <UCard>
      <template #header>
        This page is protected and can only be accessed by authenticated users.
      </template>

      <pre class="code">{{ JSON.stringify(data, null, 2) }}</pre>
      <template #footer class="foat-right">
        <UButton label="Logout" @click="handleLogout" />
      </template>
    </UCard>
  </UContainer>
</template>
