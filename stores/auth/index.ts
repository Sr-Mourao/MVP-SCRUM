import { confirmSignIn, fetchUserAttributes, signIn, signOut, type ConfirmSignInInput , type SignInInput} from 'aws-amplify/auth'

export const useAuthStore = defineStore({
    id: "auth",
    state: () => {

        const storedUserSession = localStorage.getItem('userSession');
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

        return{
            userSession: storedUserSession ? JSON.parse(storedUserSession) : {},
            isAuthenticated: storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false,
        }
    },
    
    getters: {
        // setUserSession: (state) => state.userSession
    },

    actions: {
        async LOGIN({ username, password }: SignInInput){
            const { nextStep } = await signIn({username, password})
           return nextStep
        },

        async CONFIRM_SIGN_IN({challengeResponse}: ConfirmSignInInput){
            const {nextStep} = await confirmSignIn({challengeResponse})
            return nextStep
        },

        async FETCH_USER_SESSION(){
            const user = await fetchUserAttributes();
            this.userSession = user
            localStorage.setItem('userSession', JSON.stringify(user))
            this.isAuthenticated = true
            localStorage.setItem('isAuthenticated', JSON.stringify(true))
        },

        async SIGN_OUT(){
            await signOut();
            this.userSession = {}
            localStorage.removeItem('userSession')
            this.isAuthenticated = false
            localStorage.removeItem('isAuthenticated')
        }
    }
})