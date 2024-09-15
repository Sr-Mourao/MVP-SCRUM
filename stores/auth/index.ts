import {
    autoSignIn,
    signIn,
    signOut,
    signUp,
    confirmSignUp,
    confirmSignIn,
    resetPassword,
    updatePassword,
    fetchUserAttributes,
    confirmResetPassword,
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
            const data = await signUp(newUser)
            return data
        },

        async CONFIRM_SIGN_UP(challengeResponse: ConfirmSignUpInput) {
            const data = await confirmSignUp(challengeResponse)
            return data
        },

        async AUTO_SIGN_IN(){
            await autoSignIn()
        },

        async LOGIN({ username, password }: SignInInput) {
            const data = await signIn({ username, password })
            return data
        },

        async CONFIRM_SIGN_IN(challengeResponse: ConfirmSignInInput) {
            const { nextStep } = await confirmSignIn(challengeResponse)
            return nextStep
        },

        async FETCH_INFO_USER_SESSION() {
            this.isAuthenticated = true
            localStorage.setItem('loggedIn', JSON.stringify(true))
            const user = await fetchUserAttributes();
            this.userSession = user
            localStorage.setItem('userSession', JSON.stringify(user))
        },

        async HANDLE_SIGN_OUT() {
            await signOut();
            this.userSession = {},
               
                this.isAuthenticated = false,

                localStorage.removeItem('loggedIn')
            localStorage.removeItem('userSession')
           
        },

        async FORGOT_PASSWORD(username: string) {
            const output = await resetPassword({ username });
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
            await confirmResetPassword({ username, confirmationCode, newPassword });
        },

        async UPDATE_PASSWORD({ oldPassword, newPassword }: UpdatePasswordInput) {
            await updatePassword({ oldPassword, newPassword });
        },
    }
})