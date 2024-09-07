import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { pt } from 'vuetify/locale';
import { VCalendar } from 'vuetify/labs/VCalendar'

// import VueTablerIcons from "vue-tabler-icons";
//Mock Api data
// import "../_mockApis";

// import "vue3-carousel/dist/carousel.css";
import "@/assets/scss/style.scss";

//DragScroll

// Table
// import Vue3EasyDataTable from "vue3-easy-data-table";
// import "vue3-easy-data-table/dist/style.css";

import {
    BLUE_THEME,
    AQUA_THEME,
    PURPLE_THEME,
    GREEN_THEME,
    CYAN_THEME,
    ORANGE_THEME,
} from "@/theme/LightTheme";
import {
    DARK_BLUE_THEME,
    DARK_AQUA_THEME,
    DARK_ORANGE_THEME,
    DARK_PURPLE_THEME,
    DARK_GREEN_THEME,
    DARK_CYAN_THEME,
} from "@/theme/DarkTheme";

export default defineNuxtPlugin(({ vueApp }) => {
    const vuetify = createVuetify({
        ssr: true,
        //blueprint: md3,
        components: {
            ...components,
            VCalendar,
        },
        directives,
        theme: {
            defaultTheme: "BLUE_THEME",
            themes: {
                BLUE_THEME,
                AQUA_THEME,
                PURPLE_THEME,
                GREEN_THEME,
                CYAN_THEME,
                ORANGE_THEME,
                DARK_BLUE_THEME,
                DARK_AQUA_THEME,
                DARK_ORANGE_THEME,
                DARK_PURPLE_THEME,
                DARK_GREEN_THEME,
                DARK_CYAN_THEME,
            },
        },
        defaults: {
            VCard: {
                rounded: "md",
                elevation: 10
            },

            VTextField: {
                variant: "outlined",
                density: "comfortable",
                color: "primary",
            },
            VTextarea: {
                variant: "outlined",
                density: "comfortable",
                color: "primary",
            },
            VSelect: {
                variant: "outlined",
                density: "comfortable",
                color: "primary",
            },
            VListItem: {
                minHeight: "45px",
            },
            VTooltip: {
                location: "top",
            },
            VBtn: {
                style: "text-transform: capitalize; letter-spacing:0",
                rounded: "md",
            },
        },
        locale: {
            locale: 'pt',
            fallback: 'en',
            messages: { pt }, // Defina as mensagens de locale
        },

    });


    vueApp.use(vuetify);

    // vueApp.component("EasyDataTable", Vue3EasyDataTable);
    // vueApp.use(VueTablerIcons);

});
