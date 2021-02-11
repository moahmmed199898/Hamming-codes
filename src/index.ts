import Table from "./Components/Table";
import HammingCodes from "./Services/HammingCodes";
import { Binary } from "./Types/Binary";
import Cell from "./Types/Cell";

let table = new Table(makeDummyData());
const ele:HTMLElement = <HTMLElement> document.getElementById("app");
table.render(ele);
// const hammingCodes = new HammingCodes(makeDummyData());
// hammingCodes.checkData();

// table = new Table(hammingCodes.getData());
// table.render(ele);




















function makeDummyData() {
    let table:Binary[][] = <Binary[][]> <unknown>[
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 1],
        [1, 0, 1, 1]
    ]

    let curr:Cell | null= null;
    for(let i = 0; i<table.length; i++) {
        for(let j = 0; j<table.length; j++) {
            let cell = new Cell(table[i][j], i,j);
            if(curr == null) curr = cell;
            else curr.next = cell;
            curr = curr.next;
            console.log(curr == null)
        }
    }

    return curr;
    
}