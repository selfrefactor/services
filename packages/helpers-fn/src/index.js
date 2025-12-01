const { exec, execSafe, spawn } = require('./exported/exec')
const { log } = require('./log/log')
const { scanFolder } = require('./exported/scan-folder')
const { copy } = require('./exported/copy')
const { getStagedFiles } = require('./exported/get-staged-files')

exports.getStagedFiles = getStagedFiles
exports.scanFolder = scanFolder
exports.copy = copy 
exports.exec = exec
exports.execSafe = execSafe
exports.spawn = spawn
exports.log = log
