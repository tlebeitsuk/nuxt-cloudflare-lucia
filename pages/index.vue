<script lang="ts" setup>
const { data } = await useFetch("/api/user");
if (!data.value) throw createError("Failed to fetch data");

const user = data.value.user;
if (!user) await navigateTo("/login");

const handleLogout = async () => {
  try {
    const data = await $fetch("/api/logout", {
      method: "POST",
    });
    if (data) {
      return;
    }
    navigateTo("/login");
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <UContainer class="h-screen flex justify-center items-center">
    <UCard>
      <template #header>
        This page is protected and can only be accessed by authenticated users.
      </template>

      <pre class="code">{{ JSON.stringify(user, null, 2) }}</pre>
      <template #footer class="foat-right">
        <UButton label="Logout" @click="handleLogout" />
      </template>
    </UCard>
  </UContainer>
</template>
