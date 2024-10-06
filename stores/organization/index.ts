import type { Organization, OrgUser } from "~/types/store/organization"

export const useorganizationStore = defineStore({
    id: 'organization',
    state: () => ({
        organizations: [] as Organization[],
        orgs_user: [] as OrgUser[],
    }),
    getters: {
        allOrgs: (state) => {
          return state.organizations.map((org) => {
            const orgUser = state.orgs_user.find(
              (e) => e.organization_id === org.id
            );
            return {
              ...org,
              role: orgUser ? orgUser.role : null
            };
          });
        }
      },
    actions: {
        async FETCH_ALL(ids: string[]) {
            const nuxtApp = useNuxtApp();
            const {data} = await nuxtApp.$axios.post('/organizations/v1/list-orgs', {
                ids: ids
            });
            this.organizations = data
            return data
        },

        async FETCH_ORG_USER(id: string){
            const nuxtApp = useNuxtApp();
            const { data} = await nuxtApp.$axios.get(`/users/v1/${id}/organizations`);
            this.orgs_user = data.organizations
            return data 
        },

        async CREATE_ORG(name: string, color: string) {
            const nuxtApp = useNuxtApp();
            const {data} = await nuxtApp.$axios.post('/organizations/v1', {
                name: name,
                color: color,
                user_count: 1,
                project_count: 0,
            })
            return data
        },

        async CREATE_ORG_USER(id: string){
            const nuxtApp = useNuxtApp();
            await nuxtApp.$axios.post('/users/v1/organizations', {
                organizationId: id
            })
            
        }
    },
})