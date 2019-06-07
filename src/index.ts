import Timer from './Timer';

class Main {
    constructor() {
        const timer = new Timer({
            coocieName: 'Denchik', callBack: () => {console.warn(this)}, period: .000001});
    }
}

const app = new Main();