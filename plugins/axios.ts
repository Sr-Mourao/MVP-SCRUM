import axios from "axios";
import type { Pinia } from "pinia";
import type { Router } from "vue-router";
import { fetchAuthSession } from 'aws-amplify/auth'

export default defineNuxtPlugin((nuxtApp) => {

    const { push } = nuxtApp.$router as Router;
    const pinia = nuxtApp.$pinia as Pinia;
    const auth = useAuthStore(pinia);

    // axios.defaults.baseURL = nuxtApp.$config.public.baseUrlApi;
    axios.interceptors.request.use(
        async (config) => {
            const { tokens } = await fetchAuthSession();
            const tokenAuth = tokens?.idToken?.toString()
            if (tokenAuth) {
                config.headers.Authorization = `Bearer ${tokenAuth}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )
    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                auth.HANDLE_SIGN_OUT();
                push('/auth/login');
            }
            return Promise.reject(error)
        }
    )
    return {
        provide: {
            axios: axios,
        },
    };

});