import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { loadEnvConfig } = require('@next/env');

const projectDir = process.cwd();
loadEnvConfig(projectDir, process.env.NODE_ENV !== 'production');

const [command, ...args] = process.argv.slice(2);
if (!command) {
  console.error('Usage: node scripts/with-env.mjs <command> [args...]');
  process.exit(1);
}

// Windows exposes the variable as "Path", POSIX as "PATH"; reuse whichever exists
// so the child process does not end up with two competing entries.
const pathKey = Object.keys(process.env).find((key) => key.toUpperCase() === 'PATH') ?? 'PATH';
const localBin = path.join(projectDir, 'node_modules', '.bin');

const env = {
  ...process.env,
  [pathKey]: [localBin, process.env[pathKey]].filter(Boolean).join(path.delimiter),
};

const spawnOptions = { stdio: 'inherit', env };

// A shell is required on Windows to execute the node_modules/.bin *.cmd shims.
// Passing one pre-quoted string instead of an args array avoids Node's DEP0190.
// command and args are static values from package.json scripts, never user input.
const child =
  process.platform === 'win32'
    ? spawn(
        [command, ...args]
          .map((part) => (/[\s&|<>^"]/.test(part) ? `"${part.replace(/"/g, '\\"')}"` : part))
          .join(' '),
        { ...spawnOptions, shell: true },
      )
    : spawn(command, args, spawnOptions);

child.on('error', (error) => {
  console.error(`Failed to run "${command}": ${error.message}`);
  process.exit(1);
});

child.on('close', (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});
