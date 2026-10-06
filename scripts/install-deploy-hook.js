import { chmodSync, copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const hookSource = resolve(projectRoot, '.githooks', 'pre-push')
const hooksDirectory = execFileSync('git', ['rev-parse', '--git-path', 'hooks'], {
  cwd: projectRoot,
  encoding: 'utf8',
}).trim()
const hookTarget = resolve(projectRoot, hooksDirectory, 'pre-push')

if (!existsSync(hookSource)) {
  throw new Error(`Hook source not found: ${hookSource}`)
}

mkdirSync(dirname(hookTarget), { recursive: true })
copyFileSync(hookSource, hookTarget)
chmodSync(hookTarget, 0o755)
console.log(`Installed pre-push deploy hook at ${hookTarget}`)
