import ExtensionData from './ExtensionData';

export default class Extension {
    // public init: () => void;
    public config: any;
    public isInitialised: boolean;

    constructor(config: any) {
        this.config = config;
        this.init();
        // this.start && this.start()
    }

    public init = () => {
        if (!this.isInitialised) {
            this.isInitialised = true;
            this.data = new ExtensionData;
        }
    }
}