<script setup lang="ts">
import { ref, watch } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import { GridDotsIcon, Menu2Icon } from "vue-tabler-icons";
const customizer = useCustomizerStore();
const showSearch = ref(false);
const drawer = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
  showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
  priority.value = newPriority;
});
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="70" class="">
    <v-btn
      class="hidden-md-and-down custom-hover-primary"
      icon
      color="primary"
      variant="text"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up"
      icon
      variant="flat"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <!-- <v-sheet class="">
      <LayoutVerticalHeaderSearchbar />
    </v-sheet> -->

    <v-spacer />

    <!-- <v-btn
      variant="text"
      color="primary"
      class="hidden-lg-and-up custom-hover-primary"
      icon
      @click.stop="appsdrawer = !appsdrawer"
    >
      <GridDotsIcon size="17" stroke-width="1.5" />
    </v-btn> -->

    <div class="ml-sm-2">
      <LayoutVerticalHeaderProfileDD />
    </div>
  </v-app-bar>

  <!-- <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
    <LayoutVerticalHeaderRightMobileSidebar />
  </v-navigation-drawer> -->
</template>
