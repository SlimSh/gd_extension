import store from './StorageManager';
import storeData from './configs/storeData';
import Utils from './Utils';
import Config from './Config';
import BrowserCookies from './browser/BrowserCookies';
// import {IDevice} from './utils/SearchUtils';
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
export default class ExtensionData {
    public installDate: boolean;
    public data: any;
    
    constructor() {
        this.data = storeData;
     }

    public init = (callback: () => void) => {
        this.installDate || store.set(store.keys.installDate, Utils.getToday());
        let isCountry = 'TJ' === this.data.country;
        let isPublisherId = !this.data.publisherId;

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
