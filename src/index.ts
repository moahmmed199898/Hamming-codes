import Table from "./Components/Table";
import HammingCodes from "./Services/HammingCodes";
import { Binary, BinaryDigit } from "./Types/Binary";
import Cell from "./Types/Cell";

// let table = new Table(makeDummyData());
const ele:HTMLElement = <HTMLElement> document.getElementById("app");
// table.render(ele);
const hammingCodes = new HammingCodes(makeDummyData());
hammingCodes.checkData();
const table = new Table(hammingCodes.getData());
table.render(ele);




















function makeDummyData() {
    let table:BinaryDigit[][] = <BinaryDigit[][]> [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 1],
        [1, 0, 1, 1]
    ]

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
