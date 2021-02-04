const Nightmare = require('nightmare')
const nightmare = Nightmare({
    // gotoTimeout: 10000,
    // waitTimeout: 10000,
    show: true,
    webPreferences: {
        images: false,
    }
})
const tahapToExclude = ['Selesai', 'Evaluasi', 'Tidak Ada Jadwal']
const maxPageToScan = 20
const minAvailableRecordToGoToNextPage = 1

var instansi = ['https://lpse.kemenag.go.id/eproc4', 'http://lpse.atrbpn.go.id/eproc4', 'https://lpse.kemendagri.go.id/eproc4', 'http://lpse.kemendesa.go.id/eproc4', 'https://eproc.esdm.go.id/eproc4', 'https://lpse.kemenkumham.go.id/eproc4', 'http://lpse.kkp.go.id/eproc4', 'http://lpse.kemkes.go.id/eproc4', 'https://lpse.kemnaker.go.id/eproc4', 'https://www.lpse.kemenkeu.go.id/eproc4', 'https://lpse.kominfo.go.id/eproc4', 'http://lpse.depkop.go.id/eproc4', 'http://lpse.menlhk.go.id/eproc4', 'https://lpse.kemlu.go.id/eproc4', 'https://lpse.kemenparekraf.go.id/eproc4', 'https://lpse.pu.go.id/eproc4', 'http://lpse.kemenpora.go.id/eproc4', 'https://lpse.menpan.go.id/eproc4', 'https://lpse.kemdikbud.go.id/eproc4', 'http://lpse.kemendag.go.id/eproc4', 'https://lpse.dephub.go.id/eproc4', 'https://lpse.kemenperin.go.id/eproc4', 'https://lpse.kemhan.go.id/eproc4', 'https://lpse.pertanian.go.id/eproc4', 'https://lpse.ristekbrin.go.id/eproc4', 'http://arsip-lpse.kemsos.go.id/eproc4', 'https://lpse.lkpp.go.id/eproc4', 'https://lpse.big.go.id/eproc4', 'http://lpse.bin.go.id/eproc4', 'http://lpse.bakamla.go.id/eproc4', 'http://lpse.bkkbn.go.id/eproc4', 'http://lpse.bkpm.go.id/eproc4', 'http://lpse.bmkg.go.id/eproc4', 'https://lpse.bnn.go.id/eproc4', 'http://lpse.bnpb.go.id/eproc4', 'http://lpse.bnpt.go.id/eproc4', 'http://www.lpse.basarnas.go.id/eproc4', 'http://lpse.bnp2tki.go.id/eproc4', 'http://103.116.173.249/eproc4', 'http://lpse.pom.go.id/eproc4', 'http://lpse.bppt.go.id/eproc4', 'http://lpse.bps.go.id/eproc4', 'https://lpse.bssn.go.id/eproc4', 'http://lpse.dpd.go.id/eproc4', 'https://lpse.dpr.go.id/eproc4', 'http://lpse.kejaksaan.go.id/eproc4', 'http://lpse.polri.go.id/eproc4', 'http://lpse.kpu.go.id/eproc4', 'https://lpse.lipi.go.id/eproc4', 'https://lpse.lapan.go.id/eproc4', 'http://lpse.tvri.co.id/eproc4', 'https://lpse.mahkamahagung.go.id/eproc4', 'http://lpse.mahkamahkonstitusi.go.id/eproc4', 'http://lpse.mpr.go.id/eproc4', 'https://lpse.jakarta.go.id/eproc4', 'https://lpse.acehprov.go.id/eproc4', 'http://lpse.acehbaratkab.go.id/eproc4', 'http://lpse.acehbaratdayakab.go.id/eproc4', 'http://lpse.acehbesarkab.go.id/eproc4', 'http://lpse.acehjayakab.go.id/eproc4', 'http://lpse.acehselatankab.go.id/eproc4', 'http://lpse.acehsingkilkab.go.id/eproc4', 'https://lpse.acehtamiangkab.go.id/eproc4', 'http://lpse.acehtengahkab.go.id/eproc4', 'http://lpse.acehtenggarakab.go.id/eproc4', 'http://lpse.acehtimurkab.go.id/eproc4', 'http://lpse.acehutara.go.id/eproc4', 'http://lpse.benermeriahkab.go.id/eproc4', 'http://lpse.bireuenkab.go.id/eproc4', 'http://lpse.gayolueskab.go.id/eproc4', 'http://lpse.naganrayakab.go.id/eproc4', 'http://lpse.pidiekab.go.id/eproc4', 'https://lpse.pidiejayakab.go.id/eproc4', 'http://lpse.simeuluekab.go.id/eproc4', 'https://lpse.bandaacehkota.go.id/eproc4', 'http://lpse.langsakota.go.id/eproc4', 'http://lpse.lhokseumawekota.go.id/eproc4', 'http://lpse.sabangkota.go.id/eproc4', 'http://lpse.subulussalamkota.go.id/eproc4', 'http://lpse.baliprov.go.id/eproc4', 'http://lpse.badungkab.go.id/eproc4', 'http://lpse.banglikab.go.id/eproc4', 'https://eproc.bulelengkab.go.id/eproc4', 'http://lpse.gianyarkab.go.id/eproc4', 'https://lpse.jembranakab.go.id/eproc4', 'http://lpse.karangasemkab.go.id/eproc4', 'https://lpse.klungkungkab.go.id/eproc4', 'https://lpse.tabanankab.go.id/eproc4', 'http://lpse.babelprov.go.id/eproc4', 'http://lpse.bangka.go.id/eproc4', 'https://lpse.bangkabaratkab.go.id/eproc4', 'http://lpse.bangkaselatankab.go.id/eproc4', 'http://lpse.bangkatengahkab.go.id/eproc4', 'https://lpse.belitungkab.go.id/eproc4', 'https://lpse.belitungtimurkab.go.id/eproc4', 'http://lpse.pangkalpinangkota.go.id/eproc4', 'https://lpse.bantenprov.go.id/eproc4', 'https://lpse.lebakkab.go.id/eproc4', 'http://lpse.pandeglangkab.go.id/eproc4', 'http://lpse.serangkab.go.id/eproc4', 'https://lpse.tangerangkab.go.id/eproc4', 'http://lpse.cilegon.go.id/eproc4', 'https://lpse.serangkota.go.id/eproc4', 'https://lpse.tangerangkota.go.id/eproc4', 'https://lpse.tangerangselatankota.go.id/eproc4', 'https://lpse.bengkuluprov.go.id/eproc4', 'http://lpse.bengkuluselatankab.go.id/eproc4', 'http://lpse.bengkulutengahkab.go.id/eproc4', 'https://lpse.bengkuluutarakab.go.id/eproc4', 'http://lpse.kaurkab.go.id/eproc4', 'http://lpse.kepahiangkab.go.id/eproc4', 'http://lpse.lebongkab.go.id/eproc4', 'http://lpse.mukomukokab.go.id/eproc4', 'http://lpse.rejanglebongkab.go.id/eproc4', 'http://lpse.selumakab.go.id/eproc4', 'http://lpse.bengkulukota.go.id/eproc4', 'https://lpse.jogjaprov.go.id/eproc4', 'http://lpse.gunungkidulkab.go.id/eproc4', 'http://lpse.kulonprogokab.go.id/eproc4', 'https://lpse.slemankab.go.id/eproc4', 'http://lpse.jogjakota.go.id/eproc4', 'https://lpse.gorontaloprov.go.id/eproc4', 'http://lpse.boalemokab.go.id/eproc4', 'http://lpse.bonebolangokab.go.id/eproc4', 'http://lpse.gorontalokab.go.id/eproc4', 'https://lpse.gorutkab.go.id/eproc4', 'https://lpse.pohuwatokab.go.id/eproc4', 'http://lpse.gorontalokota.go.id/eproc4', 'http://lpse.jambiprov.go.id/eproc4', 'http://lpse.batangharikab.go.id/eproc4', 'http://lpse.bungokab.go.id/eproc4', 'http://lpse.kerincikab.go.id/eproc4', 'http://lpse.meranginkab.go.id/eproc4', 'http://lpse.muarojambikab.go.id/eproc4', 'http://lpse.sarolangunkab.go.id/eproc4', 'http://lpse.tanjabbarkab.go.id/eproc4', 'http://lpse.tanjabtimkab.go.id/eproc4', 'http://lpse.tebokab.go.id/eproc4', 'http://lpse.jambikota.go.id/eproc4', 'http://lpse.sungaipenuhkota.go.id/eproc4', 'http://www.lpse.jabarprov.go.id/eproc4', 'http://lpse.bandungbaratkab.go.id/eproc4', 'https://lpse.bekasikab.go.id/eproc4', 'http://lpse.bogorkab.go.id/eproc4', 'https://lpse.ciamiskab.go.id/eproc4', 'http://lpse.cianjurkab.go.id/eproc4', 'http://lpse.indramayukab.go.id/eproc4', 'http://lpse.karawangkab.go.id/eproc4', 'http://lpse.kuningankab.go.id/eproc4', 'http://lpse.majalengkakab.go.id/eproc4', 'http://lpse.purwakartakab.go.id/eproc4', 'http://lpse.subang.go.id/eproc4', 'http://lpse.sukabumikab.go.id/eproc4', 'http://lpse.sumedangkab.go.id/eproc4', 'http://lpse.tasikmalayakab.go.id/eproc4', 'http://lpse.bandung.go.id/eproc4', 'http://lpse.banjarkota.go.id/eproc4', 'http://lpse.bekasikota.go.id/eproc4', 'https://eproc.kotabogor.go.id/eproc4', 'http://lpse.cimahikota.go.id/eproc4', 'http://lpse.cirebonkota.go.id/eproc4', 'https://lpse.depok.go.id/eproc4', 'http://lpse.tasikmalayakota.go.id/eproc4', 'http://lpse.jatengprov.go.id/eproc4', 'http://lpse.banjarnegarakab.go.id/eproc4', 'http://lpse.banyumaskab.go.id/eproc4', 'http://lpse.batangkab.go.id/eproc4', 'http://lpse.blorakab.go.id/eproc4', 'https://lpse.boyolali.go.id/eproc4', 'http://lpse.brebeskab.go.id/eproc4', 'https://lpse.cilacapkab.go.id/eproc4', 'http://lpse.demakkab.go.id/eproc4', 'http://lpse.grobogan.go.id/eproc4', 'http://lpse.jeparakab.go.id/eproc4', 'http://lpse.karanganyarkab.go.id/eproc4', 'https://www.lpse.kendalkab.go.id/eproc4', 'http://lpse.klatenkab.go.id/eproc4', 'http://lpse.kuduskab.go.id/eproc4', 'http://lpse.magelangkab.go.id/eproc4', 'http://lpsepatikab.org/eproc4', 'https://lpse.pekalongankab.go.id/eproc4', 'http://lpse.pemalangkab.go.id/eproc4', 'http://lpse.purbalinggakab.go.id/eproc4', 'https://lpse.purworejokab.go.id/eproc4', 'http://lpse.rembangkab.go.id/eproc4', 'http://lpse.semarangkab.go.id/eproc4', 'http://lpse.sragenkab.go.id/eproc4', 'http://lpse.sukoharjokab.go.id/eproc4', 'http://lpse.tegalkab.go.id/eproc4', 'http://lpse.temanggungkab.go.id/eproc4', 'https://www.lpse.wonogirikab.go.id/eproc4', 'http://lpse.wonosobokab.go.id/eproc4', 'https://lpse.magelangkota.go.id/eproc4', 'http://lpse.pekalongankota.go.id/eproc4', 'http://lpse.salatiga.go.id/eproc4', 'https://lpse.semarangkota.go.id/eproc4', 'http://lpse.surakarta.go.id/eproc4', 'https://lpse.tegalkota.go.id/eproc4', 'https://lpse.jatimprov.go.id/eproc4', 'https://lpse.bangkalankab.go.id/eproc4', 'https://lpse.banyuwangikab.go.id/eproc4', 'http://lpse.blitarkab.go.id/eproc4', 'http://lpse.bojonegorokab.go.id/eproc4', 'http://lpse.bondowosokab.go.id/eproc4', 'http://lpse.jemberkab.go.id/eproc4', 'http://lpse.jombangkab.go.id/eproc4', 'http://lpse.kedirikab.go.id/eproc4', 'http://lpse.lamongankab.go.id/eproc4', 'http://lpse.lumajangkab.go.id/eproc4', 'http://lpse.madiunkab.go.id/eproc4', 'http://lpse.magetan.go.id/eproc4', 'https://lpse.malangkab.go.id/eproc4', 'http://lpse.mojokertokab.go.id/eproc4', 'https://lpse.nganjukkab.go.id/eproc4', 'https://lpse.ngawikab.go.id/eproc4', 'https://lpse.pacitankab.go.id/eproc4', 'https://lpse.pamekasankab.go.id/eproc4', 'https://lpse.pasuruankab.go.id/eproc4', 'https://lpse.ponorogo.go.id/eproc4', 'http://lpse.probolinggokab.go.id/eproc4', 'http://lpse.sampangkab.go.id/eproc4', 'https://lpse.sidoarjokab.go.id/eproc4', 'http://lpse.situbondokab.go.id/eproc4', 'http://lpse.sumenepkab.go.id/eproc4', 'http://lpse.trenggalekkab.go.id/eproc4', 'http://lpse.tubankab.go.id/eproc4', 'http://lpse.tulungagung.go.id/eproc4', 'http://lpse.batukota.go.id/eproc4', 'http://lpse.blitarkota.go.id/eproc4', 'http://lpse.kedirikota.go.id/eproc4', 'http://lpse.madiunkota.go.id/eproc4', 'https://lpse.malangkota.go.id/eproc4', 'https://lpse.mojokertokota.go.id/eproc4', 'http://lpse.probolinggokota.go.id/eproc4', 'https://lpse.surabaya.go.id/eproc4', 'https://lpse.kalbarprov.go.id/eproc4', 'http://lpse.bengkayangkab.go.id/eproc4', 'http://lpse.kapuashulukab.go.id/eproc4', 'http://118.97.211.5/eproc4', 'http://lpse.ketapangkab.go.id/eproc4', 'http://lpse.kuburayakab.go.id/eproc4', 'http://lpse.landakkab.go.id/eproc4', 'https://lpse.melawikab.go.id/eproc4', 'http://lpse.mempawahkab.go.id/eproc4', 'http://lpse.sambas.go.id/eproc4', 'http://lpse.sanggau.go.id/eproc4', 'http://lpse.sekadaukab.go.id/eproc4', 'http://lpse.sintang.go.id/eproc4', 'https://lpse.pontianakkota.go.id/eproc4', 'http://lpse.singkawangkota.go.id/eproc4', 'http://lpse.kalselprov.go.id/eproc4', 'http://lpse.balangankab.go.id/eproc4', 'https://lpse.banjarkab.go.id/eproc4', 'http://www.lpse.baritokualakab.go.id/eproc4', 'http://lpse.hulusungaiselatankab.go.id/eproc4', 'http://lpse.hulusungaitengahkab.go.id/eproc4', 'http://lpse.hulusungaiutarakab.go.id/eproc4', 'http://lpse.kotabarukab.go.id/eproc4', 'https://lpse.tabalongkab.go.id/eproc4', 'http://lpse.tanahbumbukab.go.id/eproc4', 'https://lpse.tanahlautkab.go.id/eproc4', 'http://lpse.tapinkab.go.id/eproc4', 'http://lpse.banjarmasinkota.go.id/eproc4', 'https://lpse.kalteng.go.id/eproc4', 'https://lpse.baritoselatankab.go.id/eproc4', 'https://lpse.baritotimurkab.go.id/eproc4', 'https://lpse.baritoutarakab.go.id/eproc4', 'https://lpse.gunungmaskab.go.id/eproc4', 'http://lpse.kapuaskab.go.id/eproc4', 'http://lpse.katingankab.go.id/eproc4', 'http://lpse.kotawaringinbaratkab.go.id/eproc4', 'https://lpse.kotimkab.go.id/eproc4', 'http://lpse.lamandaukab.go.id/eproc4', 'http://lpse.kabmurungraya.go.id/eproc4', 'http://lpse.pulangpisaukab.go.id/eproc4', 'https://lpse.sukamarakab.go.id/eproc4', 'http://lpse.seruyankab.go.id/eproc4', 'https://lpse.palangkaraya.go.id/eproc4', 'https://lpse.kaltimprov.go.id/eproc4', 'http://lpse.kutaibaratkab.go.id/eproc4', 'http://lpse.kutaikartanegarakab.go.id/eproc4', 'http://lpse.kutaitimurkab.go.id/eproc4', 'http://lpse.mahakamulukab.go.id/eproc4', 'http://lpse.paserkab.go.id/eproc4', 'https://lpse.penajamkab.go.id/eproc4', 'http://lpse.balikpapan.go.id/eproc4', 'http://lpse.bontangkota.go.id/eproc4', 'http://lpse.samarindakota.go.id/eproc4', 'https://lpse.kaltaraprov.go.id/eproc4', 'http://spse.bulungan.go.id/eproc4', 'http://lpse.malinau.go.id/eproc4', 'http://lpse.tanatidungkab.go.id/eproc4', 'http://lpse.tarakankota.go.id/eproc4', 'http://lpse.kepriprov.go.id/eproc4', 'http://lpse.bintankab.go.id/eproc4', 'http://103.131.61.12/eproc4', 'http://lpse.anambaskab.go.id/eproc4', 'http://lpse.linggakab.go.id/eproc4', 'http://lpse.natunakab.go.id/eproc4', 'https://lpse.batam.go.id/eproc4', 'http://lpse.tanjungpinangkota.go.id/eproc4', 'http://lpse.sulbarprov.go.id/eproc4', 'http://lpse.majenekab.go.id/eproc4', 'http://lpse.mamujutengahkab.go.id/eproc4', 'http://lpse.polmankab.go.id/eproc4', 'http://www.lpse.mamasakab.go.id/eproc4', 'https://lpse.sulselprov.go.id/eproc4', 'http://lpse.bantaengkab.go.id/eproc4', 'http://lpse.barrukab.go.id/eproc4', 'http://lpse.bone.go.id/eproc4', 'http://lpse.bulukumbakab.go.id/eproc4', 'http://lpse.enrekangkab.go.id/eproc4', 'http://lpse.gowakab.go.id/eproc4', 'https://lpse.jenepontokab.go.id/eproc4', 'http://lpse.kepulauanselayarkab.go.id/eproc4', 'http://lpse.luwukab.go.id/eproc4', 'https://lpse.luwutimurkab.go.id/eproc4', 'http://lpse.luwuutarakab.go.id/eproc4', 'http://lpse.maroskab.go.id/eproc4', 'http://lpse.pangkepkab.go.id/eproc4', 'http://lpse.pinrangkab.go.id/eproc4', 'http://lpse.sidrapkab.go.id/eproc4', 'http://lpse.sinjaikab.go.id/eproc4', 'http://lpse.soppengkab.go.id/eproc4', 'http://lpse.takalarkab.go.id/eproc4', 'http://103.77.206.186/eproc4', 'http://www.lpse-torajautara.go.id/', 'http://lpse-wajokab.go.id/eproc4', 'https://lpse.makassar.go.id/eproc4', 'http://lpse.palopokota.go.id/eproc4', 'http://112.78.46.114/eproc4', 'http://lpse.sultengprov.go.id/eproc4', 'http://www.lpse.banggaikab.go.id/eproc4', 'http://lpsebuolkab.org/eproc4', 'http://lpse.donggala.go.id/eproc4', 'http://lpse.morowalikab.go.id/eproc4', 'http://lpse.morowaliutarakab.go.id/eproc4', 'http://lpse.parigimoutongkab.go.id/eproc4', 'http://lpse.posokab.go.id/eproc4', 'http://lpse.tojounaunakab.go.id/eproc4', 'http://118.97.36.171/eproc4', 'http://lpse.sigikab.go.id/eproc4', 'http://lpse.palukota.go.id/eproc4', 'http://lpse.sultraprov.go.id/eproc4', 'http://202.93.137.147/eproc4', 'http://lpse.butonkab.go.id/eproc4', 'http://lpse.butonselatankab.go.id/eproc4', 'http://lpse.butonutarakab.go.id/eproc4', 'http://lpse.kolakakab.go.id/eproc4', 'http://lpse.konaweselatankab.go.id/eproc4', 'http://lpse.konaweutarakab.go.id/eproc4', 'http://lpse.wakatobikab.go.id/eproc4', 'http://lpse.baubaukota.go.id/eproc4']


