import { pixiLoader } from './js/load'

import { PlayGround } from './js/backGround'
import { personAnimation } from './js/personAnimation'

const app = new PIXI.Application(window.innerWidth, window.innerHeight);
app.stage.interactive = true;

// const width = document.documentElement.clientWidth
// const height = document.documentElement.clientHeight

// app.renderer.autoResize = true
// app.renderer.resize(width, height)

// 渐入渐出
function alphaPlay(obj, method) { //method有两个值show或hidden 
    let n = (method == "show") ? 0 : 100;
    let time = setInterval(() => {
        if (method == "show") {
            if (n < 100) {
                n += 10;
                if (n == 100) {
                    obj.style.opacity = 1;
                } else {
                    obj.style.opacity = "0." + n;
                }
            } else {
                clearTimeout(time);
            }
        } else {
            if (n > 0) {
                n -= 10;
                obj.style.opacity = "0." + n;
            } else {
                clearTimeout(time);
            }
        }
    }, 50);
}

// 开始
document.getElementById('begin_button').addEventListener('click', () => {
    alphaPlay(document.getElementById('begin'), "hidden");
    document.getElementById('begin_button').style.display = "none";
    setTimeout(() => {
        document.getElementById('begin').style.zIndex = -1;
    }, 500);
    pixiLoader.load(play);
})

// 重新开始
document.getElementById('replay').addEventListener('click', () => {
    window.location.reload();
})

const play = (loader, res) => {

    personAnimation(app, res, alphaPlay)

    // const PA = new PersonAnimation(app, res)

}