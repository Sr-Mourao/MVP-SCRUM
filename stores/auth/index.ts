import {
    type SignInInput,
    type SignUpInput,
    type ConfirmSignInInput,
    type ConfirmSignUpInput, 
    type UpdatePasswordInput,
    type ResetPasswordOutput,
    type ConfirmResetPasswordInput,
} from 'aws-amplify/auth';

export const useAuthStore = defineStore({
    id: "auth",
    state: () => {
        const storedUserSession = localStorage.getItem('userSession');
        const storedloggedIn = localStorage.getItem('loggedIn');
        return {
            userSession: storedUserSession ? JSON.parse(storedUserSession) : {},
            isAuthenticated: storedloggedIn ? JSON.parse(storedloggedIn) : false,
        }
    },

    getters: {},

    actions: {

        async SIGN_UP(newUser: SignUpInput) {
            const nuxtApp = useNuxtApp();
            const data = await nuxtApp.$auth.signUp(newUser)
            return data
        },

        async CONFIRM_SIGN_UP(challengeResponse: ConfirmSignUpInput) {
            const nuxtApp = useNuxtApp();
            const data = await nuxtApp.$auth.confirmSignUp(challengeResponse)
            return data
        },

        async AUTO_SIGN_IN(){
            const nuxtApp = useNuxtApp();
            await nuxtApp.$auth.autoSignIn()
        },

        async LOGIN({ username, password }: SignInInput) {
            const nuxtApp = useNuxtApp();
            const data = await nuxtApp.$auth.signIn({ username, password })
            return data
        },

        async CONFIRM_SIGN_IN(challengeResponse: ConfirmSignInInput) {
            const nuxtApp = useNuxtApp();
            const { nextStep } = await nuxtApp.$auth.confirmSignIn(challengeResponse)
            return nextStep
        },

        async FETCH_INFO_USER_SESSION() {
            const nuxtApp = useNuxtApp();
            this.isAuthenticated = true
            localStorage.setItem('loggedIn', JSON.stringify(true))
            const user = await nuxtApp.$auth.fetchUserAttributes();
            this.userSession = user
            localStorage.setItem('userSession', JSON.stringify(user))
        },

        async HANDLE_SIGN_OUT() {
            const nuxtApp = useNuxtApp();
            await nuxtApp.$auth.signOut();
            this.userSession = {},
               
                this.isAuthenticated = false,

                localStorage.removeItem('loggedIn')
            localStorage.removeItem('userSession')
           
        },

        async FORGOT_PASSWORD(username: string) {
            const nuxtApp = useNuxtApp();
            const output = await nuxtApp.$auth.resetPassword({ username });
            return this.HANDLE_RESET_PASSWORD_NEXT_STEPS(output)
        },

        HANDLE_RESET_PASSWORD_NEXT_STEPS(output: ResetPasswordOutput) {
            const { nextStep } = output;

            if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
                const codeDeliveryDetails = nextStep.codeDeliveryDetails;
                return { action: 'CONFIRM_RESET_PASSWORD_WITH_CODE', details: codeDeliveryDetails };

            } else if (nextStep.resetPasswordStep === 'DONE') {
                return { action: 'DONE', message: 'Successfully reset password' };

            } else {
                return { action: 'UNKNOWN', message: 'Unknown step' };
            }
        },

        async HANDLE_CONFIRM_RESET_PASSWORD({
            username,
            confirmationCode,
            newPassword
        }: ConfirmResetPasswordInput) {
            const nuxtApp = useNuxtApp();
            await nuxtApp.$auth.confirmResetPassword({ username, confirmationCode, newPassword });
        },

        async UPDATE_PASSWORD({ oldPassword, newPassword }: UpdatePasswordInput) {
            const nuxtApp = useNuxtApp();
            await nuxtApp.$auth.updatePassword({ oldPassword, newPassword });
        },
    }
})