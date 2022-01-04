const path = require('path') //用于获取项目绝对路径的库
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { appendFile } = require('fs')

module.exports = {
    entry: "./src/index.js",

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./dist'), //必须设置成绝对路径,相对路径会报错
        clean:true //清除上一次打包生成的文件
    },

    mode: 'none',

    plugins: [
        // 使用HtmlWebpackPlugin插件,该插件自动帮我们引入打包好的文件到index.html
	    // 文件，无需再手动引入
        new HtmlWebpackPlugin({
            template: './index.html', //以此文件为打包模板
            filename:'app.html',//将打包后生成的文件放在此文件(没有则会创建该文件)中展示
            inject: 'body'//将打包后的文件具体放在body标签中
        })
    ]
}