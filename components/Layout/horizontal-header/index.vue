<script setup lang="ts">
import { ref, watch } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import { GridDotsIcon, Menu2Icon, ShoppingCartIcon } from "vue-tabler-icons";
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
  <v-app-bar elevation="10" :priority="priority" height="70">
    <div
      :class="
        customizer.boxed
          ? 'maxWidth v-toolbar__content'
          : 'v-toolbar__content px-6'
      "
    >
      <v-locale-provider v-if="customizer.setRTLLayout" rtl>
        <div class="">
          <div class="d-flex justify-center font-weight-black">
            <v-icon color="green-darken-2" icon="mdi-cow" size="large"></v-icon
            >MMOUU
          </div>
        </div>
      </v-locale-provider>
      <v-locale-provider v-else>
        <div class="hidden-md-and-down mr-3">
          <v-icon color="green-darken-2" icon="mdi-cow" size="large"></v-icon
          >MMOUU
        </div>
      </v-locale-provider>

      <v-btn
        class="hidden-lg-and-up ms-3"
        icon
        rounded="sm"
        variant="flat"
        @click.stop="customizer.SET_SIDEBAR_DRAWER"
        size="small"
      >
        <Menu2Icon size="20" stroke-width="1.5" />
      </v-btn>

      <v-sheet v-if="showSearch" class="search-sheet v-col-12">
        <LayoutVerticalHeaderSearchbar :closesearch="searchbox" />
      </v-sheet>

      <v-sheet>
        <LayoutVerticalHeaderSearchbar />
      </v-sheet>

      <v-spacer />

      <v-btn
        class="hidden-lg-and-up ml-3"
        icon
        rounded="sm"
        @click.stop="appsdrawer = !appsdrawer"
        variant="flat"
      >
        <GridDotsIcon size="17" stroke-width="1.5" />
      </v-btn>

      <div class="ml-3 mr-sm-0 mr-3">
        <LayoutVerticalHeaderProfileDD />
      </div>
    </div>
  </v-app-bar>
  <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
    <LayoutVerticalHeaderRightMobileSidebar />
  </v-navigation-drawer>
</template>
