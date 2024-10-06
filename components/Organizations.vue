<script setup lang="ts">
defineProps<{
  actionsBtn: () => void;
}>();

const organizationStore = useorganizationStore();
const { push } = useRouter();
const organizationSelected = () => {
  push("/");
};
</script>
<template>
  <div class="text-h2 text-center" style="color: #2e3247">
    Suas Organizações
  </div>
  <div v-for="(item, i) in organizationStore.allOrgs" :key="i">
    <v-card
      append-icon="mdi-arrow-right-thick"
      @click="organizationSelected"
      max-width="644"
      dark
      class="mx-auto my-5"
      rel="noopener"
      target="_blank"
      :title="item.name"
      :color="item.color"
    >
      <template #prepend>
        <v-avatar color="secondary">
          <span class="text-h5">{{ item.name.charAt(0).toUpperCase() }}</span>
        </v-avatar>
      </template>
      <template #subtitle>
        <div class="d-flex flex-column">
          <div>Projetos: {{ item.project_count }}</div>
          <div>Membros: {{ item.user_count }}</div>
        </div>
      </template>
    </v-card>
  </div>

  <div class="content-divider-btn">
    <div class="d-flex justify-center mt-5">
      <v-divider class="mt-3 mr-3"></v-divider>
      ou
      <v-divider class="mt-3 ml-3"></v-divider>
    </div>
    <div class="d-flex justify-center mt-5">
      <v-btn @click="actionsBtn" block color="success" variant="outlined"
        >Criar nova organização</v-btn
      >
    </div>
  </div>
</template>
<style scoped>
.content-divider-btn {
  max-width: 644px;
  margin-left: auto;
  margin-right: auto;
}
</style>
