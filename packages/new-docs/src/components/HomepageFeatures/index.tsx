import type { ReactNode } from 'react'
import { useState } from 'react'
import styles from './styles.module.css'
import { LiveProvider, LiveEditor } from 'react-live'
import CodeBlock from '@theme/CodeBlock'

export function debounce(func, ms) {
  let timeout

  return function (...input) {
    const later = function () {
      timeout = null
      return func.apply(null, input)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
  }
}

function evalCode(code: string) {
  try {
    let resultHolder: any = null
    let toEval = `${code}\n resultHolder = result`
    eval(toEval)
    return resultHolder
  } catch (e) {
    return `Error: ${e.message}`
  }
}

export default function HomepageFeatures(): ReactNode {
  const url = new URL(window.location.href)
  const replCode = decodeURIComponent(url.search.slice(1))
  const [replResult, setReplResult] = useState<any>(evalCode(replCode))

  const onCodeChange = (newCode: string) => {
    setReplResult(evalCode(newCode))
  }
  const debouncedOnCodeChange = debounce(onCodeChange, 300)

  return (
    <section className={styles.features}>
      <div className='container'>
        <LiveProvider code={replCode} noInline={true}>
          <div className='grid grid-cols-2 gap-4'>
            <LiveEditor
              className='font-mono'
              onChange={debouncedOnCodeChange}
            />
            <div className='p-4 border rounded font-mono'>
              <CodeBlock
                language='js'
                title='/src/components/HelloCodeTitle.js'
                showLineNumbers
              >
                {JSON.stringify(replResult, null, 2)}
              </CodeBlock>
            </div>
          </div>
        </LiveProvider>
      </div>
    </section>
  )
}
