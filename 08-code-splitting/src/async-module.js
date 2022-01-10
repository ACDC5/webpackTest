function getComponent() {
    ////动态导入 https://www.bilibili.com/video/BV1YU4y1g745?p=43
    return import('lodash')
        .then(({default: _ }) => {
            const element = document.createElement('div')

            element.innerHTML = _.join(['hello','webpack'],' ')
            return element
        })
}

getComponent().then( element => {
    document.body.appendChild(element)
})