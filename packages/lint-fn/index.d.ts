type PrettierSpecialCase = 'check' | 'local' | 'outer' |`html`
interface ExecPrettier {
  filePath: string
  injectOptions: string
  prettierSpecialCase?:PrettierSpecialCase
}

export function lintFn(input : {
  filePath: string, 
  prettierSpecialCase?:PrettierSpecialCase,
  cwdOverride?:string|false,
  forceTypescript?:boolean,
  debug?:boolean
}): Promise<boolean>;

export function execPrettier(
  input: ExecPrettier
): Promise<void>
