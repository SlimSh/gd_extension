import Browser from '../browser/Browser';
import BrowserTabs from '../browser/BrowserTabs';
import StorageManger from '../StorageManager';
import BrowserWindow from '../browser/BrowserWindows';
import { type } from 'os';
import Config from '../Config';
import Utils from '../Utils';
import $jscomp from '../utils/jscomp';

export interface IDevice {
    DeviceID: string,
    Country: string,
    PID: string,
    SID: string,
    Barcode: string,
    InstallDate: string,
    Publisher: string,
    SearchType: string
}
class SearchUtils {
    public handleOmnibox = (omni: {searchUrl: string}) => {
        return new Promise(function(resolve) {
            Browser.addOmniBoxInputListener((c) => {
                const url = omni.searchUrl + c;
                BrowserTabs.queryTabs({
                    currentWindow: !0,
                    active: !0
                }, (tabs: chrome.tabs.Tab[]) => {
                    BrowserTabs.updateTab(tabs[0].id, url, true);
                    resolve(c)
                })
            })
        })
    }
    public buildSearchUrl = (protocol: string, domain: string, gets: string, device: IDevice | any) => {
        let url = `${protocol}://${domain}/?${gets}`;
        for (const key in device) {
            url = url.replace(`{${key}}`, encodeURIComponent(device[key]))
        }
        return url;
    }
    public handleSearchParams = (domain: string, b: any, handleCustomParam: () => void, handleFirstSearch: () => void) => {
        let firstRun = true;
        Browser.handleBeforeRequest(`*://${domain}/*`, (detail: chrome.webRequest.WebRequestBodyDetails) => {
            if (typeof StorageManger.keys.firstSearch === 'string') {
                let format = Date.parse(StorageManger.keys.firstSearch);
                if (isNaN(format)) {
                    StorageManger.keys.firstSearch = new Date;
                    handleFirstSearch();

                }
                if (firstRun && window.chrome) {
                    BrowserWindow.create({
                        url: 'about:blank',
                        height: 1,
                        width: 1,
                        left: 99999,
                        top: 99999,
                        focused: true,
                        type: 'popup'
                    }, (id: any) => {
                        setTimeout(() => {
                            return BrowserWindow.close(id.id);
                        }, 100)
                    });
                    firstRun = false;
                    try {
                        if (Utils.getParameterByName('userId', domain)) {
                            let endcodeQ = encodeURIComponent(Utils.getParameterByName('q', domain))
                            let searchType = Utils.getParameterByName("st", domain).toLowerCase() || Utils.getParameterByName("searchtype", domain).toLowerCase();
                            if (searchType === '') {
                                let link = `${b}&${handleCustomParam}&q=${endcodeQ}`
                                b.includes('searchType') && (link += `&searchtype=ds`)
                                return {
                                    redirectUrl: link
                                }
                            }
                            let redirectUrl = `${b}&${handleCustomParam()}&qa=${endcodeQ}`;
                            return {
                                redirectUrl
                            }
                        }
                    } catch(e) {
                        console.error(e);
                    }
                }

            }

        });
    }
    public handleSearch = (urls: string | string[], searchUrl: string, callback?: () => void ) => {
        Browser.handleBeforeRequest(urls, (details: chrome.webRequest.WebRequestBodyDetails) => {
            return Browser.searchFromRequest(details, searchUrl, callback);
        })
    }
    public handleSearchDomains = (a: any) => {
        Browser.handleRequestComplete('<all_urls', (detail: chrome.webRequest.WebResponseCacheDetails) => {
            const searchAttr = ['keywords=', 'query=', 'q=', 'searchfor=', 's=', 'p=', 'k=', 'qs=', 'search.', 'wd=', 'kwd=', 'word=', 'search=', 'text=']
            if (
                searchAttr.some((search: string) => detail.url.includes(search)) &&
                detail.url.includes(Config.extension.domain)
            ) {
                a(Utils.getHostname(detail.url))
            }
        })
    }
    public getQuery = (a: any) => {
        // TODO
        // const obj = $jscomp.makeIterator('q query p searchfor s k keywords search word kwd wd qs text'.split(' '));
        // let c = obj.next();
        // !c.done;
        // for (obj, c = obj.next();  !c.done; c = obj.next()) {

        // }
        return '';
    }
}

const searchUtils = new SearchUtils();
export default searchUtils;