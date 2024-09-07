<script setup lang="ts">
import { Form } from "vee-validate";

definePageMeta({
  layout: "blank",
});

const { FORGOT_PASSWORD } = useAuthStore();
const { push } = useRouter();
const { $toast } = useNuxtApp();
const email = ref("");
const emailRules = ref([
  (v: string) => !!v || "O e-mail é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
]);

const sendResetPassword = async () => {
  const username = email.value;
  try {
    const { action, details } = await FORGOT_PASSWORD(username);
    if (action === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
      return push({
        path: "/auth/two-step",
        query: { email: details?.destination },
      });
    }
    $toast.error("ops... Houve algum erro");
  } catch (error) {
    console.log(error);
    $toast.error("ops... Houve algum erro");
  }
};
</script>

<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="5" class="d-flex align-center">
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 mx-auto"
            max-width="450"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center my-5"><LayoutLogo /></div>
              <p class="text-subtitle-1 text-center text-10">
                Por favor, insira o endereço de e-mail associado à sua conta e
                enviaremos por e-mail com instruções para redefinir sua senha.
              </p>
              <Form @submit="sendResetPassword" v-slot="{ isSubmitting }">
                <v-label
                  class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
                  >Email</v-label
                >
                <VTextField
                  v-model="email"
                  :rules="emailRules"
                  required
                ></VTextField>
                <v-btn
                  size="large"
                  :loading="isSubmitting"
                  color="primary"
                  :disabled="!email"
                  block
                  type="submit"
                  flat
                  >Enviar</v-btn
                >
              </Form>
              <v-btn
                size="large"
                color="lightprimary"
                to="/auth/login"
                block
                class="mt-5 text-primary"
                flat
                >Volte ao login</v-btn
              >
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
