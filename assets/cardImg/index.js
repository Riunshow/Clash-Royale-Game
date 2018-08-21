const cardImg = []

for (let i = 0; i <= 150; i++) {
    if (i < 10) {
        cardImg.push({
            name: `Card_000${i}.png`,
            url: require(`./Card_000${i}.png`)
        })
    } else if (i >= 10 && i < 100) {
        cardImg.push({
            name: `Card_00${i}.png`,
            url: require(`./Card_00${i}.png`)
        })
    } else {
        cardImg.push({
            name: `Card_0${i}.png`,
            url: require(`./Card_0${i}.png`)
        })
    }
}

module.exports = {
    cardImg
};