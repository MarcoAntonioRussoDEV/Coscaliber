import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@redux": path.resolve(__dirname, "src/Redux/Redux-Slices"),
            "@hooks": path.resolve(__dirname, "src/Hooks"),
        },
    },
    server: {
        https: false,
        port: 3000,
    },
});
