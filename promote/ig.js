const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: true,
    webPreferences: {
        images: false
    }
})
var commented_accounts = ['lpkntraining', 'ulfayul88', 'patralearningcenter', 'pelatihan.lpkn', 'mmustika58', 'gitaslvi1', 'klikmro']
const comment = `permisi kak, mohon izin berbagi info pengadaan terbaru seluruh Indonesia gratis, cek linknya di bio kita. terima kasih`

nightmare
    .goto('https://www.instagram.com/')
    .wait('[name="password"]')
    .type('[name="username"]', '083187201262')
    .type('[name="password"]', 'x123123x')
    .click('[type="submit"]')
    .wait('[placeholder="Search"]')
    .type('[placeholder="Search"]', '#pengadaan')
    .wait('[href^="/explore/tags/"]')
    .click('[href^="/explore/tags/"]')
    .wait('h1')
    .inject('js', 'jquery-3.5.1.slim.min.js')
    .click('[tabindex="0"][href^="/p/"]')
    .then(walkThroughModal)


function walkThroughModal() {
    nightmare
        .wait(2000)
        .wait('body > div > div > div > article > div > div > a > time')
        .evaluate(() => {
            let time = $('body > div > div > div > article > div > div > a > time').html()
            let username = $('body > div > div > div > article > header > div > div > div > span > a').text()
            return { time, username }
        })
        .then(data => {
            let { time, username } = data
            if ((time.indexOf('hours ago') > -1 || time.indexOf('days ago') > -1) && commented_accounts.indexOf(username) < 0) {
                nightmare
                    .wait('body > div > div > div > article > div > section > div > form > textarea')
                    .type('body > div > div > div > article > div > section > div > form > textarea', comment)
                    .wait('[type="submit"]')
                    .click('[type="submit"]')
                    .then(() => {
                        console.log(data.username)
                        commented_accounts.push(username)
                        nightmare
                            .click('.coreSpriteRightPaginationArrow')
                            .then(walkThroughModal)
                    })
            } else {
                nightmare
                    .click('.coreSpriteRightPaginationArrow')
                    .then(walkThroughModal)
            }
        })
}