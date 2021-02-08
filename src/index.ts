import Table from "./Components/Table";
import { Binary } from "./Types/Binary";
import Cell from "./Types/Cell";

const table = new Table(makeDummyData());
const ele:HTMLElement = <HTMLElement> document.getElementById("app");
table.render(ele);
console.log("hello")




function makeDummyData() {
    let table:Binary[][] = <Binary[][]> <unknown>[
        [0, 0, 0, 1],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 0, 0, 1]
    ]

    let tableWCells = Array<Array<Cell>>();
    for(let i = 0; i<table.length; i++) {
        let cells = Array<Cell>();
        for(let j = 0; j<table[i].length; j++) {
            let cell = new Cell(table[i][j], "#ffffff")
            cells.push(cell)

        }
        tableWCells.push(cells);
    }

    return tableWCells;
    
}