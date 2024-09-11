<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "blank",
});

const password = ref("");
const email = ref("");
const passwordRules = ref([
  (v: string) => !!v || "Password is required",
  (v: string) =>
    (v && v.length <= 10) || "Password must be less than 10 characters",
]);
const emailRules = ref([
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);
const fname = ref("");
const fnameRules = ref([
  (v: string) => !!v || "Name is required",
  (v: string) =>
    (v && v.length <= 10) || "Name must be less than 10 characters",
]);
</script>
<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" class="d-flex align-center">
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 mx-auto"
            max-width="450"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4"><LayoutLogo /></div>
              <!-- <div class="text-h6 text-medium-emphasis text-center mb-6">Your Social Campaigns</div> -->
              <v-form ref="form" class="mt-3">
                <v-label class="text-subtitle-1 font-weight-medium pb-2"
                  >Nome</v-label
                >
                <VTextField
                  v-model="fname"
                  :rules="fnameRules"
                  required
                ></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2"
                  >Email</v-label
                >
                <VTextField
                  v-model="email"
                  :rules="emailRules"
                  required
                ></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2"
                  >Senha</v-label
                >
                <VTextField
                  v-model="password"
                  :counter="10"
                  :rules="passwordRules"
                  required
                  variant="outlined"
                  type="password"
                  color="primary"
                ></VTextField>
                <v-btn
                  size="large"
                  class="mt-2"
                  color="primary"
                  block
                  submit
                  flat
                  >Inscrever-se
                </v-btn>
              </v-form>
              <h6
                class="text-h6 text-medium-emphasis d-flex justify-center align-center mt-3"
              >
                Já tem uma conta?
                <v-btn
                  variant="plain"
                  to="/auth/login"
                  class="text-primary text-body-1 opacity-1 pl-2"
                  >Iniciar sessão</v-btn
                >
              </h6>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
