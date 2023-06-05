const {execCommand} = require('../../modules/execCommand')
const {existsSync, unlinkSync} = require('fs')
const {log, scanFolder} = require('helpers-fn')
const { piped, split, last, mapAsync, tryCatchAsync, remove } = require('rambdax')
const { CWD } = require('../../constants')

async function dvd(label) {
  console.log(CWD)
  const files = await scanFolder({
    folder: CWD,
    filterFn: x => x.toLowerCase().endsWith('.vob'),
  })
  const fn = async function(file, i){
    let fileName = remove(`${ CWD }/`, file)
    let finalOutput = `${label}-${i}.mp4`
    let output = `raw-${finalOutput}`
    let command = `ffmpeg -i ${ fileName } -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k ${output}`
    console.log( command )
    await execCommand(
      command
    )
    let decreaseQuality= `ffmpeg -i ${ output } -vcodec libx264 -crf 27 ${ finalOutput }`
    console.log( decreaseQuality )
    await execCommand(
      decreaseQuality
    )
    await unlinkSync(output)
  }
  let iterable = async function(file, i){
    await tryCatchAsync((x) => fn(x, i), (err) => console.log(err))(file)
  }
  await mapAsync(iterable, files)
}

exports.dvd = dvd
