const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: true,
    webPreferences: {
        images: false
    }
})

nightmare
    .goto('https://www.google.com/')
    .wait('[name="q"]')
    .type('[name="q"]', 'lpse')
    .click('[type="submit"]')

walkThroughPages('', () => {
    nightmare.end().then()
})


function walkThroughPages(prevUrl, cb) {
    nightmare
        .wait(prevUrl => {
            return window.location.href !== prevUrl
        }, prevUrl)
        .inject('js', 'jquery-3.5.1.slim.min.js')
        .evaluate(() => {
            let cite = []
            $('cite').each(function () {
                cite.push($(this).text().split(' ›')[0])
            })
            return {
                data: cite.filter((v, i, a) => a.indexOf(v) === i),
                url: window.location.href
            }
        })
        .then(result => {
            let { data, url } = result
            let notLPSE = data.filter(url => {
                return url.indexOf('lpse') < 0
            })
            if (notLPSE.length > 5) cb()
            else {
                for (url of data) console.log(url)
                nightmare
                    .click('#pnnext')
                    .then(() => {
                        walkThroughPages(url, cb)
                    })
            }
        })
        .catch(e => console.error)
}