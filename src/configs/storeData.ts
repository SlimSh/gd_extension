import store from '../StorageManager';

export default {
    deviceId: {
        configurable: true,
        enumerable: true,
        get: function() {
            this._deviceId || (this._deviceId = store.get(store.keys.deviceId));
            return this._deviceId
        }
    },
    clickId: {
        configurable: true,
        enumerable: true,
        get: function() {
            this._clickId || (this._clickId = store.get(store.keys.clickId));
            return this._clickId
        }
    },
    country: {
        configurable: true,
        enumerable: true,
        get: function() {
            this._country || (this._country = store.get(store.keys.country) || "TJ");
            return this._country
        }
    },
    installDate: {
        configurable: true,
        enumerable: true,
        get: function() {
            this._installDate || (this._installDate = store.get(store.keys.installDate));
            return this._installDate
        }
    },
    barcodeId: {
        configurable: true,
        enumerable: true,
        get: function() {
            this._barcodeId || (this._barcodeId = store.get(store.keys.barcodeId));
            return this._barcodeId
        }
    },
    publisherId: {
        configurable: true,
        enumerable: true,
        get: function() {
            this._publisherId || (this._publisherId = store.get(store.keys.publisherId));
            return this._publisherId
        }
    },
    subId: {
        configurable: true,
        enumerable: true,
        get: function() {
            this._subId || (this._subId = store.get(store.keys.subId));
            return this._subId
        }
    },
    pgSTO: {
        configurable: true,
        enumerable: true,
        get: function() {
            this._pgSTO || (this._pgSTO = store.get(store.keys.pgSTO));
            return this._pgSTO
        }
    },
    pgSTT: {
        configurable: true,
        enumerable: true,
        get: function() {
            this._pgSTT || (this._pgSTT = store.get(store.keys.pgSTT));
            return this._pgSTT
        }
    },
    lpDetails: {
        configurable: true,
        enumerable: true,
        get: function() {
            this._lpDetails || (this._lpDetails = store.get(store.keys.lpDetails));
            return this._lpDetails
        }
    }
}