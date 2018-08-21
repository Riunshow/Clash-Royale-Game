const img_1_width = 92;
//
let time,
    speed,
    oldtime;
oldtime = new Date().getTime();

let file = 0;
let data = 0;

let clickCount = 0;
let app = new PIXI.Application(window.innerWidth, window.innerHeight);
let tmpTime = 0;

document
    .body
    .appendChild(app.view);

// bg1
let background1 = PIXI
    .Sprite
    .fromImage('./img/bg1.jpg');
background1
    .scale
    .set(1.5);
app
    .stage
    .addChild(background1);

// bg2
let background2 = PIXI
    .Sprite
    .fromImage('./img/bg2.jpg');
background2
    .scale
    .set(1.5);
app
    .stage
    .addChild(background2);

let clickScore1_1 = PIXI.Sprite.fromImage('./img/1.png');
let timebar = PIXI.Sprite.fromImage('./img/timebar.png')
let loadbg = PIXI.Sprite.fromImage('./img/loadbg.png')
let loadwiter = PIXI.Sprite.fromImage('./img/loadwiter.png')
let load = PIXI.Sprite.fromImage('./img/load.png')

let alienImages = [];
for (let i = 0; i <= 150; i++) {
    if (i < 10) {
        alienImages.push(`./cardImg/Card_000${i}.png`)
    } else if (i >= 10 && i < 100) {
        alienImages.push(`./cardImg/Card_00${i}.png`)
    } else {
        alienImages.push(`./cardImg/Card_0${i}.png`)
    }
}

let textureArray = [];

for (let i = 0; i <= 150; i++) {
    let texture = PIXI.Texture.fromImage(alienImages[i]);
    textureArray.push(texture);
};

let mc = new PIXI.extras.AnimatedSprite(textureArray);
mc.anchor.set(0.5, 0.5); //修正定位点
mc.position.set((app.screen.width - mc.width) * 0.5, (app.screen.height - mc.height) * 0.45);
mc.scale.set(1.5);
mc.animationSpeed = 0.5;
mc.loop = false;

let tmpProcess = 0
let processTimer = setInterval(() => {
    tmpProcess += 1;
    loadProcess(tmpProcess, 100);
    if (tmpProcess == 50) {
        window.clearInterval(processTimer);
    }
}, 50)


// load spine data
let spineloader = PIXI.loader
    .add('kings', './spines/king.json')
    .add('Hog_Rider', './spines/Hog_Rider.json')
    .add('Goblin', './spines/Goblin.json')
    .add('Barbarian', './spines/Barbarian.json')
    .on('progress', (loader, resource) => {
        const {
            progress
        } = loader;
        // console.log(`[${progress}%]${resource.name}`)
    }).load(buttonshow);


function buttonshow() {
    let processTimer = setInterval(() => {
        tmpProcess += 1;
        loadProcess(tmpProcess, 100);
        if (tmpProcess == 100) {
            window.clearInterval(processTimer);
            document.querySelector('.xui-process').style.display = 'none';
            document.getElementById('begin_button').style.display = 'inline-block';
            // console.log('load success')
        }
    }, 50)

}

