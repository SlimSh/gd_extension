interface IWindow {
    url: string;
    height: number;
    width: number;
    left: number;
    top: number;
    focused: boolean;
    type: string;
}

class BrowserWindows {
    public create = (windowConfig: IWindow,
        callback: (id: any) => void) => {
        chrome.windows.create(windowConfig, (win) => {
            callback(win);
        })
    }
    public close = (win: any) => {
        chrome.windows.remove(win.id);
    }
}

const BrowserWin = new BrowserWindows;
export default BrowserWin;