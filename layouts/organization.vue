<script setup lang="ts">
const customizer = useCustomizerStore();
const { userSession } = useAuthStore();

</script>
<template>
  <div>
    <v-app
      :theme="customizer.actTheme"
      :class="[
        customizer.actTheme,
        customizer.mini_sidebar ? 'mini-sidebar' : '',
        customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
        customizer.setBorderCard ? 'cardBordered' : '',
      ]"
    >
      <v-app-bar elevation="10">
        <LayoutLogoRtlLogo />
        <template v-slot:append>
          <div class="d-flex align-center mt-4 pb-6">
            <v-avatar size="40">
              <img src="/images/profile/user-1.jpg" width="40" />
            </v-avatar>

            <div class="ml-3">
              <h6 class="text-h6 mb-n1">{{ userSession.name }}</h6>
              <div class="d-flex align-center mt-1">
                <span
                  class="text-subtitle-1 font-weight-regular textSecondary"
                  >{{ userSession.email }}</span
                >
              </div>
            </div>
          </div>
        </template>
      </v-app-bar>
      <v-main>
        <v-container fluid class="page-wrapper pb-sm-15 pb-10">
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <NuxtPage />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
