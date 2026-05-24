import { spawnSync } from "child_process";
import { assertSafeEnvironment } from "./project-root.mjs";

const root = assertSafeEnvironment();
console.log(`[MAJ Boutique] Production build → ${root}\n`);

const result = spawnSync("npx", ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: { ...process.env, INIT_CWD: root },
});

process.exit(result.status ?? 1);
