import Table from "./Components/Table";
import HammingCodesReceiver from "./Services/HammingCodesReceiver"
import HammingCodesSender from "./Services/HammingCodesSender";
import { logData } from "./Services/Tools";
import { Binary, BinaryDigit } from "./Types/Binary";
import Cell from "./Types/Cell";

// let table = new Table(makeDummyData());
const ele:HTMLElement = <HTMLElement> document.getElementById("app");
// table.render(ele);

const hammingCodes = new HammingCodesSender("H");
let data = hammingCodes.getCells().getHead();
const hammingCodesReciver = new HammingCodesReceiver(data);
hammingCodesReciver.checkData();
data = hammingCodesReciver.getData();

const table = new Table(data);
table.render(ele);




















function makeDummyData() {
    let table:BinaryDigit[][] = <BinaryDigit[][]> [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 1],
        [1, 0, 1, 1,]
    ]
    const size = 50;

    for(let column = 0; column<size; column++) {
        table[column] = [];
        for(let row = 0; row<size; row++) {
            table[column][row] = 0;
        }
    };

    let head:Cell = new Cell(0 as BinaryDigit,0);
    let curr:Cell = head;
    let i = 0;

    for(let row of table) {
        for(let cell of row) {
            curr.next = new Cell(cell as BinaryDigit, i);
            curr = curr.next;
            i++;
        }
    }

    head = head.next;
    return head;
    
}
