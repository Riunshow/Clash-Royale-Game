// audio
var sound = new Howl({
    src: ['./../king_happy_04.wav']
});

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

// 3s 切换背景图
function changeBgImg() {

}
let timeBgImg = setInterval("changeBgImg()", "3000");

// Basic layout 
let timebar = PIXI.Sprite.fromImage('./img/timebar.png')
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
let loadbg = PIXI.Sprite.fromImage('./img/loadbg.png')
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

let loadwiter = PIXI.Sprite.fromImage('./img/loadwiter.png')
loadwiter.scale.set(1.3);
loadwiter.anchor.set(0, 1);
loadwiter.zOrder = 2;
loadwiter.position.set(app.screen.width * 0.1, -(app.screen.width * loadbgWH * 0.25));
let load = PIXI.Sprite.fromImage('./img/load.png')
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
let time1 = setInterval("loadtime()", "1000");


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

// load spine data
PIXI
    .loader
    .add('kings', './../spines/king.json')
    .add('Hog_Rider', './../spines/Hog_Rider.json')
    .add('Goblin', './../spines/Goblin.json')
    .add('Barbarian', './../spines/Barbarian.json')
    .on('progress', (loader, resource) => {
        const { progress } = loader
        console.log(`[${progress}%] ${resource.name}`)
    })
    .load(onAssetsLoaded);

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
    function addoneanimate(time) {
        requestAnimationFrame(addoneanimate);
        TWEEN.update(time);
    }
    requestAnimationFrame(addoneanimate);

    function addone(type) {
        switch (type) {
            case 1:
                let clickScore1_1 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore1_1.position.set((app.screen.width - img_1_width) * 0.5, (app.screen.height - kingCage1_1.height) * 0.45 - 20);
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
                clickScore2_1.position.set((app.screen.width - img_1_width) * 0.3, (app.screen.height - kingCage2_1.height) * 0.5 - 30);
                let clickScore2_2 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore2_2.position.set((app.screen.width - img_1_width) * 0.75, (app.screen.height - kingCage2_2.height) * 0.5 - 30);
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
                clickScore4_1.position.set((app.screen.width - img_1_width) * 0.3, (app.screen.height - kingCage4_1.height) * 0.65 - 10);
                let clickScore4_2 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore4_2.position.set((app.screen.width - img_1_width) * 0.8, (app.screen.height - kingCage4_2.height) * 0.65 - 10);
                let clickScore4_3 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore4_3.position.set((app.screen.width - img_1_width) * 0.3, (app.screen.height - kingCage4_3.height) * 0.20 - 10);
                let clickScore4_4 = PIXI.Sprite.fromImage('./img/1.png');
                clickScore4_4.position.set((app.screen.width - img_1_width) * 0.8, (app.screen.height - kingCage4_4.height) * 0.20 - 10);
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

    // king
    let king1_1 = initCreate('king', res);
    let king2_1 = initCreate('king', res);
    let king2_2 = initCreate('king', res);
    let king4_1 = initCreate('king', res)
    let king4_2 = initCreate('king', res)
    let king4_3 = initCreate('king', res)
    let king4_4 = initCreate('king', res)


    let kingCage1_1 = initCage(king1_1, 0.5, 0.5, 0.5);
    let kingCage2_1 = initCage(king2_1, 0.3, 0.15, 0.5);
    let kingCage2_2 = initCage(king2_2, 0.3, 0.85, 0.5);
    let kingCage4_1 = initCage(king4_1, 0.2, 0.2, 0.25);
    let kingCage4_2 = initCage(king4_2, 0.2, 0.8, 0.25);
    let kingCage4_3 = initCage(king4_3, 0.2, 0.2, 0.7);
    let kingCage4_4 = initCage(king4_4, 0.2, 0.8, 0.7);


    // Barbarian
    let Barbarian1_1 = initCreate('Barbarian', res);
    let Barbarian2_1 = initCreate('Barbarian', res);
    let Barbarian2_2 = initCreate('Barbarian', res);

    let BarbarianCage1_1 = initCage(Barbarian1_1, 0.5, 0.5, 0.5);
    let BarbarianCage2_1 = initCage(Barbarian2_1, 0.3, 0.15, 0.5);
    let BarbarianCage2_2 = initCage(Barbarian2_2, 0.3, 0.85, 0.5);

    // Goblin
    let Goblin1_1 = initCreate('Goblin', res);
    let Goblin2_1 = initCreate('Goblin', res);
    let Goblin2_2 = initCreate('Goblin', res);

    let GoblinCage1_1 = initCage(Goblin1_1, 0.5, 0.5, 0.5);
    let GoblinCage2_2 = initCage(Goblin2_2, 0.3, 0.85, 0.5);
    let GoblinCage2_1 = initCage(Goblin2_1, 0.3, 0.15, 0.5);

    // Hog_Rider
    let Hog_Rider1_1 = initCreate('Hog_Rider', res);
    let Hog_Rider2_1 = initCreate('Hog_Rider', res);
    let Hog_Rider2_2 = initCreate('Hog_Rider', res);

    let Hog_RiderCage1_1 = initCage(Hog_Rider1_1, 0.5, 0.5, 0.5);
    let Hog_RiderCage2_1 = initCage(Hog_Rider2_1, 0.3, 0.85, 0.5);
    let Hog_RiderCage2_2 = initCage(Hog_Rider2_2, 0.3, 0.15, 0.5);



    let tmpIndex = 1
    let tmpArray = [kingCage1_1, BarbarianCage1_1, GoblinCage1_1, Hog_RiderCage1_1]
    let testTmpArray = [
        [
            kingCage1_1,
            kingCage2_1,
            kingCage2_2,
            kingCage4_1,
            kingCage4_2,
            kingCage4_3,
            kingCage4_4,
        ],
        [
            BarbarianCage1_1,
            BarbarianCage2_1,
            BarbarianCage2_2,
        ],
        [
            GoblinCage1_1,
            GoblinCage2_2,
            GoblinCage2_1,
        ],
        [
            Hog_RiderCage1_1,
            Hog_RiderCage2_1,
            Hog_RiderCage2_2,
        ]
    ]
    app.stage.addChild(testTmpArray[0][0]);


    function changeAnimation() {
        // if (loadprogress <= 0.75) {
        if (loadprogress) {
            app.stage.swapChildren(background2, background1)

            // if (tmpIndex >= tmpArray.length) {
            //     app.stage.removeChild(tmpArray[tmpArray.length - 1]);

            //     tmpIndex = 0;
            // } else {
            //     app.stage.removeChild(tmpArray[tmpIndex - 1]);
            // }
            // app.stage.addChild(tmpArray[tmpIndex]);

            console.log(`tmpIndex: ${tmpIndex}`)

            if (tmpIndex >= testTmpArray.length) {
                for (const key in testTmpArray[testTmpArray.length - 1]) {
                    app.stage.removeChild(testTmpArray[testTmpArray.length - 1][key]);
                }

                tmpIndex = 0;
            } else {
                for (const key in testTmpArray[tmpIndex - 1]) {
                    app.stage.removeChild(testTmpArray[tmpIndex - 1][key]);
                }
            }

            if (data < 8) {
                // app.stage.removeChild(testTmpArray[tmpIndex][1], testTmpArray[tmpIndex][2]);
                app.stage.addChild(testTmpArray[tmpIndex][0]);
            } else if (data >= 8 && data < 16) {
                // app.stage.removeChild(testTmpArray[tmpIndex][0]);
                app.stage.addChild(testTmpArray[tmpIndex][1], testTmpArray[tmpIndex][2]);
            }



            tmpIndex++;

        } else {
            window.clearInterval(changeAni);
        }
    }

    let changeAni = setInterval(() => {
        changeAnimation()
    }, "3000");


    Barbarian1_1.state.setAnimation(0, 'Shaking', true, 0);
    Barbarian1_1.state.timeScale = 1

    Hog_Rider1_1.state.setAnimation(0, 'Shaking', true, 0);
    Hog_Rider1_1.state.timeScale = 1

    Goblin1_1.state.setAnimation(0, 'Shaking', true, 0);
    Goblin1_1.state.timeScale = 1

    king1_1.state.setAnimation(0, 'Shaking', true, 0);
    // king1_1.stateData.setMix('Idle', 'Shaking', 2);
    // king1_1.stateData.setMix('Shaking', 'Idle', 2);
    king1_1.state.timeScale = 1

    king2_1.state.setAnimation(0, 'Shaking', true, 0);
    king2_2.state.setAnimation(0, 'Shaking', true, 0);

    king4_1.state.setAnimation(0, 'Shaking', true, 0);
    king4_2.state.setAnimation(0, 'Shaking', true, 0);
    king4_3.state.setAnimation(0, 'Shaking', true, 0);
    king4_4.state.setAnimation(0, 'Shaking', true, 0);

    function show() {
        console.log(data);
        switch (data) {
            case 0:
                king1_1.state.timeScale = 0.2
                break;

            case 1:
                // if (file == 0 || file == 1) {
                //     king1_1.state.setAnimation(0, 'Idle', true)
                // }
                // if (file == 2) {
                //     king1_1.state.setAnimation(0, 'Shaking', true)
                // }
                king1_1.state.timeScale = 1.4
                break;

            case 2:
                king1_1.state.timeScale = 1.6
                break;
            case 7:
                if (file == 0) {
                    // app.stage.removeChild(kingCage2_1, kingCage2_2);
                    // app.stage.addChild(kingCage1_1)
                    app.stage.removeChild(testTmpArray[tmpIndex - 1][1], testTmpArray[tmpIndex - 1][2]);
                    app.stage.addChild(testTmpArray[tmpIndex - 1][0]);
                }
                king1_1.state.timeScale = 1.8;
                king2_1.state.timeScale = 2.6;
                king2_2.state.timeScale = 2.6;
                break;
            case 8:
                if (file == 2) {
                    // app.stage.removeChild(kingCage1_1, kingCage4_1, kingCage4_2, kingCage4_3, kingCage4_4);
                    // app.stage.addChild(kingCage2_1, kingCage2_2)
                    app.stage.removeChild(testTmpArray[tmpIndex - 1][0]);
                    app.stage.addChild(testTmpArray[tmpIndex - 1][1], testTmpArray[tmpIndex - 1][2]);
                }
                king1_1.state.timeScale = 2.0;
                king2_1.state.timeScale = 2.6;
                king2_2.state.timeScale = 2.6;
                break;
            case 10:
                king1_1.state.timeScale = 2.8
                break;
            case 15:
                if (file == 0) {
                    // app.stage.removeChild(kingCage1_1, kingCage4_1, kingCage4_2, kingCage4_3, kingCage4_4);
                    // app.stage.addChild(kingCage2_1, kingCage2_2)
                }
                king2_1.state.timeScale = 2.6;
                king2_2.state.timeScale = 2.6;
                king4_1.state.timeScale = 4;
                king4_2.state.timeScale = 4;
                king4_3.state.timeScale = 4;
                king4_4.state.timeScale = 4;
                break;
            case 16:
                king2_1.state.timeScale = 2.8;
                king2_2.state.timeScale = 2.8;
                if (file == 2) {
                    // app.stage.removeChild(kingCage2_1, kingCage2_2);
                    // app.stage.addChild(kingCage4_1, kingCage4_2, kingCage4_3, kingCage4_4)
                }
                break;
            case 18:
                king2_1.state.timeScale = 4.2;
                king2_2.state.timeScale = 4.2;
                break;
            case 20:
                king4_1.state.timeScale = 6;
                king4_2.state.timeScale = 6;
                king4_3.state.timeScale = 6;
                king4_4.state.timeScale = 6;
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
    let timer = setInterval(function() {
        updata(); //0.5更新一次状态
    }, 200)

    app
        .stage
        .on('pointertap', function() {
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
        })

};