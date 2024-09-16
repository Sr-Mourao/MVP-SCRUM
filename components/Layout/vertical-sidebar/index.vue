<script setup lang="ts">
import { shallowRef } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import sidebarItems from "./sidebarItem";

const customizer = useCustomizerStore();

// Definir o tipo de MenuItem conforme necessário
type MenuItem = {
  header?: string;
  title?: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
};

const sidebarMenu = shallowRef<MenuItem[]>([]);

sidebarMenu.value = sidebarItems as MenuItem[];
</script>
<template>
  <v-navigation-drawer
    left
    v-model="customizer.Sidebar_drawer"
    elevation="0"
    rail-width="75"
    app
    class="leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
    width="300"
  >
    <!---Logo part -->
    <!---Logo part -->
    <v-locale-provider v-if="customizer.setRTLLayout" rtl>
      <div class="flex justify-center items-center">
        <div class="px-5 pt-3">
          <LayoutLogoRtlLogo />
        </div>
      </div>
    </v-locale-provider>
    <v-locale-provider v-else>
      <div class="px-5 pt-3">
        <LayoutLogo />
      </div>
    </v-locale-provider>

    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list class="px-6" density="compact">
        <v-divider></v-divider>
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu">
          <!---Item Sub Header -->
          <LayoutVerticalSidebarNavGroup
            :item="item"
            v-if="item.header"
            :key="item.title"
          />
          <!---If Has Child -->
          <LayoutVerticalSidebarNavCollapse
            class="leftPadding"
            :item="item"
            :level="0"
            v-else-if="item.children"
          />
          <!---Single Item-->
          <LayoutVerticalSidebarNavItem
            :item="item"
            v-else
            class="leftPadding"
          />
          <!---End Single Item-->
        </template>
      </v-list>
      <div class="pa-6 userbottom">
        <LayoutVerticalSidebarProfile />
      </div>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
