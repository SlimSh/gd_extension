
import Config from "../Config";
import Browser from '../browser/Browser';
import $jscomp from './jscomp';
import Http from '../message/Http';

type IExtensionData = any;
export default class Stats {
    public data: IExtensionData;
    constructor(data: IExtensionData) {
        this.data = data;
    }
    private sendEvent = (
        c='',
        d='',
        e='',
        f='',
        g: {}
    ) => {
        let h = d;
        let k = e;
        const gets = `ec=${c}&cid=${this.data.deviceId}&el=${k}&ev=&tid=${Config.stats.googleAnalyticsId}&t=event&v=1&ea=${h}`;
        Http.post(Config.stats.googleAnalyticsUrl, gets);
    }

    public sendData = (
        b: string = '',
        d: string = '',
        e: string = '',
        f: any = {} ) => {
            let link = `https://${Config.stats.pixelDomain}/Pixel.aspx?name${Config.extension.name}&type${b}&data1=${d}&entity=26&co=&${this.data.country}&installdate${this.data.installDate}&barcode=${this.data.barcodeId}&userid=${this.data.deviceId}&data2=${e}${f && `&data3=${Browser.id}`}`;
            const config: any = {
                name: Config.extension.name,
                type: b,
                data1: d,
                entity: '26',
                co: this.data.country,
                installdate: this.data.installDate,
                barcode: this.data.barcodeId,
                data2: `&data3=${Browser.id}`,
                userid: this.data.deviceId
            }
            if(Object.keys(f).length) {
                for (let index = $jscomp.makeIterator(f), e = index.next(); !e.done; e = index.next()) {
                    e = e.value, link += "&" + e + "=" + f[e], config[e] = f[e]
                };
                Http.post("https://install." + Config.extension.domain + "/log", JSON.stringify(b), "application/json; charset=utf-8", function(res: any) {
                    res.error && Http.get(link)
                })
            }
        }

    public log = (a: string, b: string, c: string, d: string, e: string, f={}) => {
        if(e) {
            setTimeout(() => {
                this.sendEvent(a, b, c, d, f)
            }, 1)
        } else {
            this.sendEvent(a, b, c, d, f)
        }}
}