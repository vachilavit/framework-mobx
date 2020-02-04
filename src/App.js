import React, { useState } from 'react'
import FormExample from 'components/example/FormExample'
import { useWebWorkerFromWorker } from 'react-webworker-hook'

const fibWorker = new Worker('utils/fib.worker', { type: 'module' })

const fib = n => (n < 2 ? n : fib(n - 1) + fib(n - 2))

const App = () => {
    const [data, postData, error] = useWebWorkerFromWorker(fibWorker)
    const [count, setCount] = useState(0)

    console.log(data)
    return (
        <>
            <button
                onClick={() => {
                    setCount(count + 20)
                    // fib(count + 10)
                    postData(count)
                }}
            >
                click
            </button>
            <FormExample />
        </>
    )
}

export default App
