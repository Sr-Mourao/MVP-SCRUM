<script setup lang="ts">
const { userSession } = useAuthStore();
const { $axios } = useNuxtApp();

onMounted(async () => {
  const { data } = await $axios.get(
    "https://brasilapi.com.br/api/cep/v1/68901300"
  );
  console.log(data);
});
</script>
<template>
  <div>Olá, {{ userSession.email }}!</div>
</template>
