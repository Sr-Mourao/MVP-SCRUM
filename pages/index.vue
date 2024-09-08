<script setup lang="ts">
const { userSession } = useAuthStore();
</script>
<template>
  <div>Olá, {{ userSession.email }}!</div>
</template>
