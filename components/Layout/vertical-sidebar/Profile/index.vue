<template>
  <v-sheet rounded="md" color="lightsecondary" class="px-4 py-3 ExtraBox">
    <div class="d-flex align-center hide-menu">
      <v-avatar size="40">
        <img src="/images/profile/user-1.jpg" alt="user" height="40" />
      </v-avatar>
      <div class="ml-4">
        <h4 class="mb-n1 text-h6 textPrimary">
          {{ userSession.name.split(" ")[0] }}
        </h4>
      </div>
      <div class="ml-auto">
        <v-btn
          variant="text"
          icon
          rounded="md"
          color="error"
          :loading="loadingSignOut"
          @click="signOut"
        >
          <PowerIcon />
          <v-tooltip activator="parent" location="top">Sair</v-tooltip>
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>
<script setup lang="ts">
import { PowerIcon } from "vue-tabler-icons";
import { useRouter } from "vue-router";

const { push } = useRouter();
const { HANDLE_SIGN_OUT, userSession } = useAuthStore();
const loadingSignOut = ref(false);

const signOut = async () => {
  loadingSignOut.value = true;
  try {
    await HANDLE_SIGN_OUT();
    push("/auth/login");
  } catch (error) {
    console.error(error);
  } finally {
    loadingSignOut.value = false;
  }
};
</script>

<style lang="scss">
.ExtraBox {
  position: relative;
  overflow: hidden;
}
.line-height-none {
  line-height: normal;
}
</style>
