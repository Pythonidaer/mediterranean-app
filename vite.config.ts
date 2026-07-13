import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Set this to your GitHub repo name, e.g. "/mediterranean-app/"
// If you publish to a custom domain (e.g. fresco.example.com), change to "/"
const BASE_PATH = "/mediterranean-app/";

export default defineConfig({
  base: BASE_PATH,
  plugins: [react(), tailwindcss()],
});
