const Nightmare = require('nightmare')
const nightmare = Nightmare({
    // gotoTimeout: 10000,
    waitTimeout: 5000,
    show: true,
    webPreferences: {
        images: false,
    }
})
const tahapToExclude = ['Selesai', 'Evaluasi', 'Tidak Ada Jadwal']
const maxPageToScan = 20
const minAvailableRecordToGoToNextPage = 1

var instansi = ["http://lpse.atrbpn.go.id/","https://lpse.kemendagri.go.id/","http://lpse.kemendesa.go.id/","https://eproc.esdm.go.id/","https://lpse.kemenkumham.go.id/","http://lpse.kkp.go.id/","http://lpse.kemkes.go.id/","https://lpse.kemnaker.go.id/","https://www.lpse.kemenkeu.go.id/","https://lpse.kominfo.go.id/","http://lpse.depkop.go.id/","http://lpse.menlhk.go.id/","https://lpse.kemlu.go.id/","https://lpse.kemenparekraf.go.id/","https://lpse.pu.go.id/","http://lpse.kemenpora.go.id/","https://lpse.menpan.go.id/","https://lpse.kemdikbud.go.id/","http://lpse.kemendag.go.id/","https://lpse.dephub.go.id/","https://lpse.kemenperin.go.id/","https://lpse.kemhan.go.id/","https://lpse.pertanian.go.id/","https://lpse.ristekbrin.go.id/","http://arsip-lpse.kemsos.go.id/","https://lpse.lkpp.go.id/","https://lpse.big.go.id/","http://lpse.bin.go.id/","http://lpse.bakamla.go.id/","http://lpse.bkkbn.go.id/","http://lpse.bkpm.go.id/","http://lpse.bmkg.go.id/","https://lpse.bnn.go.id/","http://lpse.bnpb.go.id/","http://lpse.bnpt.go.id/","http://www.lpse.basarnas.go.id/","http://lpse.bnp2tki.go.id/","http://103.116.173.249/","http://lpse.pom.go.id/","http://lpse.bppt.go.id/","http://lpse.bps.go.id/","https://lpse.bssn.go.id/","http://lpse.dpd.go.id/","https://lpse.dpr.go.id/","http://lpse.kejaksaan.go.id/","http://lpse.polri.go.id/","http://lpse.kpu.go.id/","https://lpse.lipi.go.id/","https://lpse.lapan.go.id/","http://lpse.tvri.co.id/","https://lpse.mahkamahagung.go.id/","http://lpse.mahkamahkonstitusi.go.id/","http://lpse.mpr.go.id/","https://lpse.jakarta.go.id/","https://lpse.acehprov.go.id/","http://lpse.acehbaratkab.go.id/","http://lpse.acehbaratdayakab.go.id/","http://lpse.acehbesarkab.go.id/","http://lpse.acehjayakab.go.id/","http://lpse.acehselatankab.go.id/","http://lpse.acehsingkilkab.go.id/","https://lpse.acehtamiangkab.go.id/","http://lpse.acehtengahkab.go.id/","http://lpse.acehtenggarakab.go.id/","http://lpse.acehtimurkab.go.id/","http://lpse.acehutara.go.id/","http://lpse.benermeriahkab.go.id/","http://lpse.bireuenkab.go.id/","http://lpse.gayolueskab.go.id/","http://lpse.naganrayakab.go.id/","http://lpse.pidiekab.go.id/","https://lpse.pidiejayakab.go.id/","http://lpse.simeuluekab.go.id/","https://lpse.bandaacehkota.go.id/","http://lpse.langsakota.go.id/","http://lpse.lhokseumawekota.go.id/","http://lpse.sabangkota.go.id/","http://lpse.subulussalamkota.go.id/","http://lpse.baliprov.go.id/","http://lpse.badungkab.go.id/","http://lpse.banglikab.go.id/","https://eproc.bulelengkab.go.id/","http://lpse.gianyarkab.go.id/","https://lpse.jembranakab.go.id/","http://lpse.karangasemkab.go.id/","https://lpse.klungkungkab.go.id/","https://lpse.tabanankab.go.id/","http://lpse.babelprov.go.id/","http://lpse.bangka.go.id/","https://lpse.bangkabaratkab.go.id/","http://lpse.bangkaselatankab.go.id/","http://lpse.bangkatengahkab.go.id/","https://lpse.belitungkab.go.id/","https://lpse.belitungtimurkab.go.id/","http://lpse.pangkalpinangkota.go.id/","https://lpse.bantenprov.go.id/","https://lpse.lebakkab.go.id/","http://lpse.pandeglangkab.go.id/","http://lpse.serangkab.go.id/","https://lpse.tangerangkab.go.id/","http://lpse.cilegon.go.id/","https://lpse.serangkota.go.id/","https://lpse.tangerangkota.go.id/","https://lpse.tangerangselatankota.go.id/","https://lpse.bengkuluprov.go.id/","http://lpse.bengkuluselatankab.go.id/","http://lpse.bengkulutengahkab.go.id/","https://lpse.bengkuluutarakab.go.id/","http://lpse.kaurkab.go.id/","http://lpse.kepahiangkab.go.id/","http://lpse.lebongkab.go.id/","http://lpse.mukomukokab.go.id/","http://lpse.rejanglebongkab.go.id/","http://lpse.selumakab.go.id/","http://lpse.bengkulukota.go.id/","https://lpse.jogjaprov.go.id/","http://lpse.gunungkidulkab.go.id/","http://lpse.kulonprogokab.go.id/","https://lpse.slemankab.go.id/","http://lpse.jogjakota.go.id/","https://lpse.gorontaloprov.go.id/","http://lpse.boalemokab.go.id/","http://lpse.bonebolangokab.go.id/","http://lpse.gorontalokab.go.id/","https://lpse.gorutkab.go.id/","https://lpse.pohuwatokab.go.id/","http://lpse.gorontalokota.go.id/","http://lpse.jambiprov.go.id/","http://lpse.batangharikab.go.id/","http://lpse.bungokab.go.id/","http://lpse.kerincikab.go.id/","http://lpse.meranginkab.go.id/","http://lpse.muarojambikab.go.id/","http://lpse.sarolangunkab.go.id/","http://lpse.tanjabbarkab.go.id/","http://lpse.tanjabtimkab.go.id/","http://lpse.tebokab.go.id/","http://lpse.jambikota.go.id/","http://lpse.sungaipenuhkota.go.id/","http://www.lpse.jabarprov.go.id/","http://lpse.bandungbaratkab.go.id/","https://lpse.bekasikab.go.id/","http://lpse.bogorkab.go.id/","https://lpse.ciamiskab.go.id/","http://lpse.cianjurkab.go.id/","http://lpse.indramayukab.go.id/","http://lpse.karawangkab.go.id/","http://lpse.kuningankab.go.id/","http://lpse.majalengkakab.go.id/","http://lpse.purwakartakab.go.id/","http://lpse.subang.go.id/","http://lpse.sukabumikab.go.id/","http://lpse.sumedangkab.go.id/","http://lpse.tasikmalayakab.go.id/","http://lpse.bandung.go.id/","http://lpse.banjarkota.go.id/","http://lpse.bekasikota.go.id/","https://eproc.kotabogor.go.id/","http://lpse.cimahikota.go.id/","http://lpse.cirebonkota.go.id/","https://lpse.depok.go.id/","http://lpse.tasikmalayakota.go.id/","http://lpse.jatengprov.go.id/","http://lpse.banjarnegarakab.go.id/","http://lpse.banyumaskab.go.id/","http://lpse.batangkab.go.id/","http://lpse.blorakab.go.id/","https://lpse.boyolali.go.id/","http://lpse.brebeskab.go.id/","https://lpse.cilacapkab.go.id/","http://lpse.demakkab.go.id/","http://lpse.grobogan.go.id/","http://lpse.jeparakab.go.id/","http://lpse.karanganyarkab.go.id/","https://www.lpse.kendalkab.go.id/","http://lpse.klatenkab.go.id/","http://lpse.kuduskab.go.id/","http://lpse.magelangkab.go.id/","http://lpsepatikab.org/","https://lpse.pekalongankab.go.id/","http://lpse.pemalangkab.go.id/","http://lpse.purbalinggakab.go.id/","https://lpse.purworejokab.go.id/","http://lpse.rembangkab.go.id/","http://lpse.semarangkab.go.id/","http://lpse.sragenkab.go.id/","http://lpse.sukoharjokab.go.id/","http://lpse.tegalkab.go.id/","http://lpse.temanggungkab.go.id/","https://www.lpse.wonogirikab.go.id/","http://lpse.wonosobokab.go.id/","https://lpse.magelangkota.go.id/","http://lpse.pekalongankota.go.id/","http://lpse.salatiga.go.id/","https://lpse.semarangkota.go.id/","http://lpse.surakarta.go.id/","https://lpse.tegalkota.go.id/","https://lpse.jatimprov.go.id/","https://lpse.bangkalankab.go.id/","https://lpse.banyuwangikab.go.id/","http://lpse.blitarkab.go.id/","http://lpse.bojonegorokab.go.id/","http://lpse.bondowosokab.go.id/","http://lpse.jemberkab.go.id/","http://lpse.jombangkab.go.id/","http://lpse.kedirikab.go.id/","http://lpse.lamongankab.go.id/","http://lpse.lumajangkab.go.id/","http://lpse.madiunkab.go.id/","http://lpse.magetan.go.id/","https://lpse.malangkab.go.id/","http://lpse.mojokertokab.go.id/","https://lpse.nganjukkab.go.id/","https://lpse.ngawikab.go.id/","https://lpse.pacitankab.go.id/","https://lpse.pamekasankab.go.id/","https://lpse.pasuruankab.go.id/","https://lpse.ponorogo.go.id/","http://lpse.probolinggokab.go.id/","http://lpse.sampangkab.go.id/","https://lpse.sidoarjokab.go.id/","http://lpse.situbondokab.go.id/","http://lpse.sumenepkab.go.id/","http://lpse.trenggalekkab.go.id/","http://lpse.tubankab.go.id/","http://lpse.tulungagung.go.id/","http://lpse.batukota.go.id/","http://lpse.blitarkota.go.id/","http://lpse.kedirikota.go.id/","http://lpse.madiunkota.go.id/","https://lpse.malangkota.go.id/","https://lpse.mojokertokota.go.id/","http://lpse.probolinggokota.go.id/","https://lpse.surabaya.go.id/","https://lpse.kalbarprov.go.id/","http://lpse.bengkayangkab.go.id/","http://lpse.kapuashulukab.go.id/","http://118.97.211.5/","http://lpse.ketapangkab.go.id/","http://lpse.kuburayakab.go.id/","http://lpse.landakkab.go.id/","https://lpse.melawikab.go.id/","http://lpse.mempawahkab.go.id/","http://lpse.sambas.go.id/","http://lpse.sanggau.go.id/","http://lpse.sekadaukab.go.id/","http://lpse.sintang.go.id/","https://lpse.pontianakkota.go.id/","http://lpse.singkawangkota.go.id/","http://lpse.kalselprov.go.id/","http://lpse.balangankab.go.id/","https://lpse.banjarkab.go.id/","http://www.lpse.baritokualakab.go.id/","http://lpse.hulusungaiselatankab.go.id/","http://lpse.hulusungaitengahkab.go.id/","http://lpse.hulusungaiutarakab.go.id/","http://lpse.kotabarukab.go.id/","https://lpse.tabalongkab.go.id/","http://lpse.tanahbumbukab.go.id/","https://lpse.tanahlautkab.go.id/","http://lpse.tapinkab.go.id/","http://lpse.banjarmasinkota.go.id/","https://lpse.kalteng.go.id/","https://lpse.baritoselatankab.go.id/","https://lpse.baritotimurkab.go.id/","https://lpse.baritoutarakab.go.id/","https://lpse.gunungmaskab.go.id/"/*,"http://lpse.kapuaskab.go.id/"*/,"http://lpse.katingankab.go.id/","http://lpse.kotawaringinbaratkab.go.id/","https://lpse.kotimkab.go.id/","http://lpse.lamandaukab.go.id/","http://lpse.kabmurungraya.go.id/","http://lpse.pulangpisaukab.go.id/","https://lpse.sukamarakab.go.id/","http://lpse.seruyankab.go.id/","https://lpse.palangkaraya.go.id/","https://lpse.kaltimprov.go.id/","http://lpse.kutaibaratkab.go.id/","http://lpse.kutaikartanegarakab.go.id/","http://lpse.kutaitimurkab.go.id/","http://lpse.mahakamulukab.go.id/","http://lpse.paserkab.go.id/","https://lpse.penajamkab.go.id/","http://lpse.balikpapan.go.id/","http://lpse.bontangkota.go.id/","http://lpse.samarindakota.go.id/","https://lpse.kaltaraprov.go.id/","http://spse.bulungan.go.id/","http://lpse.malinau.go.id/","http://lpse.tanatidungkab.go.id/","http://lpse.tarakankota.go.id/","http://lpse.kepriprov.go.id/","http://lpse.bintankab.go.id/","http://103.131.61.12/","http://lpse.anambaskab.go.id/","http://lpse.linggakab.go.id/","http://lpse.natunakab.go.id/","https://lpse.batam.go.id/","http://lpse.tanjungpinangkota.go.id/","http://lpse.sulbarprov.go.id/","http://lpse.majenekab.go.id/","http://lpse.mamujutengahkab.go.id/","http://lpse.polmankab.go.id/","http://www.lpse.mamasakab.go.id/","https://lpse.sulselprov.go.id/","http://lpse.bantaengkab.go.id/","http://lpse.barrukab.go.id/","http://lpse.bone.go.id/","http://lpse.bulukumbakab.go.id/","http://lpse.enrekangkab.go.id/","http://lpse.gowakab.go.id/","https://lpse.jenepontokab.go.id/","http://lpse.kepulauanselayarkab.go.id/","http://lpse.luwukab.go.id/","https://lpse.luwutimurkab.go.id/","http://lpse.luwuutarakab.go.id/","http://lpse.maroskab.go.id/","http://lpse.pangkepkab.go.id/","http://lpse.pinrangkab.go.id/","http://lpse.sidrapkab.go.id/","http://lpse.sinjaikab.go.id/","http://lpse.soppengkab.go.id/","http://lpse.takalarkab.go.id/","http://103.77.206.186/","http://www.lpse-torajautara.go.id/","http://lpse-wajokab.go.id/","https://lpse.makassar.go.id/","http://lpse.palopokota.go.id/","http://112.78.46.114/","http://lpse.sultengprov.go.id/","http://www.lpse.banggaikab.go.id/","http://lpsebuolkab.org/","http://lpse.donggala.go.id/","http://lpse.morowalikab.go.id/","http://lpse.morowaliutarakab.go.id/","http://lpse.parigimoutongkab.go.id/","http://lpse.posokab.go.id/","http://lpse.tojounaunakab.go.id/","http://118.97.36.171/","http://lpse.sigikab.go.id/","http://lpse.palukota.go.id/","http://lpse.sultraprov.go.id/","http://202.93.137.147/","http://lpse.butonkab.go.id/","http://lpse.butonselatankab.go.id/","http://lpse.butonutarakab.go.id/","http://lpse.kolakakab.go.id/","http://lpse.konaweselatankab.go.id/","http://lpse.konaweutarakab.go.id/","http://lpse.wakatobikab.go.id/","http://lpse.baubaukota.go.id/","http://lpse.dumaikota.go.id/","http://lpse.riau.go.id/","http://lpse.gresikkab.go.id/","https://lpse.lomboktengahkab.go.id/","http://lpse.nttprov.go.id/","http://lpse.sumbarprov.go.id/","https://lpse.lampungprov.go.id/","http://lpse.pekanbaru.go.id/","http://lpse.padang.go.id/","http://lpse.pemkomedan.go.id/","https://lpse.sumbawabaratkab.go.id/","http://lpse.tanjungbalaikota.go.id/","http://lpse.bengkaliskab.go.id/","http://lpse.bandungkab.go.id/","http://lpse.sbbkab.go.id/","http://lpse.waykanankab.go.id/","http://lpse.merauke.go.id/","https://lpse.papua.go.id/","http://lpse.inhukab.go.id/","http://lpse.sumbawakab.go.id/","http://lpse.lahatkab.go.id/","http://lpse.sumselprov.go.id/","http://lpse.bombanakab.go.id/","http://lpse.pesawarankab.go.id/","http://lpse.okukab.go.id/","http://lpse.palembang.go.id/","http://lpse.lembatakab.go.id/","https://lpse.ntbprov.go.id/","http://lpse.bantulkab.go.id/","https://lpse.mentawaikab.go.id/","http://lpse.palikab.go.id/","http://lpse.pasamankab.go.id/","http://lpse.labuhanbatukab.go.id/","http://lpse.empatlawangkab.go.id/","http://lpse.bimakota.go.id/","http://lpse.maltengkab.go.id/","http://lpse.lomboktimurkab.go.id/","http://lpse.lombokbaratkab.go.id/","http://lpse.musirawaskab.go.id/","http://lpse.bolmongkab.go.id/","https://lpse.humbanghasundutankab.go.id/","http://lpse.tanahdatar.go.id/","http://lpse.banyuasinkab.go.id/","https://lpse.kotamobagukota.go.id/","http://lpse.siakkab.go.id/","http://lpse.pariamankota.go.id/","http://lpse.asmatkab.go.id/","http://lpse.halmaheraselatankab.go.id/","https://lpse.kemenag.go.id/"]


