<script setup lang="ts">
import { MailIcon } from "vue-tabler-icons";

const { HANDLE_SIGN_OUT, userSession } = useAuthStore();
const { push } = useRouter();
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
<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
        <v-avatar size="35">
          <img src="/images/profile/user-1.jpg" width="35" alt="Julia" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" elevation="10">
      <div class="px-8 pt-6">
        <h6 class="text-h5 font-weight-medium">Perfil do Usuário</h6>
        <div class="d-flex align-center mt-4 pb-6">
          <v-avatar size="80">
            <img src="/images/profile/user-1.jpg" width="80" />
          </v-avatar>

          <div class="ml-3">
            <h6 class="text-h6 mb-n1">{{ userSession.name }}</h6>

            <div class="d-flex align-center mt-1">
              <MailIcon size="18" stroke-width="1.5" />
              <span
                class="text-subtitle-1 font-weight-regular textSecondary ml-2"
                >{{ userSession.email }}</span
              >
            </div>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
      <perfect-scrollbar>
        <v-list class="py-0 theme-list" lines="two">
          <v-list-item class="py-4 px-8 custom-text-primary" to="/profile/edit">
            <template v-slot:prepend>
              <v-avatar size="48" color="lightprimary" rounded="md">
                <v-img
                  src="/images/svgs/icon-account.svg"
                  width="20"
                  alt="/images/svgs/icon-account.svg"
                />
              </v-avatar>
            </template>
            <div>
              <h6 class="text-subtitle-1 font-weight-bold mb-2 custom-title">
                Meu perfil
              </h6>
            </div>
            <p class="text-subtitle-1 font-weight-regular textSecondary">
              Configurações de perfil
            </p>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
      <div class="pt-4 pb-6 px-8 text-center">
        <v-btn
          prepend-icon="mdi-cog"
          color="info"
          variant="outlined"
          block
          to="/customizacao/sistema"
          >Customizar sistema</v-btn
        >
      </div>
      <div class="pb-6 px-8 text-center">
        <v-btn
          color="error"
          prepend-icon="mdi-power"
          :loading="loadingSignOut"
          block
          @click="signOut"
          >Sair</v-btn
        >
      </div>
    </v-sheet>
  </v-menu>
</template>
