import { spawn } from "child_process";
import { assertSafeEnvironment } from "./project-root.mjs";

const root = assertSafeEnvironment();
console.log(`[MAJ Boutique] Dev server → ${root}\n`);

const child = spawn("npx", ["next", "dev"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: { ...process.env, INIT_CWD: root },
});

child.on("exit", (code) => process.exit(code ?? 1));
