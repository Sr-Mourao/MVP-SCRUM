<script setup lang="ts">
import { useCustomizerStore } from "@/stores/customizer";
import { SettingsIcon } from "vue-tabler-icons";
const customizer = useCustomizerStore();
const title = ref(
  "Modernize - Nuxt3 Typescript based Admin Dashboard Template"
);
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Nuxt3 Typescript based Admin Dashboard Template`
      : "Modernize - Nuxt3 Typescript based Admin Dashboard Template";
  },
});
</script>
<template>
  <div>
    <!-----RTL LAYOUT------->
    <v-locale-provider v-if="customizer.setRTLLayout" rtl>
      <v-app
        :theme="customizer.actTheme"
        :class="[
          customizer.actTheme,
          customizer.mini_sidebar ? 'mini-sidebar' : '',
          customizer.setHorizontalLayout
            ? 'horizontalLayout'
            : 'verticalLayout',
          customizer.setBorderCard ? 'cardBordered' : '',
        ]"
      >
        <LayoutVerticalSidebar v-if="!customizer.setHorizontalLayout" />
        <LayoutVerticalHeader v-if="!customizer.setHorizontalLayout" />
        <LayoutHorizontalHeader v-if="customizer.setHorizontalLayout" />
        <LayoutHorizontalSidebar v-if="customizer.setHorizontalLayout" />
        <v-main>
          <v-container fluid class="page-wrapper pb-sm-15 pb-10">
            <div :class="customizer.boxed ? 'maxWidth' : ''">
              <NuxtPage />
            </div>
          </v-container>
        </v-main>
      </v-app>
    </v-locale-provider>

    <!-----LTR LAYOUT------->
    <v-locale-provider v-else>
      <v-app
        :theme="customizer.actTheme"
        :class="[
          customizer.actTheme,
          customizer.mini_sidebar ? 'mini-sidebar' : '',
          customizer.setHorizontalLayout
            ? 'horizontalLayout'
            : 'verticalLayout',
          customizer.setBorderCard ? 'cardBordered' : '',
        ]"
      >
        <!---Customizer location right side--->

        <LayoutVerticalSidebar v-if="!customizer.setHorizontalLayout" />
        <LayoutVerticalHeader v-if="!customizer.setHorizontalLayout" />
        <LayoutHorizontalHeader v-if="customizer.setHorizontalLayout" />
        <LayoutHorizontalSidebar v-if="customizer.setHorizontalLayout" />
        <v-main>
          <v-container fluid class="page-wrapper pb-sm-15 pb-10">
            <div :class="customizer.boxed ? 'maxWidth' : ''">
              <NuxtPage />
            </div>
          </v-container>
        </v-main>
      </v-app>
    </v-locale-provider>
  </div>
</template>
