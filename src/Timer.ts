interface IOption {
    coocieName: string;
    callBack: () => void;
    period: number;
}

export default class Timer {
    public timerName: string;
    public timer: any;
    public coocieName: string;
    public callBack: () => void;
    public period: number;

    constructor(coocieName: string, callBack: () => void, period: number) {
        this.callBack = callBack;
        this.period = period;
        this.timerName = `timer_${coocieName}`;
        setTimeout(this.internalLogic, 1E3)
    }

    protected internalLogic = () => {
        this.stop()
        let a = Date.parse(localStorage.getItem(this.timerName));
        const date = new Date;
        if (isNaN(a) || (+date - a) / 1E3 / 60 / 60 >= this.period) {
            localStorage.setItem(this.timerName, `${date}`);
            this.callBack();
        };
        this.start()
    }

    public start = () => {
        this.timer = setTimeout(this.internalLogic, 6E4)
    }

    public stop = () => {
        clearInterval(this.timer)
    }
}