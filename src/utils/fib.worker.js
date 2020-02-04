import debounce from 'lodash/debounce'

const sleep = time =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })

const fib = i => (i <= 1 ? i : fib(i - 1) + fib(i - 2))

onmessage = async ({ data }) => {
    await sleep(1000)
    postMessage(fib(data))
}
