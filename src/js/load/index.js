import '../../css/index.scss'

import 'pixi.js'
import 'pixi-spine'

import { spinesData } from '../../../assets/spines'
import { soundsData } from '../../../assets/sounds'
import { cardImg } from '../../../assets/cardImg'
import { baseImg } from '../../../assets/img'


let loadprogress = 0; //资源加载的进度
let realyprogress = 0; //实际展示的进度
let truepropress = 0; //如果为两秒时加载的进度
// 进度条
let flag = document.getElementById('icon-flag');
let processBar = document.getElementById('process-bar');

const propresstime = setInterval(() => {
    truepropress += 5;
    realyprogress = (truepropress < loadprogress) ? truepropress : loadprogress;

    if (realyprogress >= 100) {
        realyprogress = 100;
        window.clearInterval(propresstime);
        buttonshow();
    }

    processBar.style.width = realyprogress + '%';

}, 100)


// loading data
export const pixiLoader =
    PIXI.loader
    .add(soundsData)
    .add(cardImg)
    .add(baseImg)
    .add(spinesData)
    .on('progress', (loader, resource) => {
        const { progress } = loader;
        // console.log(`[${progress}%]${resource.name}`)
        loadprogress = Math.round(progress)
    })
    .load()

function buttonshow() {

    document.querySelector('.xui-process').style.display = 'none';
    document.getElementById('begin_button').style.display = 'inline-block';
    console.log('load success')
}