function walkThroughInstansies(url, cb) {
    var index = instansi.indexOf(url)
    url = `${url}eproc4`
    nightmare
    .goto(`${url}/lelang`)
    .wait(`#tbllelang > tbody > tr`)
    .then(() => {
        walkThroughPages(1, [], scrapped => {
            filterData(`${url}/lelang`, scrapped, () => {
                if (instansi[index + 1]) walkThroughInstansies (instansi[index + 1], cb)
                else cb()
            })
        })
    })
    .catch(e => {
        if (instansi[index + 1]) walkThroughInstansies (instansi[index + 1], cb)
        else cb()
    })
}

function walkThroughPages(page, records, cb) {
    return nightmare
        .evaluate((tahapToExclude) => {
            var data = []
            $(`#tbllelang > tbody > tr`).each(function () {
                let tahap = $(this).find(`td:nth-child(4) > a`).text()
                let exclude = tahapToExclude.reduce(function (result, word) {
                    result = result || tahap.indexOf(word) > -1
                    return result
                }, false)
                if (exclude) return true

                let detail = $(this).find(`td:nth-child(2) > p:nth-child(2)`).html().split('- ')

                data.push([
                    'start date goes here',
                    $(this).find('td:eq(0)').html(),
                    $(this).find('td:eq(1)').html().replace('href="', `href="${window.location.origin}`),
                    detail[0],
                    $(this).find('td:eq(2)').html(),
                    // $(this).find('td:eq(3)').html().replace('href="', `href="${window.location.origin}`),
                    $(this).find('td:eq(3) a').text().replace(' [...]', ''),
                    $(this).find('td:eq(4)').html()
                ])
            })
            return {
                data,
                isLastPage: `not-allowed` === $(`[aria-label="Next"]`).css('cursor'),
                firstCode : $(`#tbllelang > tbody > tr:nth-child(1) > td.sorting_1`).html()
            }
        }, tahapToExclude)
        .then(result => {
            let { data, isLastPage, firstCode } = result
            records = records.concat(data)

            if (isLastPage || page >= maxPageToScan || data.length < minAvailableRecordToGoToNextPage)
            {
                return cb(records)
            }
            else
            {
                nightmare
                .evaluate(page => {
                    return $(`a[data-dt-idx]:contains(${page + 1})`).click()
                }, page)
                .wait(250)
                .wait((firstCode, page) => {
                    console.log('-------', page, firstCode, $(`#tbllelang > tbody > tr:nth-child(1) > td.sorting_1`).html())
                    return $(`#tbllelang > tbody > tr:nth-child(1) > td.sorting_1`).html() !== firstCode
                }, firstCode, page)
                .then(() => {
                    walkThroughPages(page + 1, records, cb)
                })
                .catch(e => {
                    walkThroughPages(page + 1, records, cb)
                })
            }
        })
        .catch(e => {
            // console.error('----------- fail scraping!', e)
            walkThroughPages(page + 1, records, cb)
        })
}