function alphaPlay(obj, method) { //method有两个值show或hidden 
    var n = (method == "show") ? 0 : 100;
    var time = setInterval(function() {
        if (method == "show") {
            if (n < 100) {
                n += 10;
                if (n == 100) {
                    obj.style.opacity = 1
                } else {
                    obj.style.opacity = "0." + n
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

function play() {
    alphaPlay(document.getElementById('begin'), "hidden");
    document.getElementById('begin_button').style.display = "none"
    setTimeout(() => {
        document.getElementById('begin').style.zIndex = -1;
    }, 500);
    // onAssetsLoaded();
    spineloader.load(onAssetsLoaded)
}

function replay() {
    window.location.reload();
}

let time1;
// Basic layout 
timebar.anchor.set(0.5, 0.5); //修正定位点
timebar.scale.set(1.5);
timebar.position.set((app.screen.width) * 0.5, 60);
app.stage.addChild(timebar);

let timetext = new PIXI.Text('0:15', {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 70,
    fontFamily: 'myfont',
    fill: '#fff',
    align: 'center',
    stroke: '#000',
    strokeThickness: 7
})

timetext.anchor.set(0.5);
timetext.x = app.screen.width / 2;
timetext.y = 95;
app.stage.addChild(timetext)

const loadbgWH = 0.25; //加载背景图长宽比 
loadbg.anchor.set(0, 1); //修正定位点
loadbg.width = app.screen.width;
loadbg.height = app.screen.width * 0.25;
loadbg.zOrder = 1;

let scoretext = new PIXI.Text('0', {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 75,
    fontFamily: 'myfont',
    fill: '#fff',
    align: 'center',
    stroke: '#000',
    strokeThickness: 7
})
scoretext.anchor.set(0.5);
scoretext.x = app.screen.width * 0.29;
scoretext.y = -(app.screen.width * loadbgWH * 0.6);

loadwiter.scale.set(1);
loadwiter.anchor.set(0, 1);
loadwiter.zOrder = 2;
loadwiter.position.set(app.screen.width * 0.1, -(app.screen.width * loadbgWH * 0.25));
load.anchor.set(0, 1);
load.width = app.screen.width * 0.1;
let loadprogress = 0.1;

let countdown = 15;

function loadtime() {
    loadprogress += 0.0433
    if (loadprogress <= 0.75) {
        load.width = app.screen.width * loadprogress;
        countdown -= 1;
        timetext.text = '0:' + countdown;
    } else {
        window.clearInterval(time1);
    }
}



load.position.set(app.screen.width * 0.15, -(app.screen.width * loadbgWH * 0.38));

let loadcontainer = new PIXI.Container();
loadcontainer.width = app.screen.width;
loadcontainer.width = app.screen.width;
loadcontainer.height = app.screen.width * loadbgWH;
loadcontainer.position.set(0, app.screen.height);
app.stage.addChild(loadcontainer);
loadcontainer.addChild(loadbg);
loadcontainer.addChild(load);
loadcontainer.addChild(loadwiter);
loadcontainer.addChild(scoretext);
// ----------------- basic layout end -----------------

app.stage.interactive = true;



function initCreate(name, res) {
    switch (name) {
        case 'king':
            let basicKing = new PIXI.spine.Spine(res.kings.spineData);
            basicKing
                .skeleton
                .setSkinByName('King');
            basicKing
                .skeleton
                .setSlotsToSetupPose();

            return basicKing;
        case 'Hog_Rider':
            let basicHog_Rider = new PIXI.spine.Spine(res.Hog_Rider.spineData);
            basicHog_Rider
                .skeleton
                .setSkinByName('Hog_Rider');
            basicHog_Rider
                .skeleton
                .setSlotsToSetupPose();

            return basicHog_Rider;
        case 'Goblin':
            let basicGoblin = new PIXI.spine.Spine(res.Goblin.spineData);
            basicGoblin
                .skeleton
                .setSkinByName('Goblin');
            basicGoblin
                .skeleton
                .setSlotsToSetupPose();

            return basicGoblin;
        case 'Barbarian':
            let basicBarbarian = new PIXI.spine.Spine(res.Barbarian.spineData);
            basicBarbarian
                .skeleton
                .setSkinByName('Barbarian');
            basicBarbarian
                .skeleton
                .setSlotsToSetupPose();

            return basicBarbarian;
    }
}

// 
function initCage(basic, scale, positionX, positionY) {
    let basicCage = new PIXI.Container();
    basicCage.addChild(basic);

    let basiclocalRect = basic.getLocalBounds();

    basic
        .position
        .set(-basiclocalRect.x, -basiclocalRect.y);
    basicCage
        .scale
        .set(scale);
    basicCage
        .position
        .set((app.screen.width - basicCage.width) * positionX, (app.screen.height - basicCage.height) * positionY);

    return basicCage;
}


function onAssetsLoaded(loader, res) {
    time1 = setInterval("loadtime()", "1000");

    function addoneanimate(time) {
        requestAnimationFrame(addoneanimate);
        TWEEN.update(time);
    }
    requestAnimationFrame(addoneanimate);

    function addone(type) {
        switch (type) {
            case 1:
                let clickScore1_1 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore1_1.position.set((app.screen.width - img_1_width) * 0.5, (app.screen.height - basicCageArray[0][0].height) * 0.45 - 20);
                app.stage.addChild(clickScore1_1);
                var coords = {
                    x: 0,
                    y: 0
                }; // Start at (0, 0)
                var twwen = new TWEEN.Tween(coords)
                    .to({
                        x: 0,
                        y: 8
                    }, 300)
                    .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                    .onUpdate(function() { // Called after tween.js updates 'coords'.
                        clickScore1_1.y -= 5;
                    })
                    .start()
                    .onComplete(function() {
                        app.stage.removeChild(clickScore1_1)
                    }); // Start the tween immediately.
                break;
            case 2:
                let clickScore2_1 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore2_1.position.set((app.screen.width - img_1_width) * 0.3, (app.screen.height - basicCageArray[0][1].height) * 0.5 - 30);
                let clickScore2_2 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore2_2.position.set((app.screen.width - img_1_width) * 0.75, (app.screen.height - basicCageArray[0][2].height) * 0.5 - 30);
                app.stage.addChild(clickScore2_1, clickScore2_2);
                var coords = {
                    x: 0,
                    y: 0
                }; // Start at (0, 0)
                var twwen = new TWEEN.Tween(coords)
                    .to({
                        x: 0,
                        y: 8
                    }, 300)
                    .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                    .onUpdate(function() { // Called after tween.js updates 'coords'.
                        clickScore2_1.y -= 5;
                        clickScore2_2.y -= 5;
                    })
                    .start()
                    .onComplete(function() {
                        app.stage.removeChild(clickScore2_2, clickScore2_1)
                    }); // Start the tween immediately.
                break;
            case 4:
                let clickScore4_1 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore4_1.position.set((app.screen.width - img_1_width) * 0.3, (app.screen.height - basicCageArray[0][3].height) * 0.65 - 10);
                let clickScore4_2 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore4_2.position.set((app.screen.width - img_1_width) * 0.8, (app.screen.height - basicCageArray[0][4].height) * 0.65 - 10);
                let clickScore4_3 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore4_3.position.set((app.screen.width - img_1_width) * 0.3, (app.screen.height - basicCageArray[0][5].height) * 0.20 - 10);
                let clickScore4_4 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore4_4.position.set((app.screen.width - img_1_width) * 0.8, (app.screen.height - basicCageArray[0][6].height) * 0.20 - 10);
                app.stage.addChild(clickScore4_1, clickScore4_2, clickScore4_3, clickScore4_4);
                var coords = {
                    x: 0,
                    y: 0
                }; // Start at (0, 0)
                var twwen = new TWEEN.Tween(coords)
                    .to({
                        x: 0,
                        y: 8
                    }, 300)
                    .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                    .onUpdate(function() { // Called after tween.js updates 'coords'.
                        clickScore4_1.y -= 5;
                        clickScore4_2.y -= 5;
                        clickScore4_3.y -= 5;
                        clickScore4_4.y -= 5;
                    })
                    .start()
                    .onComplete(function() {
                        app.stage.removeChild(clickScore4_1, clickScore4_2, clickScore4_3, clickScore4_4)
                    }); // Start the tween immediately.
                break;
        }
    }


    let basicSpineArray = []
    let king = [],
        Barbarian = [],
        Goblin = [],
        Hog_Rider = [];
    for (let i = 0; i < 7; i++) {
        king.push(initCreate('king', res));
        Barbarian.push(initCreate('Barbarian', res));
        Goblin.push(initCreate('Goblin', res));
        Hog_Rider.push(initCreate('Hog_Rider', res));
    }

    basicSpineArray = [king, Barbarian, Goblin, Hog_Rider];

    let basicCageArray = [
        [],
        [],
        [],
        []
    ];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 7; j++) {
            switch (j) {
                case 0:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.4, 0.5, 0.45);
                    break;
                case 1:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.23, 0.15, 0.5);
                    break;
                case 2:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.23, 0.85, 0.5)
                    break;
                case 3:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.18, 0.2, 0.25)
                    break;
                case 4:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.18, 0.8, 0.25)
                    break;
                case 5:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.18, 0.2, 0.7)
                    break;
                case 6:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.18, 0.8, 0.7)
                    break;
                default:
                    break;
            }
            basicSpineArray[i][j].state.timeScale = 1;
            basicSpineArray[i][j].state.setAnimation(0, 'Shaking', true, 0);
        }

    }


    app.stage.addChild(basicCageArray[0][0]);

    var sound = new Howl({
        src: ['./sounds/King.mp3']
    });

    let tmpIndex = 1

    let audioAll = ['./sounds/King.mp3', './sounds/Barbarian.mp3', './sounds/Goblin.mp3', './sounds/Hog_Rider.mp3']

    function changeAnimation() {
        if (countdown > 0) {

            // if (loadprogress) {
            app.stage.swapChildren(background2, background1)

            // console.log(`tmpIndex: ${tmpIndex}`)

            if (tmpIndex >= basicCageArray.length) {
                for (const key in basicCageArray[basicCageArray.length - 1]) {
                    app.stage.removeChild(basicCageArray[basicCageArray.length - 1][key]);
                }

                tmpIndex = 0;
            } else {
                for (const key in basicCageArray[tmpIndex - 1]) {
                    app.stage.removeChild(basicCageArray[tmpIndex - 1][key]);
                }
            }


            if (data < 8) {
                // app.stage.removeChild(basicCageArray[tmpIndex][1], basicCageArray[tmpIndex][2]);
                app.stage.addChild(basicCageArray[tmpIndex][0]);
            } else if (data >= 8 && data < 16) {
                // app.stage.removeChild(basicCageArray[tmpIndex][0]);
                app.stage.addChild(basicCageArray[tmpIndex][1], basicCageArray[tmpIndex][2]);
            } else {
                app.stage.addChild(basicCageArray[tmpIndex][3], basicCageArray[tmpIndex][4], basicCageArray[tmpIndex][5], basicCageArray[tmpIndex][6]);
            }

            // audio change
            sound = new Howl({
                src: [audioAll[tmpIndex]]
            });

            tmpIndex++;

        } else {
            window.clearInterval(changeAni);
        }
    }

    let changeAni = setInterval(() => {
        changeAnimation()
    }, "3000");

    function show() {
        // console.log(data);
        switch (data) {
            case 0:
                basicSpineArray[tmpIndex - 1][0].state.timeScale = 1
                break;

            case 1:
                basicSpineArray[tmpIndex - 1][0].state.timeScale = 1.4
                break;

            case 2:
                basicSpineArray[tmpIndex - 1][0].state.timeScale = 1.6
                break;
            case 7:
                if (file == 0) {
                    app.stage.removeChild(basicCageArray[tmpIndex - 1][1], basicCageArray[tmpIndex - 1][2]);
                    app.stage.addChild(basicCageArray[tmpIndex - 1][0]);
                }
                basicSpineArray[tmpIndex - 1][0].state.timeScale = 1.8;
                basicSpineArray[tmpIndex - 1][1].state.timeScale = 2.6;
                basicSpineArray[tmpIndex - 1][2].state.timeScale = 2.6;
                break;
            case 8:
                if (file == 2) {
                    app.stage.removeChild(basicCageArray[tmpIndex - 1][0]);
                    app.stage.addChild(basicCageArray[tmpIndex - 1][1], basicCageArray[tmpIndex - 1][2]);
                }
                basicSpineArray[tmpIndex - 1][0].state.timeScale = 2.0;
                basicSpineArray[tmpIndex - 1][1].state.timeScale = 2.6;
                basicSpineArray[tmpIndex - 1][2].state.timeScale = 2.6;
                break;
            case 10:
                basicSpineArray[tmpIndex - 1][0].state.timeScale = 2.8
                break;
            case 15:
                if (file == 0) {
                    app.stage.removeChild(basicCageArray[tmpIndex - 1][0], basicCageArray[tmpIndex - 1][3], basicCageArray[tmpIndex - 1][4], basicCageArray[tmpIndex - 1][5], basicCageArray[tmpIndex - 1][6]);
                    app.stage.addChild(basicCageArray[tmpIndex - 1][1], basicCageArray[tmpIndex - 1][2])
                }
                basicSpineArray[tmpIndex - 1][1].state.timeScale = 2.6;
                basicSpineArray[tmpIndex - 1][2].state.timeScale = 2.6;
                basicSpineArray[tmpIndex - 1][3].state.timeScale = 4;
                basicSpineArray[tmpIndex - 1][4].state.timeScale = 4;
                basicSpineArray[tmpIndex - 1][5].state.timeScale = 4;
                basicSpineArray[tmpIndex - 1][6].state.timeScale = 4;
                break;
            case 16:
                basicSpineArray[tmpIndex - 1][1].state.timeScale = 2.8;
                basicSpineArray[tmpIndex - 1][2].state.timeScale = 2.8;
                if (file == 2) {
                    // app.stage.removeChild(kingCage2_1, kingCage2_2);
                    // app.stage.addChild(kingCage4_1, kingCage4_2, kingCage4_3, kingCage4_4)
                    app.stage.removeChild(basicCageArray[tmpIndex - 1][1], basicCageArray[tmpIndex - 1][2]);
                    app.stage.addChild(basicCageArray[tmpIndex - 1][3], basicCageArray[tmpIndex - 1][4], basicCageArray[tmpIndex - 1][5], basicCageArray[tmpIndex - 1][6])
                }
                break;
            case 18:
                basicSpineArray[tmpIndex - 1][1].state.timeScale = 4.2;
                basicSpineArray[tmpIndex - 1][2].state.timeScale = 4.2;
                break;
            case 20:
                basicSpineArray[tmpIndex - 1][3].state.timeScale = 6;
                basicSpineArray[tmpIndex - 1][4].state.timeScale = 6;
                basicSpineArray[tmpIndex - 1][5].state.timeScale = 6;
                basicSpineArray[tmpIndex - 1][6].state.timeScale = 6;
                break;
        }
    }

    function updata() {
        switch (file) {
            case 0:
                data -= 1;
                break;
            case 1:
                data -= 0;
                break;
            case 2:
                data += 1;
                break;
            case 3:
                data += 2;
                break;
        }

        if (data <= 0) {
            data = 0;
        }
        if (data >= 20) {
            data = 20;
        }
        show(); //渲染视图
        file = 0; //更新档位
    }

    // 帧动画



    mc.onComplete = () => {
        // console.log("complete");
        document.getElementById('score').innerText = clickCount;
        document.getElementById('end').style.zIndex = 1;
        document.getElementById('z_button').style.display = 'inline-block';
        alphaPlay(document.getElementById('end'), "show");
    };

    let timer = setInterval(function() {
        // 倒计时结束移除
        if (countdown == 0) {
            // console.log('--- 移除人物及倒计时 ---')
            for (let i = 0; i < 4; i++) {
                for (const key in basicCageArray[i]) {
                    app.stage.removeChild(basicCageArray[i][key]);
                }
            }
            app.stage.removeChild(timebar, timetext);

            mc.play();
            app.stage.addChild(mc);

            window.clearInterval(timer);
        } else {
            updata(); //0.2更新一次状态
        }
    }, 200)





    app
        .stage
        .on('pointertap', function() {
            if (countdown > 0) {
                sound.play();
                if (data < 8) {
                    addone(1);
                    clickCount++;
                    scoretext.text = clickCount;
                } else if (data >= 8 && data < 16) {
                    addone(2);
                    clickCount += 2;
                    scoretext.text = clickCount;

                } else {
                    addone(4);
                    clickCount += 4;
                    scoretext.text = clickCount;
                }

                time = new Date().getTime();
                speed = time - oldtime;
                if (speed > 300) {

                    file = 0;
                } else if (speed > 200) {
                    file = 1;
                } else {
                    file = 2;
                }
                oldtime = time;
                time = null;
            }
        })

};