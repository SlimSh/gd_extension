import store from './StorageManager';
import extensionData from './configs/extensionData';
import Utils from './Utils';

export class ExtensionData {
    public installDate: boolean;
    public data: any;
    constructor() {
        this.data = extensionData;
     }

    public init = (config: any) => {
        let extensionData = new ExtensionData;
        extensionData.installDate || store.set(store.keys.installDate, Utils.getToday());
        let isCountry = 'TJ' === extensionData.data.country;
        let isPublisherId = !this.data.publisherId;
        // isCountry && 
    }

}