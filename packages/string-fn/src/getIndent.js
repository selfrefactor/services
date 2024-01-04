export function getIndent(str){
  return str.split('').findIndex((char) => char !== ' ');
}
