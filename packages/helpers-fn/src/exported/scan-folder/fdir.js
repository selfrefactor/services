/*
 * Forked from fdir (https://github.com/thecodrr/fdir) v6.5.0
 * MIT License — Copyright 2023 Abdullah Atta
 *
 * Drastically simplified — only supports:
 *   new fdir().withMaxDepth(n).withFullPaths().exclude(fn).filter(fn).crawl(root).withPromise()
 */

const path = require('path')
const fs = require('fs')

// ── Queue: tracks concurrent async fs calls ────────────────

class Queue {
  count = 0
  constructor(onEmpty) { this.onEmpty = onEmpty }
  enqueue() { this.count++ }
  dequeue(error) {
    if (this.onEmpty && (--this.count <= 0 || error)) {
      this.onEmpty(error)
      if (error) this.onEmpty = undefined
    }
  }
}

// ── Crawl implementation ───────────────────────────────────

function crawl(root, maxDepth, filters, excludeFn) {
  const paths = []
  const rootDir = root.endsWith(path.sep) ? root : root + path.sep

  return new Promise((resolve, reject) => {
    const queue = new Queue(error => {
      if (error) reject(error)
      else resolve(paths)
    })

    function walk(dirPath, depth) {
      if (depth < 0) return
      queue.enqueue()

      fs.readdir(dirPath || '.', { withFileTypes: true }, (err, entries = []) => {
        if (err) {
          // suppressErrors = true default — just ignore
          queue.dequeue(null)
          return
        }

        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i]

          if (entry.isFile() || entry.isSymbolicLink()) {
            const filePath = dirPath + entry.name
            if (
              filters.length === 0 ||
              filters.every(fn => fn(filePath, false))
            ) {
              paths.push(filePath)
            }
          } else if (entry.isDirectory()) {
            const subDir = dirPath + entry.name + path.sep
            if (excludeFn && excludeFn(entry.name, subDir)) continue
            walk(subDir, depth - 1)
          }
        }

        queue.dequeue(null)
      })
    }

    walk(rootDir, maxDepth)
  })
}

// ── Builder (returned by fdir()) ──────────────────────────

function fdir() {
  let maxDepth = Infinity
  let filters = []
  let excludeFn
  let root

  const api = {
    withMaxDepth(n)       { maxDepth = n; return api },
    withFullPaths()       { return api },
    exclude(fn)           { excludeFn = fn; return api },
    filter(fn)            { filters.push(fn); return api },
    crawl(r)              { root = path.resolve(r || '.'); return { withPromise: () => crawl(root, maxDepth, filters, excludeFn) } },
  }

  return api
}

exports.fdir = fdir
