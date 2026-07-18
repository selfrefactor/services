const path = require('path')
const Mocha = require('mocha')
const glob = require('glob')

function run(testsRoot, cb) {
  console.log('[test-runner] testsRoot:', testsRoot)

  const mocha = new Mocha({ ui: 'tdd', color: true, timeout: 30000 })

  let files
  try {
    files = glob.sync('**.test.js', { cwd: testsRoot })
    console.log('[test-runner] files found:', files)
  } catch (error) {
    console.error('[test-runner] glob error:', error)
    return cb(error)
  }

  if (files.length === 0) {
    console.error('[test-runner] No test files found!')
    return cb(new Error('No test files found'))
  }

  files.forEach(f => {
    const fullPath = path.join(testsRoot, f)
    console.log('[test-runner] adding file:', fullPath)
    try {
      mocha.addFile(fullPath)
    } catch (error) {
      console.error('[test-runner] error adding file', f, error)
    }
  })

  console.log('[test-runner] starting Mocha...')
  const runner = mocha.run(failures => {
    console.log('[test-runner] Mocha finished, failures:', failures)
    cb(null, failures)
  })

  runner.on('test', test => {
    console.log('[test-runner] test started:', test.title)
  })
  runner.on('fail', (test, err) => {
    console.error('[test-runner] test failed:', test.title, err.message)
  })
}

exports.run = run
