const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: true,
    webPreferences: {
        images: false
    }
})

async function getData (url) {
    var page_number_index = 2
    const nmi = nightmare
        .goto(url)
        .wait('#tbllelang > tbody > tr:nth-child(1) > td:nth-child(4) > a')
        // .end()
    let fresh = await loopPage (nmi, url, page_number_index, [])
    console.log(fresh)
    nmi.catch(error => {
        console.error('Search failed:', error)
    })
}

async function loopPage (nmInstance, url, page_number_index, freshData)
{
    return await nmInstance
    .evaluate(() => {
        var data = []
        $(`#tbllelang > tbody > tr`).each(function () {
            let detail = $(this).find(`td:nth-child(2) > p:nth-child(2)`).html().split('- ')
        
            data.push({
                kode: $(this).find(`td.sorting_1`).html(),
                nama: $(this).find(`td:nth-child(2) > p:nth-child(1) > a`).html(),
                spse: $(this).find(`td:nth-child(2) > p:nth-child(1) > span.label-danger`).html(),
                isTenderUlang: $(this).find(`td:nth-child(2) > p:nth-child(1) > a > span.label-warning`).length > 0,
                isEvaluasiUlang: $(this).find(`td:nth-child(2) > p:nth-child(1) > a > span.label-info`).length > 0,
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
    .then(data => {
        data = data.map(record => {
            record.pengumuman = `${url}/${record.kode}/pengumumanlelang`
            record.jadwal = `${url}/${record.kode}/jadwal`
            return record
        })
        let selesai = data.filter(record => {
            return record.tahap.indexOf('Selesai') > -1
        })
        let fresh = data.filter(record => {
            return record.tahap.indexOf('Selesai') < 0
        })
        
        freshData = freshData.concat(fresh)
        if (selesai.length > 0) return freshData
        else
        {
            page_number_index++
            loopPage (nmInstance, url, page_number_index, freshData)
        }
    })
}

getData('http://lpse.kolakakab.go.id/eproc4/lelang')