import { pixiLoader } from './js/load'

import { PlayGround } from './js/backGround'

const app = new PIXI.Application(window.innerWidth, window.innerHeight);
app.stage.interactive = true;

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

const play = () => {
    const BG = new PlayGround(app)
    BG.initGround();
    BG.initTimeBorder();
    BG.initWaterProcess();
    BG.process();
    BG.changeBackground()
}