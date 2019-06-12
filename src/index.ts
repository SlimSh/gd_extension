import Timer from './Timer';
import Config, {IUser} from './Config';
import mock from './mock';
import Extension from './Extension';
class Main {
    public config: any;
    constructor(config: IUser) {
        this.config = config;
        new Extension(this.config);
    }   
}

const app = new Main(mock);
console.warn(app);