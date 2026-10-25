import { cpSync, createReadStream, existsSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import AdmZip from "adm-zip";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILL_DIR = "information-is-beautiful";
const SKILL_ZIP = `/skills/${SKILL_DIR}.zip`;

// The skill lives at skills/<name>/ — the location every agent-skills
// installer (npx skills add, plugin marketplaces) scans — and must stay
// reachable at /skills/… (plus a packaged zip) on the deployed site.
function serveSkills(): Plugin {
  const root = path.resolve(__dirname, "skills");
  const makeZip = () => {
    const zip = new AdmZip();
    zip.addLocalFolder(path.join(root, SKILL_DIR), SKILL_DIR);
    return zip.toBuffer();
  };

  return {
    name: "serve-skill-files",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url === SKILL_ZIP) {
          res.setHeader("Content-Type", "application/zip");
          res.setHeader("Content-Disposition", `attachment; filename="${SKILL_DIR}.zip"`);
          res.end(makeZip());
          return;
        }
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
      const out = path.resolve(__dirname, "dist", "skills", `${SKILL_DIR}.zip`);
      const zip = new AdmZip();
      zip.addLocalFolder(path.resolve(__dirname, "dist", "skills", SKILL_DIR), SKILL_DIR);
      zip.writeZip(out);
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
