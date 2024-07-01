import Toast, { useToast } from "vue-toastification";
import type { PluginOptions } from "vue-toastification";
import VueTheMask from 'vue-the-mask';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin(({ vueApp }) => {

    const options: PluginOptions = {
        position: "bottom-left",
        timeout: 5000,
        transition: "Vue-Toastification__slideBlurred"
    }

    vueApp.use(Toast, options)
    vueApp.use(VueTheMask);
    vueApp.use(PerfectScrollbarPlugin);

    return {
        provide: {
            toast: useToast()
        }
    }
});
