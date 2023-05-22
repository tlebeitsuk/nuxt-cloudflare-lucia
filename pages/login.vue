<script setup lang="ts">
const email = ref("");
const password = ref("");
const toast = useToast();

async function handleLogin() {
  if (!email.value || !password.value) return;

  const data = await $fetch("/api/login", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  });

  if (data) {
    toast.add({ title: data.error });
    return;
  }

  navigateTo("/");
}
</script>

<template>
  <UContainer class="h-screen flex justify-center items-center">
    <UCard class="w-80">
      <template #header> Login </template>
      <div class="space-y-3">
        <UInput
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
          icon="i-heroicons-envelope"
        />
        <UInput
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
          icon="i-heroicons-lock-closed"
        />
      </div>
      <template #footer>
        <div class="flex gap-3 justify-end">
          <UButton label="Sign up" variant="outline" to="/register" />
          <UButton label="Login" @click="handleLogin" />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
