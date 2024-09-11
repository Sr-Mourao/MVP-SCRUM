<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

import type { VForm } from "vuetify/components/VForm";

const { LOGIN, CONFIRM_SIGN_UP, FETCH_INFO_USER_SESSION } = useAuthStore();
const { $toast } = useNuxtApp();
const { push } = useRouter();
const formSignIn = ref<VForm | null>(null);
const formConfirmPassword = ref<VForm | null>(null);
const loadingSignIn = ref(false);
const loadingConfirmSignIn = ref(false);
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const loginTabs = ref("tab-login");
const newPassword = ref("");
const password = ref("");
const confirmNewPassword = ref("");
const username = ref("");
const passwordRules = ref([(v: string) => !!v || "Senha requerida"]);
const emailRules = ref([
  (v: string) => !!v || "O e-mail é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "O e-mail deve ser válido",
]);
const newPasswordRules = ref([
  (v: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(v);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(v);
    const hasNumber = /\d/.test(v);
    return (
      (v.length >= minLength && hasUpperCase && hasSpecialChar && hasNumber) ||
      "Senha deve ter pelo menos 8 caracteres, incluindo pelo menos 1 maiúsculo, 1 número e 1 caractere especial"
    );
  },
]);

const confirmPasswordRules = computed(() => [
  (v: string) => v === newPassword.value || "As senhas não são iguais",
]);

const signIn = async () => {
  if (formSignIn.value) {
    const { valid } = await formSignIn.value.validate();
    if (!valid) {
      return false;
    }
  }

  const user = {
    username: username.value,
    password: password.value,
  };
  loadingSignIn.value = true;
  try {
    const data = await LOGIN(user);
    if (
      data.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
    ) {
      loginTabs.value = "tab-new-password";
      return;
    }
    await FETCH_INFO_USER_SESSION();
    push({ path: "/" });
  } catch (error) {
    console.error(error);
    $toast.error("Senha ou email incorretos.");
  } finally {
    loadingSignIn.value = false;
  }
};

const confirmSignIn = async () => {
  if (formConfirmPassword.value) {
    const { valid } = await formConfirmPassword.value.validate();
    if (!valid) {
      return false;
    }
  }

  const challengeResponse = confirmNewPassword.value;

  loadingConfirmSignIn.value = true;
  try {
    const data = await CONFIRM_SIGN_UP({ challengeResponse });
    if (data.signInStep === "DONE") {
      await FETCH_INFO_USER_SESSION();
      push({ path: "/" });
    }
  } catch (error) {
    console.error(error);
    $toast.error("ops... Houve algum erro.");
  } finally {
    loadingConfirmSignIn.value = false;
  }
};
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
            max-width="550"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center mb-1"><LayoutLogo /></div>

              <div class="d-flex align-center text-center mb-6">
                <div
                  class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative"
                >
                  <span class="bg-surface px-5 py-3 position-relative"
                    >Bem vindo</span
                  >
                </div>
              </div>
              <v-tabs-window v-model="loginTabs">
                <v-tabs-window-item value="tab-login">
                  <v-form ref="formSignIn">
                    <v-label
                      class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
                      >Email</v-label
                    >
                    <VTextField
                      v-model="username"
                      :rules="emailRules"
                      class="mb-6"
                      required
                      hide-details="auto"
                    ></VTextField>
                    <v-label
                      class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
                      >Senha</v-label
                    >
                    <VTextField
                      v-model="password"
                      :rules="passwordRules"
                      required
                      hide-details="auto"
                      :type="show1 ? 'text' : 'password'"
                      class="pwdInput"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show1 = !show1"
                    >
                    </VTextField>
                    <div class="d-flex flex-wrap align-center my-3 ml-n2">
                      <v-spacer></v-spacer>
                      <div class="ml-sm-auto">
                        <NuxtLink
                          to="/auth/forgot-password"
                          class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                          >Esqueceu sua senha?</NuxtLink
                        >
                      </div>
                    </div>
                    <v-btn
                      size="large"
                      :loading="loadingSignIn"
                      color="primary"
                      block
                      @click="signIn"
                      flat
                      >Entrar</v-btn
                    >
                  </v-form>
                  <h6
                    class="text-h6 d-flex align-center mt-6 font-weight-medium"
                  >
                    Primeira vez aqui?
                    <v-btn
                      class="pl-0 text-primary text-body-1 opacity-1 pl-2 font-weight-medium"
                      height="auto"
                      to="/auth/register"
                      variant="plain"
                      >Inscrever-se
                    </v-btn>
                  </h6>
                </v-tabs-window-item>
                <v-tabs-window-item value="tab-new-password">
                  <div
                    class="d-flex align-center justify-center text-center mb-6"
                  >
                    <div class="bg-surface px-5 pt-3 position-relative">
                      Esse é seu primeiro acesso<br />Crie uma nova senha
                    </div>
                  </div>

                  <v-form ref="formConfirmPassword">
                    <VTextField
                      v-model="newPassword"
                      :rules="newPasswordRules"
                      required
                      hide-details="auto"
                      :type="show2 ? 'text' : 'password'"
                      class="pwdInput mb-8"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show2 = !show2"
                    ></VTextField>
                    <VTextField
                      v-model="confirmNewPassword"
                      :rules="confirmPasswordRules"
                      required
                      hide-details="auto"
                      :type="show3 ? 'text' : 'password'"
                      class="pwdInput mb-8"
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show3 = !show3"
                    ></VTextField>
                    <v-btn
                      size="large"
                      :loading="loadingConfirmSignIn"
                      color="primary"
                      block
                      @click="confirmSignIn"
                      flat
                      >Confirmar</v-btn
                    >
                  </v-form>
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
