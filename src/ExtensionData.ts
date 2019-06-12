import store from './StorageManager';
import extensionData from './configs/extensionData';
import Utils from './Utils';
import Config from './Config';
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
        this.data = extensionData;
     }

    public init = (config: any) => {
        this.installDate || store.set(store.keys.installDate, Utils.getToday());
        let isCountry = 'TJ' === this.data.country;
        let isPublisherId = !this.data.publisherId;

    }

    public writeCookies = (device: IDeviceConfig, b:any) => {
        const deviceConf = {
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
        let c = Config.search.schema 
    }

};
