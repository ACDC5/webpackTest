import helloWorld from './hello-world'
import imgsrc from './assets/githubCorner.png' //引入图片资源，webpack会根据配置文件打包该资源,打包后该资源的名字会和原名称不一样
import logSvg from './assets/logo.svg'
import exampleTxt from './assets/example.txt'
import jpgMap from './assets/Forest_road_Slavne_2017_G8.jpg'
import _ from 'lodash'

// https://www.bilibili.com/video/BV1YU4y1g745?p=43
import './async-module.js' //使用动态导入来分离代码(公共的代码)

import './style.css'
import './style.less'

/**
 *  TODO https://www.bilibili.com/video/BV1YU4y1g745?p=44 从这开始
 *  就没往下记笔记和写代码了(讲的枯燥)；计划先把剩下的全部看完，以后用到在看一遍和在
 *  这个项目中写一遍
 *
 * */

/**分别演示了js代码的打包和各种文件资源的打包*/
helloWorld()

const img = document.createElement('img')
img.src = imgsrc
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.style.cssText = 'width:600px; height:200px'
img2.src = logSvg
document.body.appendChild(img2)

const block = document.createElement('div')
block.style.cssText = 'width:200px; height:200px; background:aliceblue'
block.classList.add('block-bg') //在css中加载图片
block.textContent = exampleTxt
document.body.appendChild(block)

const img3 = document.createElement('img')
img3.style.cssText = 'width:600px; height:240px; display:block'
img3.src = jpgMap
document.body.appendChild(img3)

document.body.classList.add('hello')

console.log(_.join(['index','module','loaded :)'],'+'))