function filterData (url, scrapped, cb)
{
    let obj = scrapped[0]
    scrapped.shift()
    if (!obj)
    {
        cb()
        return false
    }
    let kode = obj[1]
    let dest = `${url}/${obj[1]}/jadwal?token=${Math.random().toString(36).slice(2)}`
    nightmare
    .goto(dest)
    .evaluate(() => {
        if (null === document.getElementById('footer')) setTimeout(function () {
            location.reload()
        }, 5000)
    })
    .wait('#footer')
    .evaluate(() => {
        let start = ''
        let end = ''
        let startPlace = 'body > div:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(3)'
        if ($(startPlace).length > 0) start = $(startPlace).html()
        $('body > div:nth-child(2) > div > table > tbody > tr').not(':eq(0)').each(function () {
            if (end !== '') return false
            if ($(this).find('td:nth-child(2)').html().indexOf('Evaluasi') > -1)
            {
                end = $(this).find('td:nth-child(3)').html()
            }
        })

        if (start === '' && end === '')
        {
            startPlace = '#main > div > table > tbody > tr:nth-child(2) > td:nth-child(3)'
            if ($(startPlace).length > 0) start = $(startPlace).html()
            $('#main > div > table > tbody > tr').not(':eq(0)').each(function () {
                if (end !== '') return false
                if ($(this).find('td:nth-child(2)').html().indexOf('Evaluasi') > -1)
                {
                    end = $(this).find('td:nth-child(3)').html()
                }
            })
        }

        return {start, end}
    })
    .then(result => {
        let  {start, end} = result
        // obj.start = start
        // obj.end = end
        let endtime = buildEndtime(end)
        let now = new Date()
        if (now < endtime)
        {
            obj[0] = start
            getLocation(obj, done => {
                console.log(JSON.stringify(done), ', ')
                if (scrapped.length > 0) filterData (url, scrapped, cb)
                else cb ()
            })
        }
        else
        {
            if (scrapped.length > 0) filterData (url, scrapped, cb)
            else cb ()
        }
    })
    .catch(e => {
        // console.log('---- fail to get scehdule', dest)
        if (scrapped.length > 0) filterData (url, scrapped, cb)
        else cb ()
    })
}