function walkThroughInstansies(url, cb) {
    var index = instansi.indexOf(url)
    console.log(index)
    nightmare
    .goto(`${url}/lelang`)
    .wait(`#tbllelang > tbody`)
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
                    $(this).find('td:eq(0)').html(),
                    $(this).find('td:eq(1)').html().replace('href="', `href="${window.location.origin}`),
                    $(this).find('td:eq(2)').html(),
                    $(this).find('td:eq(3)').html().replace('href="', `href="${window.location.origin}`),
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
            }
        })
        .catch(e => {
            console.error('----------- fail scraping!', e)
        })
}

function filterData (url, scrapped, cb)
{
    let obj = scrapped[0]
    if (!obj)
    {
        cb()
        return false
    }
    let dest = `${url}/${obj[0]}/jadwal?token=${Math.random().toString(36).slice(2)}`
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
        return {start, end}
    })
    .then(result => {
        let  {start, end} = result
        // obj.start = start
        // obj.end = end
        let endtime = new Date(end)
        let now = new Date()
        if (now < endtime)
        {
            console.log(JSON.stringify(obj), ', ')
        }

        scrapped.shift()
        if (scrapped.length > 0) filterData (url, scrapped, cb)
        else cb ()
    })
    .catch(e => {
        // console.log('---- fail to get scehdule', dest)
        scrapped.shift()
        if (scrapped.length > 0) filterData (url, scrapped, cb)
        else cb ()
    })
}

console.time()
walkThroughInstansies('http://lpse.kkp.go.id/eproc4', () => {
    console.timeEnd()
    nightmare.end().then()
})