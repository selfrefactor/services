type PrettierSpecialCase = 'check' | 'local' | 'outer' |`html`
interface ExecPrettier {
  filePath: string
  injectOptions: string
  prettierSpecialCase?:PrettierSpecialCase
}

export interface LintFnResult{
  lintResult?: string
  prettierResult: string
}

export function lintFn(input : {
  filePath: string, 
  prettierSpecialCase?:PrettierSpecialCase,
  cwdOverride?:string|false,
  forceTypescript?:boolean,
  debug?:boolean
}): Promise<false | LintFnResult>;

export function execPrettier(
  input: ExecPrettier
): Promise<string>
