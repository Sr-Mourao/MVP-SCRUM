
import { useAuthStore } from "~/stores/auth"
export default defineNuxtRouteMiddleware((to) => {
    const pathsAuth = ["/auth/login", "/auth/forgot-password", "/auth/two-step"].includes(to.path)

    const { isAuthenticated } = useAuthStore()
    if (!pathsAuth && !isAuthenticated) {
        return navigateTo("/auth/login")
    }
})