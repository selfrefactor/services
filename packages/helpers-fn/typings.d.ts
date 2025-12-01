export function copy(text: string): Promise<void>

export function getStagedFiles(cwd: string): Promise<string[]>

// READ FOLDER
// ============================================
interface ScanFolderInput {
  folder: string
  excludeFn?: (dir: string) => boolean
  filterFn?: (file: string) => boolean
  maxDepth?: number
}

export function scanFolder(input: ScanFolderInput): Promise<Array<string>>

// EXEC
// ============================================
type OnLog = (x: string) => void
interface Exec {
  cwd: string
  command: string
  onLog?: OnLog
}
interface Spawn extends Exec {
  inputs: string[]
}
export function exec(input: Exec): Promise<string[]>
export function execSafe(input: Omit<Exec, 'onLog'>): Promise<string>
export function spawn(input: Spawn): Promise<string>

// Run tests
// ============================================
interface SingleRunTest {
  label?: string
  match?: any
  ok?: any
  fail?: any
  danger?: any
}
export function runTests(
  input: {
    label: string
    data: Array<SingleRunTest>
    fn: (input: any) => void
  },
  options?: {
    async?: boolean
    logFlag?: boolean
    callback?: () => void
  }
): void

// LOG
// ============================================

type LogModes =
  | 'obj'
  | 'back'
  | 'back.foo'
  | 'back.bar'
  | 'back.baz'
  | 'back.random'
  | 'big'
  | 'foo'
  | 'box'
  | 'box.padding'
  | 'bar'
  | 'baz'
  | 'random'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'obj'

type StandaloneLogModes = 'sep' | 'sepx' | 'separator' | 'separatorx'

export function log(inputmode: StandaloneLogModes): void

export function log(toLog: any, inputmode: LogModes): void
