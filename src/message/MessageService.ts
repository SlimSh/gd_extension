import Browser, { IMessageSender, TCallMessageCallback} from '../browser/Browser';
class MessageService {
    public _requests: Map<any, any>;
    public _externalRequests: Map<any, any>;
    constructor() {
        this._requests = new Map;
        this._externalRequests = new Map;
        Browser.addMessageListener(
            (message: any,
             messageSender: IMessageSender,
             response: () => void) => {
                 let e = this._externalRequests.get(message.name);
                 e && e(message.data, messageSender, response);
        });
        Browser.addExternalMessageListener(
            (message: any,
            messageSender:IMessageSender,
            response: TCallMessageCallback) => {
                let e = this._externalRequests.get(message.name);
                e && e(message.data, messageSender, response);
            }
        )
    }

    public registerMessage = (param: string, value: any) => {
        this._externalRequests.set(param, value);
    }

    public registerExternalMessage = (param: string, value: any) => {
        this._requests.set(param, value);
    }
}

const messageService = new MessageService;
export default messageService;