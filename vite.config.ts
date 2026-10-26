import { cpSync, createReadStream, existsSync, mkdirSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import AdmZip from "adm-zip";
import matter from "gray-matter";
import { marked } from "marked";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILL_DIR = "information-is-beautiful";
const SKILL_ZIP = `/skills/${SKILL_DIR}.zip`;
const SITE_URL = "https://information-is-beautiful-skill.vercel.app";

// Generate HTML wrapper for a skill markdown file
function generateSkillHtml(relPath: string, markdown: string, frontmatter: Record<string, any>): string {
  const title = frontmatter.name ? `${frontmatter.name} — Agent Skill` : "Agent Skill";
  const description = frontmatter.description || "An Agent Skill for information design.";
  const url = `${SITE_URL}/skills/${relPath.replace(/\.md$/, "")}`;
  const ogImage = `${SITE_URL}/prints.jpg`;
  
  // Convert markdown to HTML for the page content
  const htmlContent = marked.parse(markdown);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${description.replace(/"/g, '"')}" />
  <title>${title}</title>
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="information-is-beautiful" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description.replace(/"/g, '"')}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1248" />
  <meta property="og:image:height" content="832" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description.replace(/"/g, '"')}" />
  <meta name="twitter:image" content="${ogImage}" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "${frontmatter.name || 'information-is-beautiful'}",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "${description.replace(/"/g, '\\"')}",
        "author": { "@type": "Person", "name": "karefined" },
        "license": "https://opensource.org/licenses/MIT",
        "url": "${url}",
        "installUrl": "https://github.com/karefined-eng/information-is-beautiful-skill",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "WebPage",
        "url": "${url}",
        "name": "${title}",
        "description": "${description.replace(/"/g, '\\"')}",
        "isPartOf": { "@id": "${SITE_URL}/#website" }
      }
    ]
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Space Grotesk', system-ui, sans-serif; background: #f3eee1; color: #17140e; line-height: 1.6; max-width: 42rem; margin: 0 auto; padding: 4rem 1.5rem; min-height: 100vh; }
    h1, h2, h3, h4 { font-family: 'Fraunces', serif; line-height: 1.2; color: #17140e; margin-top: 2rem; margin-bottom: 1rem; }
    h1 { font-size: clamp(2.25rem, 5vw, 3.5rem); font-weight: 600; }
    h2 { font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 600; }
    h3 { font-size: 1.5rem; font-weight: 500; }
    p { margin-bottom: 1rem; }
    code { font-family: 'JetBrains Mono', monospace; background: #e8e2d5; padding: 0.125rem 0.375rem; border-radius: 4px; font-size: 0.9em; }
    pre { background: #17140e; color: #f3eee1; padding: 1.5rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; }
    pre code { background: none; padding: 0; color: inherit; font-size: 0.875rem; }
    a { color: #ff5d1f; text-decoration: none; }
    a:hover { text-decoration: underline; }
    table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.875rem; }
    th, td { padding: 0.75rem; border: 1px solid #d4cec3; text-align: left; }
    th { background: #e8e2d5; font-family: 'Fraunces', serif; }
    blockquote { border-left: 4px solid #ff5d1f; padding-left: 1rem; margin: 1.5rem 0; color: #4a463c; font-style: italic; }
    ul, ol { margin: 1rem 0; padding-left: 1.5rem; }
    li { margin: 0.5rem 0; }
    .skill-header { border-bottom: 2px solid #ff5d1f; padding-bottom: 1rem; margin-bottom: 2rem; }
    .skill-meta { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem; font-size: 0.875rem; color: #4a463c; }
    .skill-meta span { background: #e8e2d5; padding: 0.25rem 0.75rem; border-radius: 9999px; }
    .footer { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #d4cec3; color: #4a463c; font-size: 0.875rem; }
    .footer a { color: #4a463c; }
  </style>
</head>
<body>
  <main>
    <header class="skill-header">
      <h1>${title}</h1>
      <div class="skill-meta">
        ${frontmatter.license ? `<span>License: ${frontmatter.license}</span>` : ""}
        ${frontmatter.version ? `<span>v${frontmatter.version}</span>` : ""}
        ${frontmatter.author ? `<span>Author: ${frontmatter.author}</span>` : ""}
      </div>
    </header>
    <article>
      ${htmlContent}
    </article>
    <footer class="footer">
      <p>Part of <a href="${SITE_URL}">information-is-beautiful</a> — an interactive tribute to David McCandless' atlas of infographics.</p>
      <p>Skill install: <code>npx skills add karefined-eng/information-is-beautiful-skill</code></p>
      <p><a href="${url}.md">View raw markdown</a> | <a href="${SITE_URL}/skills/${SKILL_DIR}.zip">Download skill zip</a></p>
    </footer>
  </main>
</body>
</html>`;
}

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
        
        // Serve HTML wrapper for .md files, raw for others
        if (rel.endsWith(".md")) {
          const raw = readFileSync(file, "utf-8");
          const { data: frontmatter, content } = matter(raw);
          const html = generateSkillHtml(rel, content, frontmatter);
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(html);
        } else {
          res.setHeader("Content-Type", "application/octet-stream");
          createReadStream(file).pipe(res);
        }
      });
    },
    closeBundle() {
      // Custom copy: only non-.md files + generate HTML wrappers from source
      const distSkills = path.resolve(__dirname, "dist", "skills");
      const skillSrc = path.resolve(root, SKILL_DIR);
      const skillDest = path.resolve(distSkills, SKILL_DIR);
      
      function copyDir(src: string, dest: string) {
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true });
        }
        const entries = readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
          } else if (!entry.name.endsWith(".md")) {
            cpSync(srcPath, destPath);
          }
        }
      }
      copyDir(skillSrc, skillDest);
      
      // Generate HTML wrappers for all .md files from SOURCE
      function processDir(dir: string) {
        const entries = readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            processDir(full);
          } else if (entry.name.endsWith(".md")) {
            const raw = readFileSync(full, "utf-8");
            const { data: frontmatter, content } = matter(raw);
            const rel = path.relative(skillSrc, full);
            const html = generateSkillHtml(rel, content, frontmatter);
            const destDir = path.resolve(skillDest, path.dirname(rel));
            if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
            const htmlPath = path.join(destDir, entry.name.replace(/\.md$/, ".html"));
            writeFileSync(htmlPath, html, "utf-8");
          }
        }
      }
      processDir(skillSrc);
      
      const out = path.resolve(distSkills, `${SKILL_DIR}.zip`);
      const zip = new AdmZip();
      zip.addLocalFolder(skillDest, SKILL_DIR);
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
