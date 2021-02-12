import Table from "./Components/Table";
import HammingCodes from "./Services/HammingCodes";
import { Binary } from "./Types/Binary";
import Cell from "./Types/Cell";

// let table = new Table(makeDummyData());
const ele:HTMLElement = <HTMLElement> document.getElementById("app");
// table.render(ele);
const hammingCodes = new HammingCodes(makeDummyData());
hammingCodes.checkData();
const table = new Table(hammingCodes.getData());
table.render(ele);




















function makeDummyData() {
    let table:Binary[][] = <Binary[][]> <unknown>[
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 1],
        [1, 0, 1, 1]
    ]

    // table[rowCount][columnCount]
    let head:Cell = new Cell(0,0,0);
    let curr:Cell = head;
    let rowCount = 0;
    let columnCount = 0;

    for(let row of table) {
        for(let cell of row) {
            curr.next = new Cell(cell, columnCount, rowCount);
            curr = curr.next;
            columnCount++;
        }
        columnCount = 0;
        rowCount++;
    }

    head = head.next;
    return head;
    
}



function readAll(head:Cell) {
    let curr = head;
    while(curr != null) {
        console.log(curr.x + " | " + curr.y);
        curr = curr.next;
    }
}