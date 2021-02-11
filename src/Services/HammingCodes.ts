import { Binary } from "../Types/Binary";
import Cell from "../Types/Cell";
import { STATUS } from "../Types/STATUS";



export default class HammingCodes {

    private dataSize = 0;

    private data = {
        firstTestColumns: {
            cells: new Array<Cell>(),
            others: new Array<Cell>()
        }, 
        secondTestColumns: {
            cells: new Array<Cell>(),
            others: new Array<Cell>()
        },
        thirdTestRows: {
            cells: new Array<Cell>(),
            others: new Array<Cell>()
        },

        forthTestRows: {
            cells: new Array<Cell>(),
            others: new Array<Cell>()
        }


    }

    

    constructor(data:Array<Cell>) {
        this.prepRows(data);
    }


    public checkData() {
        this.check1();
        this.check2();
        this.check3();
        this.check4();

    }

    public getData() {
        let results = new Array<Cell>();
        //make the array


        // this.data.firstTestColumns.cells.forEach(cell => this.checkIfItemExists(cell, results) ? null : results.push(cell) );
        // this.data.secondTestColumns.cells.forEach(cell => this.checkIfItemExists(cell, results) ? null : results.push(cell));
        // this.data.thirdTestRows.cells.forEach(cell => this.checkIfItemExists(cell, results) ? null : results.push(cell));
        // this.data.forthTestRows.cells.forEach(cell => this.checkIfItemExists(cell, results) ? null : results.push(cell));



        for(let i = 0; i<this.data.firstTestColumns.cells.length; i++) {

            const first = this.data.firstTestColumns.cells[i];
            const secound = this.data.secondTestColumns.cells[i];
            const third = this.data.thirdTestRows.cells[i];
            const forth = this.data.forthTestRows.cells[i];


            // if(results.indexOf(this.data.firstTestColumns.cells[i]) == -1) results.push(this.data.firstTestColumns.cells[i])
            // if(results.indexOf(this.data.secondTestColumns.cells[i]) == -1) results.push(this.data.secondTestColumns.cells[i])
            // if(results.indexOf(this.data.thirdTestRows.cells[i]) == -1) results.push(this.data.thirdTestRows.cells[i])
            // if(results.indexOf(this.data.forthTestRows.cells[i]) == -1) results.push(this.data.forthTestRows.cells[i])

            if(results.findIndex(r => r.x == first.x && r.y == first.y ) == -1) results.push(first)
            if(results.findIndex(r => r.x == secound.x && r.y == secound.y ) == -1) results.push(secound)
            if(results.findIndex(r => r.x == third.x && r.y == third.y ) == -1) results.push(third)
            if(results.findIndex(r => r.x == forth.x && r.y == forth.y ) == -1) results.push(forth)
        } 

        // this.data.firstTestColumns.cells.forEach(cell=>results.add(cell));
        // this.data.secondTestColumns.cells.forEach(cell=>results.add(cell));
        // this.data.thirdTestRows.cells.forEach(cell=>results.add(cell));
        // this.data.forthTestRows.cells.forEach(cell=>results.add(cell));

        console.log(results.findIndex(r => r.x == 1 && r.y ==  1));
        
        return [results];
    }

    private checkIfItemExists(item:Cell, array:Cell[]) {

        for(let cell of array) {
            if(cell.x == item.x && cell.y == item.y) return true;
        }

        return false;
    }



    /**
     * Check1 checks if the odd colums are even or odd ( expected to be even)
     */
    public check1() {
    
    }


    public check2() {


    }


    public check3() {

    }

    public check4() {
    }


    public prepRows(cells:Array<Cell>) {

        this.dataSize = cells.length;
        let tableLimit = Math.floor(Math.sqrt(cells.length));

        for(let cell of cells) {
            //first test 
            if(cell.x % 2 == 0) this.data.firstTestColumns.cells.push(cell)
            else this.data.firstTestColumns.others.push(cell);

            if(cell.x >= tableLimit/2) this.data.secondTestColumns.cells.push(cell)
            else this.data.secondTestColumns.others.push(cell);

            if(cell.y % 2 == 0) this.data.thirdTestRows.cells.push(cell)
            else this.data.thirdTestRows.others.push(cell);

            if(cell.y >= tableLimit/2) this.data.forthTestRows.cells.push(cell)
            else this.data.forthTestRows.others.push(cell);

        }

    }




    private setPassFail(row:number, column:number, status:STATUS) {

   
    }
}