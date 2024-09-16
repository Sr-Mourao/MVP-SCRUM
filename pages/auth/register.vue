<script setup lang="ts">
import type { VForm } from "vuetify/components/VForm";

definePageMeta({
  layout: "blank",
});

const { SIGN_UP, CONFIRM_SIGN_UP } = useAuthStore();
const { push } = useRouter();
const { $toast } = useNuxtApp();
// variaveis
const form = ref<VForm | null>(null);
const password = ref("");
const email = ref("");
const fname = ref("");
const registerTabs = ref("tab-register");
const confirmationCode = ref("");
const show = ref(false);
const loadingSignUp = ref(false);
const loadingConfirmSignUp = ref(false);
// rules
const passwordRules = ref([
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
const emailRules = ref([
  (v: string) => !!v || "O e-mail é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
]);
const fnameRules = ref([(v: string) => !!v || "Nome é obrigatório"]);

// função
const signUp = async () => {
  if (form.value) {
    const { valid } = await form.value.validate();
    if (!valid) {
      return false;
    }
  }

  const newUser = {
    username: email.value,
    password: password.value,
    options: {
      userAttributes: {
        email: email.value,
        name: fname.value,
      },
    },
  };
  loadingSignUp.value = true;
  try {
    const { nextStep } = await SIGN_UP(newUser);
    if (nextStep.signUpStep === "DONE") {
      push("/organizations");
    } else if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
      registerTabs.value = "tab-confirm-email";
      $toast.success(
        "Código enviado ao email, verifique sua caixa de entrada."
      );
    }
  } catch (error: any) {
    if (error.message === "User already exists") {
      $toast.error("Email já cadastrado, Faça login.");
      console.error(error);
      return;
    }
    console.error(error);
    $toast.error(`Ops... Houve um erro: ${error.message}`);
  } finally {
    loadingSignUp.value = false;
  }
};

const confirmSignUp = async () => {
  loadingConfirmSignUp.value = true;
  try {
    const { nextStep } = await CONFIRM_SIGN_UP({
      username: email.value,
      confirmationCode: confirmationCode.value,
    });
    if (nextStep.signUpStep === "DONE") {
      push("/auth/login");
      $toast.success("Faça seu login");
      return;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loadingConfirmSignUp.value = false;
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
            max-width="450"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4"><LayoutLogo /></div>
              <v-tabs-window v-model="registerTabs">
                <v-tabs-window-item value="tab-register">
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
                      :rules="passwordRules"
                      required
                      :type="show ? 'text' : 'password'"
                      class="pwdInput"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show = !show"
                    ></VTextField>
                    <v-btn
                      size="large"
                      class="mt-3"
                      color="primary"
                      :loading="loadingSignUp"
                      block
                      submit
                      flat
                      @click="signUp"
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
                </v-tabs-window-item>
                <v-tabs-window-item value="tab-confirm-email">
                  <p class="text-subtitle-1 text-center text-13">
                    Enviamos um código de verificação.
                  </p>
                  <h6 class="text-subtitle-1 font-weight-bold text-center">
                    Email: {{ email }}
                    <v-tooltip text="Editar Inscrição">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          size="20"
                          icon="mdi-square-edit-outline"
                          variant="text"
                          v-bind="props"
                          @click="registerTabs = 'tab-register'"
                        ></v-btn>
                      </template>
                    </v-tooltip>
                  </h6>

                  <v-form>
                    <div class="mt-5">
                      <v-label
                        class="d-flex justify-center text-subtitle-1 font-weight-semibold pb-2 text-lightText"
                        >Digite seu código de segurança de 6 dígitos</v-label
                      >
                      <v-otp-input
                        v-model="confirmationCode"
                        :error="false"
                      ></v-otp-input>
                      <v-btn
                        size="large"
                        class="mt-3"
                        color="primary"
                        :loading="loadingConfirmSignUp"
                        block
                        submit
                        flat
                        @click="confirmSignUp"
                        >Confirmar
                      </v-btn>
                    </div>
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
