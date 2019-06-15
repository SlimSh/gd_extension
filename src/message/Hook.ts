export default class Hook {
    public _hookFunction: () => string;
    constructor() {
        this._hookFunction = () => '';
    }
    public hook = (fn: any) => {
        this._hookFunction = fn;
    }
    public call = () => {
        try {
            return this._hookFunction();
        } catch (err) {
            console.error('Hook', err)
        }
    }
}
