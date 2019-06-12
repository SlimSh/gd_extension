import mock from "./mock";

export interface IUser {
    name: string;
    domain: string;
    schema?: any;
    searchType?: string;
    cookieName?: string;
    uninstallDomain?: string;
    searchDomain?: string;
    tracking?: {
        ga: string;
    };
    publisher: {
        id: string;
        name: string;
    };
    settings: {
        omni: {
            searchUrl: string
        };
        cloaseStoreWindows?: string;
        handlesearchdomains: boolean,
        noinline: boolean,
        thankyoupage: boolean
    }
}

export class Config {
    public extension = {
        name: "defaultext",
        domain: "defaultext.com",
        uninstallDomain: "",
        cookieName: "_exp"
    }
    public defaults = {
        publisherName: "defaultext",
        publisherId: "11111"
    }

    public search = {
        schema: "https",
        searchDomain: "",
        searchParams: "publisherid={PID}&publisher={Publisher}&userid={DeviceID}&co={Country}&barcodeid={Barcode}&installdate={InstallDate}&searchtype={SearchType}",
        searchType: "ds"
    }
    public geo = {
        url: "https://api.sendmepixel.com/geo/country"
    }
    public api = {
        dataUrl: "https://api.pgcollect.com/getdata"
    }
    public stats = {
        googleAnalyticsUrl: "https://www.google-analytics.com/collect",
        googleAnalyticsId: "",
        pixelDomain: "px.keepmypixel.com"
    }
    public settings = {
        omni: {},
        closeStoreWindows: false,
        handlesearchparams: true,
        handlesearchdomains: true,
        handleextensions: false
    }
    public timers = {
        keepAlive: {
            name: "ka",
            period: 24
        },
        syncTimer: {
            name: "sync",
            period: 24
        },
        cookies: {
            name: "ck",
            period: .016
        }
    }
    constructor(props: IUser) {
        const {name,
               domain,
               schema,
               searchType,
               cookieName,
               tracking,
               publisher,
               settings,
               uninstallDomain,
               searchDomain
            } = props
        name && (this.extension.name = name);
        domain && (this.extension.domain = domain);
        schema && (this.search.schema = schema);
        searchType && (this.search.searchType = searchType);
        cookieName && (this.extension.cookieName = cookieName);
        tracking && tracking.ga && (this.stats.googleAnalyticsId = tracking.ga);
        publisher && publisher.id && (this.defaults.publisherId = publisher.id);
        publisher && publisher.name && (this.defaults.publisherName = publisher.name);
        if (settings) {
            this.settings = {...this.settings, ...settings};
        }
        uninstallDomain && (this.extension.uninstallDomain = uninstallDomain);
        searchDomain && (this.search.searchDomain = searchDomain);        
    }
}

const config = new Config(mock);
export default config;