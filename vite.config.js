import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        react(),
        createHtmlPlugin({
            inject: {
                data: {
                    VITE_APP_TITLE: process.env.VITE_APP_TITLE,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@redux": path.resolve(__dirname, "src/Redux/Redux-Slices"),
            "@hooks": path.resolve(__dirname, "src/Hooks"),
            "@locales": path.resolve(__dirname, "src/locales"),
        },
    },
    server: {
        https: false,
        port: 3000,
    },
    define: {
        "process.env": {},
    },
});
