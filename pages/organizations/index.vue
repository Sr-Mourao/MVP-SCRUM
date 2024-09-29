<script setup lang="ts">
definePageMeta({
  layout: "organization",
});

const { userSession } = useAuthStore();
const { $toast } = useNuxtApp();
const { FETCH_ALL, FETCH_ORG_USER } = useorganizationStore();
const userWithoutOrg = ref(false);
const organizationsUserSession = ref([]);
const overlay = ref(false);

const loadOrganizations = async () => {
  overlay.value = true;
  try {
    const orgUser = await FETCH_ORG_USER(userSession.sub);
    if (!orgUser) {
      userWithoutOrg.value = true;
      return;
    }

    const data = await FETCH_ALL(orgUser.organizations);
    organizationsUserSession.value = data;
  } catch (error) {
    console.error(error);
    $toast.error("Ops... Houve algum erro");
  } finally {
    overlay.value = false;
  }
};

const loadOrgsAfterRegistration = async () => {
  await loadOrganizations();
  userWithoutOrg.value = false;
};

const registerNewOrg = () => {
  userWithoutOrg.value = true;
};

onMounted(async () => {
  await loadOrganizations();
});
</script>
<template>
  <div>
    <v-overlay
      persistent
      :model-value="overlay"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <div>
      <div v-if="userWithoutOrg">
        <FormNewOrganization @load-organizations="loadOrgsAfterRegistration" />
      </div>
      <div v-else>
        <Organizations
          :organizations="organizationsUserSession"
          :actions-btn="registerNewOrg"
        />
      </div>
    </div>
  </div>
</template>
