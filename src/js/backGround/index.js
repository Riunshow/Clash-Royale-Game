const PIXI = require('pixi.js')

const { baseImg } = require('../../../assets/img')

export class PlayGround {
    constructor(app) {
        this.app = app;
        document.body.appendChild(this.app.view);
        // bg img
        this.background1 = PIXI.Sprite.fromImage(baseImg[1].url);
        this.background2 = PIXI.Sprite.fromImage(baseImg[2].url);

        this.timebar = PIXI.Sprite.fromImage(baseImg[6].url)
        this.loadbg = PIXI.Sprite.fromImage(baseImg[4].url)
        this.loadwiter = PIXI.Sprite.fromImage(baseImg[5].url)
        this.load = PIXI.Sprite.fromImage(baseImg[3].url)

        // 计时器
        this.timetext = new PIXI.Text('0:15', {
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: 70,
            fontFamily: 'myfont',
            fill: '#fff',
            align: 'center',
            stroke: '#000',
            strokeThickness: 7
        })

        // 圣水数字
        this.scoretext = new PIXI.Text('0', {
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: 75,
            fontFamily: 'myfont',
            fill: '#fff',
            align: 'center',
            stroke: '#000',
            strokeThickness: 7
        })

        this.loadprogress = 0.1;
        this.countdown = 15;
    }

    // 初始化背景图
    initGround() {
        // bg1
        this.background1.scale.set(1.5);
        this.app.stage.addChild(this.background1);
        // bg2
        this.background2.scale.set(1.5);
        this.app.stage.addChild(this.background2);
    }

    // 初始化计时器
    initTimeBorder() {
        // 计时器
        this.timebar.anchor.set(0.5, 0.5); //修正定位点
        this.timebar.scale.set(1.5);
        this.timebar.position.set((this.app.screen.width) * 0.5, 60);
        this.app.stage.addChild(this.timebar);

        // 数字
        this.timetext.anchor.set(0.5);
        this.timetext.x = this.app.screen.width / 2;
        this.timetext.y = 95;
        this.app.stage.addChild(this.timetext)
    }

    // 初始化圣水及进度条
    initWaterProcess() {
        // 圣水背景图
        const loadbgWH = 0.25; //加载背景图长宽比 

        this.loadbg.anchor.set(0, 1); //修正定位点
        this.loadbg.width = this.app.screen.width;
        this.loadbg.height = this.app.screen.width * 0.25;
        this.loadbg.zOrder = 1;

        // 圣水数字
        this.scoretext.anchor.set(0.5);
        this.scoretext.x = this.app.screen.width * 0.29;
        this.scoretext.y = -(this.app.screen.width * loadbgWH * 0.6);

        // 进度条
        this.loadwiter.scale.set(1);
        this.loadwiter.anchor.set(0, 1);
        this.loadwiter.zOrder = 2;
        this.loadwiter.position.set(this.app.screen.width * 0.1, -(this.app.screen.width * loadbgWH * 0.25));

        // 进度格
        this.load.anchor.set(0, 1);
        this.load.width = this.app.screen.width * 0.1;
        this.load.position.set(this.app.screen.width * 0.15, -(this.app.screen.width * loadbgWH * 0.38));

        // 创建容器包裹
        let loadcontainer = new PIXI.Container();
        loadcontainer.width = this.app.screen.width;
        loadcontainer.width = this.app.screen.width;
        loadcontainer.height = this.app.screen.width * loadbgWH;
        loadcontainer.position.set(0, this.app.screen.height);
        this.app.stage.addChild(loadcontainer);
        loadcontainer.addChild(this.loadbg);
        loadcontainer.addChild(this.load);
        loadcontainer.addChild(this.loadwiter);
        loadcontainer.addChild(this.scoretext);
    }

    // 圣水进度条
    process() {
        const timer = setInterval(() => {
            this.loadprogress += 0.0433
            if (this.loadprogress <= 0.75) {
                this.load.width = this.app.screen.width * this.loadprogress;
                this.countdown -= 1;
                this.timetext.text = '0:' + this.countdown;
            } else {
                window.clearInterval(timer);
            }
        }, "1000");

    }

    // 3s 切换背景图
    changeBackground() {
        const timer = setInterval(() => {
            if (this.countdown != 0) {
                this.app.stage.swapChildren(this.background2, this.background1)
            } else {
                window.clearInterval(timer);
            }
        }, 3000)

    }
}