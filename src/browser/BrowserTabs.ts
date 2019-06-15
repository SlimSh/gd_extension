import { callbackify } from "util";

class BrowserTabs {
    public createTab = (url?: string, index?: number, active?: boolean) => {
        chrome.tabs.create({
            url,
            index,
            active
        })
    }
    public getTabs = (queryInfo: chrome.tabs.QueryInfo, callback: (res: chrome.tabs.Tab[]) => void) => {
        chrome.tabs.query(queryInfo, (result: chrome.tabs.Tab[]) => {
            callback(result);
        })
    }
    public queryTabs = (queryInfo: chrome.tabs.QueryInfo, callback: (tabs: chrome.tabs.Tab[]) => void) => {
        //Делает тоже что и GET TABS  смотри выше
        chrome.tabs.query(queryInfo, (result: chrome.tabs.Tab[]) => {
            callback(result);
        })
    }

    public updateTab = (tabId: number, url: string, active: boolean ) => {
        chrome.tabs.update(tabId, {
            url,
            active
        } )
    }

    public getCurrentTab = (callback: (t: chrome.tabs.Tab) => void) => {
        chrome.tabs.getCurrent((tab) => {
            return callback(tab);
        })
    }

    public onUpdatedTab = (callback: (tabId: number, changeInfo: any, tab: any) => void) => {
        chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
            return callback(tabId, changeInfo, tab)
        })
    }

    public executeScript = (tabId: number, details: chrome.tabs.InjectDetails, callback: any) => {
        chrome.tabs.executeScript(tabId, details, callback);
    }

    public insertCSS = (tabId: number, details: chrome.tabs.InjectDetails, callback: any) => {
        chrome.tabs.insertCSS(tabId, details, callback);
    }

    public sendMessage = (tabId: number, details: chrome.tabs.InjectDetails, callback: any) => {
        chrome.tabs.sendMessage(tabId, details, callback);
    }

    public captureVisibleTab = (tabId: number, tabOption: chrome.tabs.CaptureVisibleTabOptions, callback: any) => {
        chrome.tabs.captureVisibleTab(tabId, tabOption, (dataUrl: string) => {
            callback(dataUrl);
        })
    }

    public removeTab = (tabId: number, callback: any) => {
        chrome.tabs.remove(tabId, callback)
    }
}

const browserTabs = new BrowserTabs;
export default browserTabs;