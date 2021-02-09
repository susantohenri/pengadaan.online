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
    .type('[name="q"]', 'inurl:lpse')
    .click('[type="submit"]')

walkThroughPages('', () => {
    // nightmare.end().then()
})


function walkThroughPages(prevUrl, cb) {
    nightmare
        .wait(prevUrl => {
            return window.location.href !== prevUrl
        }, prevUrl)
        .inject('js', 'jquery-3.5.1.slim.min.js')
        .evaluate(() => {
            let cite = []
            $('.g [ping]').each(function () {
                cite.push($(this).attr('href'))
            })
            return {
                data: cite,
                url: window.location.href
            }
        })
        .then(result => {
            let { data, url } = result
            data = data.filter(url => { return url.indexOf('google') < 0 })
            for (url of data) console.log(url)
            nightmare
                .click('#pnnext')
                .then(() => {
                    walkThroughPages(url, cb)
                })
        })
        .catch(e => console.error)
}