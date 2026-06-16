// Flatten the TanStack Start build into a plain static site for static hosting
// (e.g. DigitalOcean App Platform "Static Site"). The default build emits
// dist/client (static assets + prerendered index.html) and dist/server (the SSR
// Node server, unused for a static deploy). This moves dist/client/* up into
// dist/ and removes dist/server so the deploy root is simply dist/.
import { existsSync, rmSync, readdirSync, renameSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const client = join(dist, "client");
const server = join(dist, "server");

if (!existsSync(client)) {
  console.error(
    `[static-postbuild] Expected "${client}" to exist. Did the build run? Aborting.`,
  );
  process.exit(1);
}

// Drop the SSR server output — not needed for a static deploy.
rmSync(server, { recursive: true, force: true });

// Move everything from dist/client/* up into dist/.
for (const entry of readdirSync(client)) {
  renameSync(join(client, entry), join(dist, entry));
}

// Remove the now-empty dist/client folder.
rmSync(client, { recursive: true, force: true });

console.log(`[static-postbuild] Flattened static site into "${dist}/" (index.html + assets).`);
