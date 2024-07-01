<template>
  <v-container>
    <div class="text-center">LOGIN FEITO OK</div>
    <div>
      Olá,
      <pre>
      {{ store.userSession }}
    </pre
      >
    </div>
    <v-btn @click="signOut" color="error" :loading="loadingSignOut">sair</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useAuthStore();
const loadingSignOut = ref(false);

const signOut = async () => {
  loadingSignOut.value = true;
  try {
    await store.SIGN_OUT();
    router.push("/auth/login");
  } catch (error) {
    console.error(error);
  } finally {
    loadingSignOut.value = false;
  }
};
</script>
