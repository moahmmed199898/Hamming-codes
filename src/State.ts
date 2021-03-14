import { OptionsState } from './Types/OptionsState';
import { BehaviorSubject } from "rxjs";
import HammingCodesReceiver from "./Services/HammingCodesReceiver";
import HammingCodesSender from "./Services/HammingCodesSender";

const _sender = new HammingCodesSender("Hello");
const _receiver = new HammingCodesReceiver(_sender.getCells());

export const input$ = new BehaviorSubject("Hello");
export const sender$ = new BehaviorSubject(_sender);
export const receiver$ = new BehaviorSubject(_receiver);

export const options$ = new BehaviorSubject({
    addParityBits: false,
    showParityBits: false,
    showIndexesInBinary: false,
    showIndexesInBase10: false,
    multipleErrorCheck: false,
    receiverChecks: new Set<number>()
} as OptionsState)

  
// input$.subscribe((v)=>{
//     // let options = options$.getValue();
//     // options.addParityBits = false;
//     // options.showParityBits = false;
//     // options$.next(options)

//     _sender.setData(v);
//     _receiver.setData(_sender.getCells());
//     receiver$.next(_receiver);
//     console.log(_sender)
// })