import { BehaviorSubject } from "rxjs";
import HammingCodesReceiver from "./Services/HammingCodesReceiver";
import HammingCodesSender from "./Services/HammingCodesSender";


const _sender = new HammingCodesSender("Hello");
const _receiver = new HammingCodesReceiver(_sender.getCells());

export const input = new BehaviorSubject("Hello");
export const receiverState = new BehaviorSubject(_receiver);

input.subscribe((v)=>{
    _sender.setData(v);
    _receiver.setData(_sender.getCells());
    receiverState.next(_receiver);
})

