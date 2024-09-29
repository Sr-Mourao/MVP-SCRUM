<script setup lang="ts">
import type { VForm } from "vuetify/components/VForm";
const { CREATE_ORG, CREATE_ORG_USER } = useorganizationStore();

const emit = defineEmits(["load-organizations"]);

const { $toast } = useNuxtApp();
const form = ref<VForm | null>(null);
const rules = ref([(v: string) => !!v || "Campo Obrigatório"]);
const newOrgs = ref("");
const loadingBtn = ref(false);
const overlay = ref(false);

const saveOrg = async () => {
  if (form.value) {
    const { valid } = await form.value.validate();
    if (!valid) {
      return false;
    }
  }

  loadingBtn.value = true;
  overlay.value = true;
  try {
    const orgCreated: any = await CREATE_ORG(newOrgs.value);
    if (!orgCreated) {
      $toast.error("Ops... Houve algum erro");
      return;
    }
    await CREATE_ORG_USER(orgCreated.id_org);
    emit("load-organizations");
  } catch (error) {
    console.error(error);
    $toast.error("Ops... Houve algum erro");
  } finally {
    loadingBtn.value = false;
    overlay.value = false;
  }
};
</script>
<template>
  <div class="container-form-org">
    <v-overlay
      persistent
      :model-value="overlay"
      class="align-center justify-center"
    >
      <div class="loaderCreatedOrgs"></div>
    </v-overlay>
    <div class="text-h2 text-center" style="color: #2e3247">
      Cadastro Nova Organização
    </div>
    <v-divider class="my-3"></v-divider>
    <v-form ref="form">
      <v-row>
        <v-col cols="12">
          <v-label
            class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
            >Nome da Organização<span style="color: red" class="ml-1"
              >*</span
            ></v-label
          >

          <v-text-field v-model="newOrgs" :rules="rules"> </v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <div class="d-flex justify-center mt-5">
      <v-btn
        :loading="loadingBtn"
        block
        color="success"
        variant="outlined"
        @click="saveOrg"
        >Criar nova organização</v-btn
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../pages//organizations/organization.scss";
</style>
