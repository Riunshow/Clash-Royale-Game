import '../../css/index.scss'

// const PIXI = require('pixi.js')
// const TWEEN = require('@tweenjs/tween.js');
// const pixi_spine = require('pixi-spine')
// const howler = require('howler')

import 'pixi.js'
import 'pixi-spine'

import { spinesData, spinesImg } from '../../../assets/spines'
import { soundsData } from '../../../assets/sounds'
import { cardImg } from '../../../assets/cardImg'
import { baseImg } from '../../../assets/img'

// 进度条
function loadProcess(hasGet, totalGet) {
    let flag = document.getElementById('icon-flag'),
        processBar = document.getElementById('process-bar'),
        widthPercentage = Math.round(hasGet / totalGet * 100);
    if (widthPercentage >= 100) {
        widthPercentage = 100;
    }
    flag.style.left = (widthPercentage - 1) + '%';
    processBar.style.width = widthPercentage + '%';
    if (widthPercentage == 0) {
        processBar.style.borderStyle = 'none';
    }
};

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
        loadProcess(progress, 100);
    })
    .load(buttonshow);

function buttonshow() {
    document.querySelector('.xui-process').style.display = 'none';
    document.getElementById('begin_button').style.display = 'inline-block';
    console.log('load success')
}