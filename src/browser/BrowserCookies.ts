import Config from "../Config";

class BrowserCookies {
    public config: any;
    constructor(props: any) {
        this.config = props;
    }

    public set (url: string, value: any) {
        chrome.cookies.set({
            url,
            name: this.config.extension.cookieName,
            value,
            expirationDate: 2147483647
        })
    }
    
    public remove (url: string) {
        chrome.cookies.remove({
            url,
            name: this.config.extension.cookieName
        })
    }

    public getAllCookies (domain: string, callback: any) {
        chrome.cookies.getAll({
            domain
        }, function(cookies) {
            var newConf: any = {};
            cookies.reduce((acc: any, cookie: any) => {
                try {
                    newConf[cookie.name] = decodeURIComponent(cookie.value)
                } catch (g) {}
            }, {});
            callback(newConf);
        })
    }
}