<script setup lang="ts">
import type { VForm } from "vuetify/components/VForm";

const form = ref<VForm | null>(null);
const { UPDATE_PASSWORD } = useAuthStore();
const { $toast } = useNuxtApp();
const { push } = useRouter();

const oldPassword = ref("");
const newPassword = ref("");
const loadingUpdatePassword = ref(false);
const show1 = ref(false);
const show2 = ref(false);
const passwordRules = ref([(v: string) => !!v || "Senha requerida"]);
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

const updatePawword = async () => {
  if (form.value) {
    const { valid } = await form.value.validate();
    if (!valid) {
      return false;
    }
  }

  loadingUpdatePassword.value = true;
  try {
    await UPDATE_PASSWORD({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });
    $toast.success("Senha atualizada com sucesso.");
    push("/");
  } catch (error) {
    console.error(error);
    $toast.error("Ops... Houve algum erro");
  } finally {
    loadingUpdatePassword.value = false;
  }
};
</script>
<template>
  <v-card>
    <v-card-title>Redefinição de senha</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" sm="6">
            <v-label
              class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
              >Senha atual<span style="color: red">*</span></v-label
            >
            <v-text-field
              :rules="passwordRules"
              v-model="oldPassword"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-label
              class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
              >Nova Senha<span style="color: red">*</span></v-label
            >
            <v-text-field
              :rules="newPasswordRules"
              v-model="newPassword"
              :type="show2 ? 'text' : 'password'"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :loading="loadingUpdatePassword"
        color="primary"
        variant="flat"
        @click="updatePawword"
        >Atualizar senha</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
