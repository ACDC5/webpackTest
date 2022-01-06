const path = require('path') //用于获取项目绝对路径的库
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { appendFile } = require('fs')

module.exports = { //打包入口
    entry: "./src/index.js",

    output: {//文件打包后输出的路径以及名称等
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./dist'), //必须设置成绝对路径,相对路径会报错
        clean:true, //打包时，清除上一次打包生成的文件
        //设置js文件中引用的资源打包后的路径以及文件名:方式1:
        // assetModuleFilename: "images/test.png",//自定义资源打包后的存放的路径以及名字
        assetModuleFilename: "images/[contenthash][ext]",//不可能所有的资源打包后都叫同一个名称,所以:第一个[]:根据文件内容生成哈希文件名，第二[]:可以使用原格式，或使用ext扩展名
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
    },

    module: {
        rules: [
            //资源模块
            {
                test: /\.png$/,//指定打包的资源格式
                type: 'asset/resource', //Resource资源类型，对应图片，文件的打包,打包后在浏览器元素界面看到的是一个本地图片地址
                //设置js文件中引用的资源打包后的路径以及文件名:方式2:
                // 该方式优先先级高于于方式1
                generator: {
                    filename: "images/[contenthash][ext]"
                }

            },
            {
                test:/\.svg$/,//指定打包的资源格式
                type: "asset/inline" //inline资源类型，打包后导出base64的字符串(dataURL的)资源类型， 即打包后在浏览器元素界面上可以看到该资源的base64类型url；
                                        //可以在页面代码里面引用这个字符串
            },
            {
                test:/\.txt$/,
                type: "asset/source" //source资源类型，打包后于导出资源的源代码(即打包后在浏览器元素界面该资源是以源代码形似展示的)
            },
            {
                test:/\.jpg$/,
                type: "asset" , /*通用资源类型，打包后导出一个base64类型或一个单独的文件资源，这取决于文件大小，
                                webpack默认当文件大于8k时，会将文件打包成一个资源(即单独的文件，对应上面的resource类型)，
                                小于8k时以base64的形式打包(即对应上面的inline类型);如何改变默认的设置呢？看下面的配置*/
                parser: {
                    dataUrlCondition:{
                        maxSize: 4 * 1024 * 1024 //当图片大于4M时，即在指定的目录下生成资源文件(即类型为resource的资源);否则打包成base64的资源类型(即类型为inline的资源)
                    }
                }
            },
            //Loader
            {
                //https://www.bilibili.com/video/BV1YU4y1g745?p=29
                test: /\.(css|less)$/,
                //安装了两个库，(css-loader)用来支持对css文件的打包，(style-loader)用来将css文件放到页面上
                //这里的使用顺序不能变，必须先执行css-loader(没错执行顺序是从后到前的)；webpack支持loader的链式调用，
                //第一个loader(即css-loader)的结果会将转化后的源传递给下一个loader(style-loader)，最终webpack将style-loader
                //返回的js渲染到页面上;同样的也支持less的loader
                use: ['style-loader','css-loader','less-loader']
            }
        ]
    }
}