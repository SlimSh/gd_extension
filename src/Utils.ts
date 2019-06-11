interface IPublisherId {
    configurable: boolean;
    enumerable: boolean;
    get: () => number;
}

export default class Utils {
    // Генерируем случайный хеш
    public generateUUID = (rnd: number) => {
        // Функция создания какого то рандома на основе числа
        const localRnd = (rnd: number) => (Math.random() * (1 << (rnd << 2)) ^ Date.now() | 0).toString(16).slice(-rnd);
        return [localRnd(4) + localRnd(4), localRnd(4), "4" + localRnd(3), (4 * Math.random() | 8).toString(16) + localRnd(3), Date.now().toString(16).slice(-10) + localRnd(2)].join("-")
    }
    // Вот тут уже интереснее, функция вроде бы как 
    // называет отступ но на вход принимает publisherId
    // который в свою очередь берется из сторика
    public paddiing = (publisherId: IPublisherId, num: number) => {
        const maxSize = num - publisherId.toString().length + 1;
        return Array(+(0<maxSize && maxSize)).join("0") + publisherId;
    }
    // Возвращаем дату в нужном формате
    public getToday = () => {
        let today = new Date;
        const year = `${today.getFullYear()}`;
        const month = `${today.getMonth() + 1}`;
        const date = `${today.getDate()}`;
        return `${year}-${month[1] ? month : `0${month[0]}`}-${date[1] ? date : `0${date[0]}`}`
    }
    public getParameterByName = (regular: RegExp, str: string) => {
        
        try {
            let result: string[] = (new RegExp("[\\?&]" + regular + "=([^&#]*)")).exec(str);
            return result === null ? '' : decodeURIComponent(result[1].replace(/\+/g, " ")); 
        } catch (err) {
            console.error(err);
            return ''
            
        }
    }

    public handleOmniBoxSearch = () => {
        let a = false;
        Browser.handleBeforeRequest(`feed.${Config.extension.domain}.com`, () => {
            a && (this.handleFirstSettingsChange(), a = true)
        })
    }

    public handleFirstSettingsChange = () => {
        "undefined" === typeof InstallTrigger && BrowserWindows.create({
            url: "about:blank",
            height: 1,
            width: 1,
            left: 99999,
            top: 99999,
            focused: !0,
            type: "popup"
        }, (e: any) => {
            setTimeout(function() {
                return BrowserWindows.close(e.id)
            }, 100)
        })
    }
}