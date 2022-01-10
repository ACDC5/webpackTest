function getString() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('成功hello world')
        },1500)
    })
}
async function helloWorld() {
    let string = await getString()
    console.log(string)
}

export default helloWorld