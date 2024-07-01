<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" class="d-flex align-center">
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 mx-auto"
            max-width="500"
          >
            <v-card-item class="pa-sm-8">
              <v-row class="d-flex mb-3">
                <v-col cols="6" sm="6">
                  <v-btn
                    variant="outlined"
                    size="large"
                    class="border text-subtitle-1"
                    block
                  >
                    <img :src="google" height="16" class="mr-2" alt="google" />
                    <span class="d-sm-flex d-none mr-1">Entrar com</span>Google
                  </v-btn>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-btn
                    variant="outlined"
                    size="large"
                    class="border text-subtitle-1"
                    block
                  >
                    <img
                      :src="facebook"
                      width="25"
                      height="25"
                      class="mr-1"
                      alt="facebook"
                    />
                    <span class="d-sm-flex d-none mr-1">Entrar com</span>FB
                  </v-btn>
                </v-col>
              </v-row>
              <div class="d-flex align-center text-center mb-6">
                <div
                  class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative"
                >
                  <span class="bg-surface px-5 py-3 position-relative"
                    >ou faça login com
                  </span>
                </div>
              </div>
              <Form
                @submit="signIn"
                v-slot="{ errors, isSubmitting }"
                class="mt-5"
              >
                <v-label
                  class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
                  >Email</v-label
                >
                <VTextField
                  v-model="email"
                  :rules="emailRules"
                  class="mb-8"
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
                  type="password"
                  class="pwdInput"
                >
                </VTextField>
                <div class="d-flex flex-wrap align-center my-3 ml-n2">
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[(v: any) => !!v || 'You must agree to continue!']"
                    required
                    hide-details
                    color="primary"
                  >
                    <template v-slot:label class=""
                      >Lembre-se deste dispositivo
                    </template>
                  </v-checkbox>
                  <div class="ml-sm-auto">
                    <NuxtLink
                      to=""
                      class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                      >Esqueceu sua senha?</NuxtLink
                    >
                  </div>
                </div>
                <v-btn
                  size="large"
                  :loading="isSubmitting"
                  color="primary"
                  :disabled="!password"
                  block
                  type="submit"
                  flat
                  >Entrar</v-btn
                >
                <div v-if="errors.apiError" class="mt-2">
                  <v-alert color="error">{{ errors.apiError }}</v-alert>
                </div>
              </Form>
              <h6
                class="text-h6 text-medium-emphasis d-flex justify-center align-center mt-3"
              >
                Novo na mmouu?
                <v-btn
                  class="pl-0 text-primary text-body-1 opacity-1 pl-2"
                  height="auto"
                  to="/auth/register2"
                  variant="plain"
                  >Crie a sua conta aqui
                </v-btn>
              </h6>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { Form } from "vee-validate";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

/*Social icons*/
import google from "/images/svgs/google-icon.svg";
import facebook from "/images/svgs/facebook-icon.svg";

const { LOGIN, CONFIRM_SIGN_IN, FETCH_USER_SESSION } = useAuthStore();
const { $toast } = useNuxtApp();
const router = useRouter();
// const email = ref("mouraofelipe6@gmail.com");
const email = ref("");
// const password = ref("Rebecca48755*");
const password = ref("");
const newPasswordFirtsLogin = ref("Rebecca48755*");
const conditionConfirmLogin = ref(false);

const checkbox = ref(false);
const passwordRules = ref([(v: string) => !!v || "Senha requerida"]);
const emailRules = ref([
  (v: string) => !!v || "O e-mail é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
]);

const signIn = async () => {
  const user = {
    username: email.value,
    password: password.value,
  };

  try {
    const data = await LOGIN(user);
    if (data.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED") {
      conditionConfirmLogin.value = true;
      return;
    }
    await FETCH_USER_SESSION();
    router.push("/");
  } catch (error) {
    console.error(error);
    $toast.error("Senha ou email incorretos.");
  }
};

const confirmSignIn = async () => {
  const challengeResponse = newPasswordFirtsLogin.value;
  try {
    const data = await CONFIRM_SIGN_IN({ challengeResponse });
    if (data.signInStep === "DONE") {
      await FETCH_USER_SESSION();
      router.push("/");
      return;
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
