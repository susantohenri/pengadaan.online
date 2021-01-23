const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: true,
    webPreferences: {
        images: false
    }
})

function getData () {
    nightmare
        .goto('http://lpse.barrukab.go.id/eproc4/lelang')
        .wait('#tbllelang > tbody > tr:nth-child(1) > td:nth-child(4) > a')
        .evaluate(() => {
            var data = []
            $(`#tbllelang > tbody > tr`).each(function () {
                let detail = $(this).find(`td:nth-child(2) > p:nth-child(2)`).html().split('- ')
            
                data.push({
                    kode: $(this).find(`td.sorting_1`).html(),
                    nama: $(this).find(`td:nth-child(2) > p:nth-child(1) > a`).html(),
                    spse: $(this).find(`td:nth-child(2) > p:nth-child(1) > span.label-danger`).html(),
                    isTenderUlang: $(this).find(`td:nth-child(2) > p:nth-child(1) > a > span.label-warning`).length > 0,
                    kategori: $.trim(detail[0]),
                    tahunAnggaran: $.trim(detail[1]),
                    isTender: $.trim(detail[2]),
                    detail: $.trim(detail[3]),
                    nilaiKontrak: $(this).find(`td:nth-child(2) > p:nth-child(3)`).html().split(': ')[1],
                    instansi: $(this).find(`td:nth-child(3)`).html(),
                    tahap: $(this).find(`td:nth-child(4) > a`).text(),
                    hps: $(this).find(`td:nth-child(5)`).html()
                })
            })
            return data
        })
        .end()
        .then(console.log)
        .catch(error => {
            console.error('Search failed:', error)
        })
}

getData()