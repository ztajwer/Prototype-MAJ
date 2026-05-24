import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/** Real path to Prototype-MAJ — fixes Windows casing (prototype-maj vs Prototype-MAJ) */
export function getProjectRoot() {
  return fs.realpathSync(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
  );
}

export function assertSafeEnvironment() {
  const root = getProjectRoot();
  const parentNodeModules = path.resolve(root, "..", "node_modules");
  if (fs.existsSync(parentNodeModules)) {
    console.error("\n[MAJ Boutique] Delete parent node_modules first:\n");
    console.error(`  Remove-Item "${parentNodeModules}" -Recurse -Force\n`);
    process.exit(1);
  }
  process.chdir(root);
  return root;
}
