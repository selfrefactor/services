type PrettierSpecialCase = 'check' | 'local' | 'outer' |`html`
interface ExecPrettier {
  filePath: string
  injectOptions: string
  prettierSpecialCase?:PrettierSpecialCase
}

interface LintFnResult{
  usePrettierResult: string[],
  lintResult: string[],
  case: 'js'|'jest'|'ts'|'force-ts'
}

export function lintFn(input : {
  filePath: string, 
  prettierSpecialCase?:PrettierSpecialCase,
  cwdOverride?:string|false,
  forceTypescript?:boolean,
  debug?:boolean
}): Promise<LintFnResult|false>;

export function execPrettier(
  input: ExecPrettier
): Promise<void>
