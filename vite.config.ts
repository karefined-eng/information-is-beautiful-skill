import { cpSync, createReadStream, existsSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The skill lives at skills/<name>/ — the location every agent-skills
// installer (npx skills add, plugin marketplaces) scans — and must stay
// reachable at /skills/… on the deployed site.
function serveSkills(): Plugin {
  const root = path.resolve(__dirname, "skills");
  return {
    name: "serve-skill-files",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (!url?.startsWith("/skills/")) return next();
        const rel = decodeURIComponent(url.slice("/skills/".length));
        const file = path.resolve(root, rel);
        if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) return next();
        res.setHeader(
          "Content-Type",
          rel.endsWith(".md") ? "text/markdown; charset=utf-8" : "application/octet-stream",
        );
        createReadStream(file).pipe(res);
      });
    },
    closeBundle() {
      cpSync(root, path.resolve(__dirname, "dist", "skills"), { recursive: true });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), serveSkills()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
