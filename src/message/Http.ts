export class Http {
    public get = (url: string, getParams?: any) => {
        getParams = void 0 === getParams ? () => {} : getParams;
        var c = new XMLHttpRequest;
        c.onreadystatechange = () => {
            c.readyState === XMLHttpRequest.DONE && (200 === c.status ? getParams(c.responseText) : getParams())
        };
        c.open("GET", url, true);
        c.send()
    };
    public getJson = (url: string, callback: any) => {
        callback = void 0 === callback ? () => {} : callback;
        this.get(url, (jsnres: any) => {
            var c = {};
            try {
                c = JSON.parse(jsnres)
            } catch (e) {}
            callback(c)
        })
    }
    public post = (url: string, b='', contentType='', callback = (event: any, ev?: Event) => {}) => {
        const event = new XMLHttpRequest;
        if (event && 'withCredentials' in event) {
            event.open('POST', url, true);
            event.setRequestHeader('Content-type', contentType);
            if(callback) {
                event.onreadystatechange = (ev: Event) => {
                    if (event.readyState === XMLHttpRequest.DONE) {
                        event.status === 200 ? callback(event, ev) : callback(
                            {error: 'error',
                            xhr: event}
                        )
                    }
                };
                event.onerror = (err) => {
                    callback({err})
                };
                event.send(b);
            }
        }
    }
}
const http = new Http;
export default http;