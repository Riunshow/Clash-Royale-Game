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

    let tmpIndex = 1

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
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.5, 0.5, 0.5);
                    break;
                case 1:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.3, 0.15, 0.5);
                    break;
                case 2:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.3, 0.85, 0.5)
                    break;
                case 3:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.2, 0.2, 0.25)
                    break;
                case 4:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.2, 0.8, 0.25)
                    break;
                case 5:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.2, 0.2, 0.7)
                    break;
                case 6:
                    basicCageArray[i][j] = initCage(basicSpineArray[i][j], 0.2, 0.8, 0.7)
                    break;
                default:
                    break;
            }
            basicSpineArray[i][j].state.timeScale = 1;
            basicSpineArray[i][j].state.setAnimation(0, 'Shaking', true, 0);
        }

    }


    app.stage.addChild(basicCageArray[0][0]);


    function changeAnimation() {
        // if (loadprogress <= 0.75) {
        if (loadprogress) {
            app.stage.swapChildren(background2, background1)

            console.log(`tmpIndex: ${tmpIndex}`)

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



            tmpIndex++;

        } else {
            window.clearInterval(changeAni);
        }
    }

    let changeAni = setInterval(() => {
        changeAnimation()
    }, "3000");

    function show() {
        console.log(data);
        switch (data) {
            case 0:
                // king1_1.state.timeScale = 0.2
                break;

            case 1:
                // if (file == 0 || file == 1) {
                //     king1_1.state.setAnimation(0, 'Idle', true)
                // }
                // if (file == 2) {
                //     king1_1.state.setAnimation(0, 'Shaking', true)
                // }
                // king1_1.state.timeScale = 1.4
                break;

            case 2:
                // king1_1.state.timeScale = 1.6
                break;
            case 7:
                if (file == 0) {
                    // app.stage.removeChild(kingCage2_1, kingCage2_2);
                    // app.stage.addChild(kingCage1_1)
                    app.stage.removeChild(basicCageArray[tmpIndex - 1][1], basicCageArray[tmpIndex - 1][2]);
                    app.stage.addChild(basicCageArray[tmpIndex - 1][0]);
                }
                // king1_1.state.timeScale = 1.8;
                // king2_1.state.timeScale = 2.6;
                // king2_2.state.timeScale = 2.6;
                break;
            case 8:
                if (file == 2) {
                    // app.stage.removeChild(kingCage1_1, kingCage4_1, kingCage4_2, kingCage4_3, kingCage4_4);
                    // app.stage.addChild(kingCage2_1, kingCage2_2)
                    app.stage.removeChild(basicCageArray[tmpIndex - 1][0]);
                    app.stage.addChild(basicCageArray[tmpIndex - 1][1], basicCageArray[tmpIndex - 1][2]);
                }
                // king1_1.state.timeScale = 2.0;
                // king2_1.state.timeScale = 2.6;
                // king2_2.state.timeScale = 2.6;
                break;
            case 10:
                // king1_1.state.timeScale = 2.8
                break;
            case 15:
                if (file == 0) {
                    // app.stage.removeChild(kingCage1_1, kingCage4_1, kingCage4_2, kingCage4_3, kingCage4_4);
                    // app.stage.addChild(kingCage2_1, kingCage2_2)
                    app.stage.removeChild(basicCageArray[tmpIndex - 1][0], basicCageArray[tmpIndex - 1][3], basicCageArray[tmpIndex - 1][4], basicCageArray[tmpIndex - 1][5], basicCageArray[tmpIndex - 1][6]);
                    app.stage.addChild(basicCageArray[tmpIndex - 1][1], basicCageArray[tmpIndex - 1][2])
                }
                // king2_1.state.timeScale = 2.6;
                // king2_2.state.timeScale = 2.6;
                // king4_1.state.timeScale = 4;
                // king4_2.state.timeScale = 4;
                // king4_3.state.timeScale = 4;
                // king4_4.state.timeScale = 4;
                break;
            case 16:
                // king2_1.state.timeScale = 2.8;
                // king2_2.state.timeScale = 2.8;
                if (file == 2) {
                    // app.stage.removeChild(kingCage2_1, kingCage2_2);
                    // app.stage.addChild(kingCage4_1, kingCage4_2, kingCage4_3, kingCage4_4)
                    app.stage.removeChild(basicCageArray[tmpIndex - 1][1], basicCageArray[tmpIndex - 1][2]);
                    app.stage.addChild(basicCageArray[tmpIndex - 1][3], basicCageArray[tmpIndex - 1][4], basicCageArray[tmpIndex - 1][5], basicCageArray[tmpIndex - 1][6])
                }
                break;
            case 18:
                // king2_1.state.timeScale = 4.2;
                // king2_2.state.timeScale = 4.2;
                break;
            case 20:
                // king4_1.state.timeScale = 6;
                // king4_2.state.timeScale = 6;
                // king4_3.state.timeScale = 6;
                // king4_4.state.timeScale = 6;
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