function getLocation (obj, cb)
{
    var locPlace = 'body > div:nth-child(2) > div > table > tbody > tr:nth-child(14) > td > ul > li:nth-child(1)'
    let url = obj[2]
    url = url.split('href=\"')[1]
    url = url.split('\" target=\"_blank')[0]
    nightmare
        .goto(url)
        .wait(locPlace)
        .evaluate(locPlace => {
            return $(locPlace).length > 0 ? $(locPlace).html().split('- ')[1] : ''
        }, locPlace)
        .then(location => {
            obj.push(location)
            cb (obj)
        })
        .catch(e => {
            obj.push('')
            cb (obj)
        })
}

function buildEndtime (end)
{
    let bulan = end.split(' ')[1]
    let month = bulanToMonth (bulan)
    end = end.replace(bulan, month)
    return new Date(end)
}

function bulanToMonth (bulan)
{
    switch (bulan)
    {
        case 'Januari': return 'January' ;break
        case 'Februari': return 'February' ;break
        case 'Maret': return 'March' ;break
        case 'April': return 'April' ;break
        case 'Mei': return 'May' ;break
        case 'Juni': return 'June' ;break
        case 'Juli': return 'July' ;break
        case 'Agustus': return 'August' ;break
        case 'September': return 'September' ;break
        case 'Oktober': return 'October' ;break
        case 'November': return 'November' ;break
        case 'Desember': return 'December' ;break
    }
}

console.time()
walkThroughInstansies(instansi[0], () => {
    console.timeEnd()
    nightmare.end().then()
})