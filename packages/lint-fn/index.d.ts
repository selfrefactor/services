type PrettierSpecialCase = 'check' | 'local' | 'outer' |`html`
interface ExecPrettier {
  filePath: string
  injectOptions: string
  prettierSpecialCase?:PrettierSpecialCase
}

export function lintFn(
  filePath: string, 
  prettierSpecialCase?:PrettierSpecialCase,
  cwdOverride?:string|false,
  forceTypescript?:boolean,
  debug?:boolean
): Promise<void|false>;

export function execPrettier(
  input: ExecPrettier
): Promise<void>
