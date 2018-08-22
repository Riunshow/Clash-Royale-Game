import 'pixi.js'
import 'pixi-spine'

import { spinesData } from '../../../assets/spines'

export class PersonAnimation {
    constructor(app, res) {
        this.app = app
        this.res = res

        // 人物数量
        this.counts = [
            { row: 1, column: 1 },
            { row: 2, column: 1 },
            { row: 2, column: 2 },
        ]

        this.names = ['King', 'Barbarian', 'Goblin', 'Hog_Rider']
        this.nameIndex = 0

        this.animationInfo = {
            speed: 1,
            name: this.names[0],
            row: this.counts[0].row,
            column: this.counts[0].column,
        }

        // 时间记录
        this.startTime = this.getCurrentTime()
        this.latestClickTime = this.getCurrentTime()

        // 循环事件
        this.ticker = new PIXI.ticker.Ticker()
        this.ticker.stop()
        this.ticker.add(() => {
            this.changeSpeed()
            this.changePersonName()
                // this._initPersonBasic()
        })
        this.showPlay()

        this.ticker.start()

        // 销毁循环
        let countTimer = 15
        const timer = setInterval(() => {
            countTimer--;
            if (countTimer == 0) {
                this.ticker.destroy();
                window.clearInterval(timer);
            }
        }, 1000)


        // 点击事件
        this.app.stage.on('tap', () => {
            if (countTimer > 0) {
                this.latestClickTime = this.getCurrentTime()
            }
        })
    }

    // 获取当前时间
    getCurrentTime() {
        return new Date().getTime()
    }

    // 根据人物数量设置坐标
    _initPersonBasic() {
        const { row, column } = this.animationInfo

        const paddingX = 50
        const paddingY = 100
        const unitWidth = (this.app.screen.width - 2 * paddingX) / row
        const unitHeight = (this.app.screen.height - 2 * paddingY) / column

        const position = []
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                position.push({
                    x: paddingX + unitWidth * (0.5 + i),
                    y: paddingY + unitHeight * (0.5 + j),
                    width: unitWidth,
                    height: unitHeight,
                })
            }
        }

        console.log('position: ', position)
        return position
    }

    // 根据数据生成 spine
    generateSpine(name) {
        const spine = new PIXI.spine.Spine(this.res[name].spineData)
        spine.skeleton.setSkinByName(name)
        return spine
    }

    // 初始化人物
    initPerson(width, height) {
        const animationName = 'Shaking'

        // 生成 spine
        const spine = this.generateSpine(this.animationInfo.name)


        // 设置动画
        spine.state.setAnimation(0, animationName, true)
        spine.skeleton.setSlotsToSetupPose();

        // position
        const scale = Math.min(width / spine.width, height / spine.height)
        const localRect = spine.getLocalBounds()
        spine.position.set(-localRect.x, -localRect.y)
        spine.scale.set(scale)

        spine.state.timeScale = this.animationInfo.speed || 1

        return spine
    }

    // 初始化容器
    initContainer(x, y, height, width) {
        const container = new PIXI.Container();
        container.x = x
        container.y = y
        container.height = height
        container.width = width


        const spine = this.initPerson(width, height);
        container.addChild(spine);

        return container;
    }

    // 展示
    showPlay() {
        const position = this._initPersonBasic()
        position.map((d) => {
            this.app.stage.addChild(this.initContainer(d.x, d.y, d.height, d.width))
        })
    }

    // 初始化 +1
    initPlus1() {

    }

    // 设置速度
    changeSpeed() {
        const currentTime = this.getCurrentTime();
        const isQuick = currentTime - this.latestClickTime < 200

        const addSpeed = 1 / 20
        const subSpeed = 1 / 10

        const max = 15
        const min = 1

        let { speed } = this.animationInfo

        // 根据速度判断当前是几个人
        if (speed > 8) {
            this.animationInfo.row = this.counts[2].row;
            this.animationInfo.column = this.counts[2].column;
        } else if (speed > 4) {
            this.animationInfo.row = this.counts[1].row;
            this.animationInfo.column = this.counts[1].column;
        } else {
            this.animationInfo.row = this.counts[0].row;
            this.animationInfo.column = this.counts[0].column;
        }

        // 判断加速还是减速
        if (isQuick) {
            speed < max ? this.animationInfo.speed += addSpeed : this.animationInfo.speed = max
        } else {
            speed > min ? this.animationInfo.speed -= subSpeed : this.animationInfo.speed = min
        }
    }

    // 3s 切换人物名字
    changePersonName() {
        const currentTime = this.getCurrentTime()
        const timer = currentTime - this.startTime
        if (timer > 2950) {
            this.nameIndex = this.nameIndex < this.names.length - 1 ? this.nameIndex + 1 : 0
            this.animationInfo.name = this.names[this.nameIndex]
            this.startTime = currentTime
        }
    }
}