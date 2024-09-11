<script setup lang="ts">
const { userSession } = useAuthStore();
</script>
<template>
  <div>
    <div>Olá, {{ userSession.email }}!</div>
    <div>Bem vindo ao <v-icon>mdi-cow</v-icon></div>
  </div>
</template>
