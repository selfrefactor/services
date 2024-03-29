const {
  translate,
  translateToBulgarian,
  translateToGerman,
} = require('./exported/translate')
const { createBenchmark } = require('./exported/create-benchmark')
const { createComplexBenchmark } = require('./exported/create-complex-benchmark')
const { exec, execSafe, spawn } = require('./exported/exec')
const { log } = require('./log/log')
const { runTests } = require('./exported/run-tests')
const { scanFolder } = require('./exported/scan-folder')
const { monitor, Monitor } = require('./exported/monitor')
const { defaultTo } = require('./exported/default-to')
const { copy } = require('./exported/copy')
const { getStagedFiles } = require('./exported/get-staged-files')

exports.getStagedFiles = getStagedFiles
exports.scanFolder = scanFolder
exports.copy = copy
exports.createBenchmark = createBenchmark
exports.createComplexBenchmark = createComplexBenchmark
exports.runTests = runTests
exports.translate = translate
exports.translateToBulgarian = translateToBulgarian
exports.translateToGerman = translateToGerman
exports.exec = exec
exports.execSafe = execSafe
exports.spawn = spawn
exports.log = log
exports.defaultTo = defaultTo
exports.Monitor = Monitor
exports.monitor = monitor
