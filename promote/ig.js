const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: true,
    webPreferences: {
        images: false
    }
})
var commented_accounts = ['lpkntraining', 'ulfayul88', 'patralearningcenter', 'pelatihan.lpkn', 'mmustika58', 'gitaslvi1', 'klikmro', 'pengadaanku', 'cv.diannafiriadikarya', 'datalelang.id', 'terraland_officechair', 'wensora867', 'bpbj_kutaibarat', 'samijayamitrautama', 'koranbaliexpress', 'seminar.land', 'tenderonlineid', 'lapakmesinindo', 'iwan.tms', 'unipro_topi', 'caspercomputerboyolali', 'prawira_jaya_kahutama', 'ratnafjr96', 'mamika_home', 'pmkonsulindo', 'emeraldapparel.id', 'kppnmajene', 'rackbesijabar', 'serviceacmalang_pasangacmalang', 'kdjindonesia', 'khosasindo_pratama', 'serviceac_purwakarta', 'indrawaty79', 'humaskotamojokerto', 'kurniasih_tulipwarecimahi', 'birolppbmn_kemenhub', 'go_rent_scaffolding', 'fatmo_advertising', 'dp3akjatim.official']
const comment = `permisi kak, mohon izin berbagi info pengadaan terbaru seluruh Indonesia gratis, cek linknya di bio kita. terima kasih`

nightmare
    .goto('https://www.instagram.com/')
    .wait('[name="password"]')
    .type('[name="username"]', '083187201262')
    .type('[name="password"]', 'x123123x')
    .click('[type="submit"]')
    .wait('[placeholder="Search"]')
    .type('[placeholder="Search"]', '#pengadaanbarangjasa')
    .wait('[href^="/explore/tags/"]')
    .click('[href^="/explore/tags/"]')
    .wait('h1')
    .inject('js', 'jquery-3.5.1.slim.min.js')
    .url()
    .click('[tabindex="0"][href^="/p/"]')
    .then(url => {
        walkThroughModal(url)
    })


function walkThroughModal(prevURL) {
    nightmare
        .wait(prevURL => {
            return window.location.href !== prevURL
        }, prevURL)
        .evaluate(() => {// DEBUG
            console.log(new Date().toString().split(' ')[4], window.location.href)
        })
        .wait('body > div > div > div > article > div > div > a > time')
        .wait(1000) // PREVENT IG GRAPHQL RATE LIMITED
        .evaluate(() => {
            let time = $('body > div > div > div > article > div > div > a > time').html()
            let username = $('body > div > div > div > article > header > div > div > div > span > a').text()
            return { time, username }
        })
        .then(data => {
            let { time, username } = data
            if ((time.indexOf('hours ago') > -1 || time.indexOf('day ago') > -1 || time.indexOf('days ago') > -1) && commented_accounts.indexOf(username) < 0) {
                nightmare
                    .wait('body > div > div > div > article > div > section > div > form > textarea')
                    .type('body > div > div > div > article > div > section > div > form > textarea', comment)
                    .wait('[type="submit"]')
                    .click('[type="submit"]')
                    .then(() => {
                        console.log(data.username)
                        commented_accounts.push(username)
                        nightmare
                            .url()
                            .click('.coreSpriteRightPaginationArrow')
                            .then(url => {
                                walkThroughModal(url)
                            })
                    })
            } else {
                nightmare
                    .click('.coreSpriteRightPaginationArrow')
                    .then(walkThroughModal)
            }
        })
        .catch(e => {
            nightmare
                .url()
                .then(url => {
                    walkThroughModal(url)
                })
        })
}