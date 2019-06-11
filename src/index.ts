import Timer from './Timer';
import Config, {IUser} from './Config';
import mock from './mock';
class Main {
    public config: any;
    constructor(config: IUser) {
        this.config = new Config(config);
        // const timer = new Timer({
        //     coocieName: 'Denchik', callBack: () => {console.warn(this)}, period: .000001});
        
    }
}

const app = new Main(mock);
console.warn(app);