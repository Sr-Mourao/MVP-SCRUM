<script setup lang="ts">
definePageMeta({
  layout: "organization",
});

const { push } = useRouter();

const organizationSelected = () => {
  push("/");
};
</script>
<template>
  <div>
    <div class="text-h2 text-center" style="color: #2e3247">
      Suas Organizações
    </div>
    <v-card
      append-icon="mdi-open-in-new"
      @click="organizationSelected"
      max-width="644"
      class="mx-auto my-5"
      rel="noopener"
      target="_blank"
      title="Senha Digital"
    >
      <template #prepend>
        <v-avatar color="secondary">
          <span class="text-h5">SD</span>
        </v-avatar>
      </template>
      <template #subtitle>
        <div class="d-flex flex-column">
          <div>Projetos: 3</div>
          <div>Membros: 5</div>
        </div>
      </template>
    </v-card>
    <v-card
      append-icon="mdi-open-in-new"
      @click="organizationSelected"
      max-width="644"
      class="mx-auto"
      rel="noopener"
      target="_blank"
      title="MMOUU"
    >
      <template #prepend>
        <v-avatar color="secondary">
          <span class="text-h5">M</span>
        </v-avatar>
      </template>
      <template #subtitle>
        <div class="d-flex flex-column">
          <div>Projetos: 1</div>
          <div>Membros: 8</div>
        </div>
      </template>
    </v-card>

    <div class="content-divider-btn">
      <div class="d-flex justify-center mt-5">
        <v-divider class="mt-3 mr-3"></v-divider>
        ou
        <v-divider class="mt-3 ml-3"></v-divider>
      </div>
      <div class="d-flex justify-center mt-5">
        <v-btn block color="success" variant="outlined"
          >Criar nova organização</v-btn
        >
      </div>
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
