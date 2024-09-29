export const useorganizationStore = defineStore({
    id: 'organization',
    state: () => ({
        organizations: []
    }),
    getters: {},
    actions: {
        async FETCH_ALL(ids: string[]) {
            const nuxtApp = useNuxtApp();
            const {data} = await nuxtApp.$axios.post('/organizations/v1/list-orgs', {
                ids: ids
            });
            return data
        },

        async FETCH_ORG_USER(id: string){
            const nuxtApp = useNuxtApp();
            const { data} = await nuxtApp.$axios.get(`/users/v1/${id}/organizations`);
            return data 
        },

        async CREATE_ORG(name: string) {
            const nuxtApp = useNuxtApp();
            const {data} = await nuxtApp.$axios.post('/organizations/v1', {
                name: name,
                user_count: 1,
                project_count: 0
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