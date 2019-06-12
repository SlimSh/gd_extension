import extensionData from "./configs/extensionData";

import ExtensionData from './ExtensionData';
import messageService from "./message/MessageService";

export default class Extension {
    public isInitialised: boolean;
    public data: any;
    public messageService: any;
    public stats: any;

    constructor(config: any) {
        this.init();
    }

    public init = () => {
        if (!this.isInitialised) {
            this.isInitialised = true;
            this.data = new ExtensionData();
            this.messageService = messageService;
            console.warn('Extension data', this);
        }
    }
};