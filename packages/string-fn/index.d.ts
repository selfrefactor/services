export function between(text: string, left: string, right?: string): string
export function camelCase(text: string, extraLatin?: boolean): string
export function constantCase(text: string, extraLatin?: boolean): string
export function count(text: string, subtext: string): number
export function distance(x: string, y: string): number
export function distanceGerman(x: string, y: string): number
export function dotCase(text: string, extraLatin?: boolean): string
export function trainCase(text: string): string
export function glob(text: string, globRule: string): boolean
export function indent(text: string, indentCount: number): string
export function isTitleCase(text: string): boolean
export function isKebabCase(text: string): boolean
export function isPascalCase(text: string): boolean
export function isCamelCase(text: string): boolean
export function isConstantCase(text: string): boolean
export function isDotCase(text: string): boolean
export function isSnakeCase(text: string): boolean
export function toFixedLineLength(text: string, lineLength: number): string
export function getIndent(text: string): number
export function isLetter(char: string): boolean
export function isPunctuation(char: string): boolean
export function kebabCase(text: string, extraLatin?: boolean): string
export function ms(input: string): number
export function msToText(ms: number): string
export function pascalCase(text: string, extraLatin?: boolean): string
export function removeIndent(text: string): string
export function reverse(text: string): string
export function createIdFromSentence(text: string): string
export function seoTitle(text: string): string
export function shuffle(text: string): string
export function snakeCase(text: string, extraLatin?: boolean): string
export function splitSentence(sentence: string): string[]
export function splitWhen(text: string, predicate: (x: string) => boolean): string[]
export function stripPunctuation(text: string): string
export function stripTags(text: string): string
export function titleCase(text: string, extraLatin?: boolean): string
export function flatCase(text: string, extraLatin?: boolean): string
export function trim(text: string): string
export function words(text: string): string[]
export function wordsX(text: string): string[]
export function randomString(
  length?: number,
  alphabetOnlyFlag?: boolean
): string
export function getMaxLength(listOfSentences: string[]): number

interface SplitPerLine {
  text: string
  perLine?: number
  splitChar?: string
}
export function splitPerLine(input: SplitPerLine): string[]

interface FitWithinLines {
  text: string
  perLine?: number
  limit: number
}

export function fitWithinLines(input: FitWithinLines): string[]

export function takeArguments<T>(
  url: string,
  separator?: string,
  rawFlag?: boolean
): T

export interface MaskSentence {
  sentence: string
  replacer?: string
  charLimit?: number
  words?: string[]
  randomMode?: boolean
  easyMode?: boolean
  easierMode?: boolean
}

export interface OutputMaskSentence {
  visible: string[]
  hidden: string[]
}

export function maskSentence(input: MaskSentence): OutputMaskSentence

export interface MaskWords {
  words: string
  replacer?: string
  charLimit?: number
}

export function maskWords(input: MaskWords): string
