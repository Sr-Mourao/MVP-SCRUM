<script setup lang="ts">
import { Form } from "vee-validate";

definePageMeta({
  layout: "blank",
});

const { HANDLE_CONFIRM_RESET_PASSWORD } = useAuthStore();
const { query } = useRoute();
const { push } = useRouter();
const { $toast } = useNuxtApp();
const show1 = ref(false);
const username = ref("");
const confirmationCode = ref("");
const newPassword = ref("");
const passwordRules = ref([(v: string) => !!v || "Senha requerida"]);
const emailRules = ref([
  (v: string) => !!v || "O e-mail é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
]);

const confirmResetPassword = async () => {
  const infoResetPassword = {
    username: username.value,
    confirmationCode: confirmationCode.value,
    newPassword: newPassword.value,
  };
  try {
    await HANDLE_CONFIRM_RESET_PASSWORD(infoResetPassword);
    push("/auth/login");
    $toast.success("Senha redefenida com sucesso, entre com nova senha.");
  } catch (error) {
    console.error(error);
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
            max-width="455"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4"><LayoutLogo /></div>
              <p class="text-subtitle-1 text-center text-13">
                Enviamos um código de verificação.
              </p>
              <h6 class="text-subtitle-1 font-weight-bold text-center">
                Email: {{ query.email }}
              </h6>
              <p class="text-subtitle-1 text-center text-13">
                Digite o código do email no campo abaixo.
              </p>
              <v-divider class="mt-3"></v-divider>
              <!---Form---->
              <div class="mt-3">
                <v-label
                  class="d-flex justify-center text-subtitle-1 font-weight-semibold pb-2 text-lightText"
                  >Digite seu código de segurança de 6 dígitos</v-label
                >
                <Form @submit="confirmResetPassword" v-slot="{ isSubmitting }">
                  <div class="d-flex justify-center">
                    <v-otp-input
                      v-model="confirmationCode"
                      :error="false"
                    ></v-otp-input>
                  </div>
                  <div v-if="confirmationCode.length > 5">
                    <v-label>Confirme seu email</v-label>
                    <VTextField
                      hide-details="auto"
                      v-model="username"
                      required
                      :rules="emailRules"
                    ></VTextField>
                    <v-label>Nova Senha</v-label>
                    <VTextField
                      hide-details="auto"
                      required
                      v-model="newPassword"
                      class="mb-5"
                      :rules="passwordRules"
                      :type="show1 ? 'text' : 'password'"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show1 = !show1"
                    ></VTextField>
                  </div>
                  <v-btn
                    color="primary"
                    size="large"
                    :loading="isSubmitting"
                    :disabled="!newPassword"
                    block
                    flat
                    type="submit"
                    >Redefinir Senha</v-btn
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
                <!-- <h6 class="text-h6 mt-5 font-weight-regular">
                    Não recebeu o código?
                    <NuxtLink
                      to="/"
                      class="text-primary text-subtitle-1 text-decoration-none pl-1 font-weight-medium"
                    >
                      Reenviar</NuxtLink
                    >
                  </h6> -->
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
