import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cwd = process.cwd();

if (
  cwd.replace(/\\/g, "/").toLowerCase() !==
  pkgDir.replace(/\\/g, "/").toLowerCase()
) {
  console.error("\n[MAJ Boutique] Run npm commands from the project folder:\n");
  console.error(`  cd "${pkgDir}"\n`);
  process.exit(1);
}

if (cwd !== pkgDir) {
  console.error("\n[MAJ Boutique] Wrong folder casing breaks Next.js on Windows.\n");
  console.error(`  Use exactly: cd "${pkgDir}"\n`);
  console.error(`  You used:     cd "${cwd}"\n`);
  process.exit(1);
}

const parentNodeModules = path.resolve(pkgDir, "..", "node_modules");
if (fs.existsSync(parentNodeModules)) {
  console.error("\n[MAJ Boutique] Remove parent node_modules — it breaks React/Next:\n");
  console.error(`  Remove-Item "${parentNodeModules}" -Recurse -Force\n`);
  process.exit(1);
}
