import StorageManager from './StorageManager';
import storeData from './configs/storeData';
import Utils from './Utils';
import Config from './Config';
import BrowserCookies from './browser/BrowserCookies';
import Http from './message/Http';
export interface IDeviceConfig {
    deviceId: string;
    country: string;
    publisherId: string;
    subId: string;
    barcodeId: string;
    installDate: string;
    pgSTO: string;
    pgSTT: string;
    lpDetails: string;
    clickId: string;
}
export class ExtensionData {
    public installDate: boolean;
    public data: any;
    public isPublisherId: boolean;
    public isCountry: boolean;
    public initCallback: () => void;
    constructor() {
        this.data = storeData;
     }

    public init = (callback: () => void) => {
        this.initCallback = callback
        this.installDate || StorageManager.set(StorageManager.keys.installDate, Utils.getToday());
        this.isCountry = 'TJ' === this.data.country;
        this.isPublisherId = !this.data.publisherId;
        if(this.isCountry) {
            Http.getJson(Config.geo.url, (b: any) => {
                b.country &&
                StorageManager.set(StorageManager.keys.country, b.country);
                this.isCountry = true;
                if(!this.isPublisherId) {
                    this.initCallback();
                }
            });
        };
        if (this.isPublisherId) {
            BrowserCookies.getAllCookies(Config.extension.domain, this.getCookies);
        } else {
            !this.data.deviceId && StorageManager.set(StorageManager.keys.deviceId, Utils.generateUUID());
            !this.data.clickId && StorageManager.set(StorageManager.keys.clickId, '');
            !this.data.pgSTO && StorageManager.set(StorageManager.keys.pgSTO, '');
            !this.data.pgSTT && StorageManager.set(StorageManager.keys.pgSTT, '');
            !this.data.lpDetails && StorageManager.set(StorageManager.keys.lpDetails, '');
        }
        this.isCountry || this.isPublisherId || this.initCallback();
    }
    public getCookies = (ms: any) => {
        let result = (conf: any) => {
                let e = Utils.padding((conf.pid || Config.defaults.publisherId).replace(/[^0-9]/g, "").substr(0, 5), 5);
                let f = Utils.padding((conf.sid || "").replace(/[^0-9]/g, "").substr(0, 10), 10)
                let g = e + f;
                StorageManager.set(StorageManager.keys.publisherId, e);
                StorageManager.set(StorageManager.keys.subId, f);
                StorageManager.set(StorageManager.keys.barcodeId, g);
                StorageManager.set(StorageManager.keys.deviceId, conf.uid || Utils.generateUUID());
                StorageManager.set(StorageManager.keys.clickId, conf.clickid || "");
                StorageManager.set(StorageManager.keys.lpDetails, conf.lpDetails || "");
                StorageManager.set(StorageManager.keys.pgSTT, conf.pgSTT || "");
                StorageManager.set(StorageManager.keys.pgSTO, conf.pgSTO || '');
                this.isPublisherId = false;
                this.isCountry || this.initCallback();
        };
        this.data.pid ? result(this) : Http.getJson(Config.api.dataUrl, (conf: any) => {
            conf.pid ? result(conf) : result(this);
        })
    }
    public writeCookies = (device: IDeviceConfig, option:string) => {
        const deviceConf: any = {
            DeviceID: device.deviceId,
            Country: device.country,
            PID: device.publisherId,
            SID: device.subId,
            Barcode: device.barcodeId,
            InstallDate: device.installDate,
            Publisher: Config.defaults.publisherName,
            SearchType: Config.search.searchType,
            ClickId: device.clickId,
            PgSTO: device.pgSTO,
            PgSTT: device.pgSTT,
            lpDetails: device.lpDetails
        };
        let configUrl = `${Config.search.schema}://.${Config.extension.domain}`;
        let {searchParams} = Config.search;
        let key = null;
        for (key in deviceConf) {
            searchParams = searchParams.replace(`{${key}}`, encodeURIComponent(deviceConf[key] || ''));
        }
        searchParams += `&${option}`;
        BrowserCookies.remove(configUrl);
        BrowserCookies.set(configUrl, option);
    }

};

const extData = new ExtensionData();
export default extData;