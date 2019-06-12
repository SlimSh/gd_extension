const defaultConfig = {
    configurable: true,
    enumerable: true,
    get: () => ({
        deviceId: 'id',
        clickId: 'clickid',
        country: 'co',
        publisherId: 'pid',
        subId: 'subid',
        barcodeId: 'br',
        installDate: 'dt',
        searchParams: 'sp',
        timers: 'timer',
        firstTime: 'ft',
        firstSearch: 'fs',
        firstUse: 'fu',
        pgSTT: 'pgSTT',
        pgSTO: 'pgSTO',
        lpDetails: 'lpDetails' 
    })
}

interface IStorage {
    deviceId: string;
    clickId: string;
    country: string;
    publisherId: string;
    subId: string;
    barcodeId: string;
    installDate: string;
    searchParams: string;
    timers: string;
    firstTime: string;
    firstSearch: string | Date;
    firstUse: string;
    pgSTT: string;
    pgSTO: string;
    lpDetails: string;
}

interface IStorageKeys extends IStorage{
    configurable: boolean;
    enumerable: boolean;
    get: () => IStorage;
}

class StorageManager {
    public keys: IStorageKeys;
    constructor(props: any) {
        this.keys = props;
    }
    get = (param: string) => {
        return localStorage.getItem(param);
    }
    set = (param: string, value: any) => {
        localStorage.setItem(param, value);
    }
}
const store = new StorageManager(defaultConfig);
export default store;