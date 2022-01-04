const path = require('path') //用于获取项目绝对路径的库
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { appendFile } = require('fs')

module.exports = {
    entry: "./src/index.js",

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./dist'), //必须设置成绝对路径,相对路径会报错
        clean:true //打包时，清除上一次打包生成的文件
    },

    mode: 'development', //使webpack模式变为开发者模式
    devtool: 'inline-source-map',//当代码报错时，在控制台输出具体报错的位置，而不是定位到编译好后的bundle文件中

    plugins: [
        // 使用HtmlWebpackPlugin插件,该插件自动帮我们引入打包好的文件到index.html
	    // 文件，无需再手动引入
        new HtmlWebpackPlugin({
            template: './index.html', //以此文件为打包模板
            filename:'app.html',//将打包后生成的文件放在此文件(没有则会创建该文件)中展示
            inject: 'body'//将打包后的文件具体放在body标签中
        })
    ],

    // https://www.bilibili.com/video/BV1YU4y1g745?p=20
    devServer: {
        // 指定devServer的根目录
        static: './dist'

        // npx webpack-dev-server命令实际没有输出任何物理文件，
        // 他把打包好的bundle文件放在了内存里,就算把指定的dist文件删除也不会影响页面的展示(物理删除不影响内存中打包好的文件)
    }
}