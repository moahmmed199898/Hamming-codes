import { Binary } from "../Types/Binary";
import Cell from "../Types/Cell";
import { STATUS } from "../Types/STATUS";



export default class HammingCodes {

    private dataSize = 0;
    private head:Cell | null;

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

    

    constructor(head:Cell | null) {
        this.head = head;
        this.prepRows();
    }


    public checkData() {
        let check1 = this.check1();
        let check2 =this.check2();
        let check3 = this.check3();
        let check4 =this.check4();

        // if(check1 && check2 && check3 && check4) {
        //     this.parityBitCheck();
        // }


    }

    public getData() {
        return this.head;
     
    }



    /**
     * Check1 checks if the odd colums are even or odd ( expected to be even)
     */
    public check1() {
        return this.test(this.data.firstTestColumns);
    }


    public check2() {
        return this.test(this.data.secondTestColumns);
    }


    public check3() {
        return this.test(this.data.thirdTestRows);
    }

    public check4() {
        return this.test(this.data.forthTestRows);
    }


    public parityBitCheck() {
        let lastCell = this.getLastItem();
        if(lastCell.data == 0) {
            lastCell.status = STATUS.Pass;
        } else {
            lastCell.status = STATUS.Fail;
        }

    }


    private test (array: { cells: Array<Cell>; others: Array<Cell>; }):boolean {
        const {cells, others} = array;
        let countOfOnes = 0;
        for(let cell of cells){
            if(cell.data == 1) countOfOnes++;
        }
        console.log(countOfOnes)
        if(countOfOnes%2 == 0) {
            for(let cell of cells) cell.status = STATUS.Pass;
            return true;
        } else {
            for(let cell of cells) cell.status = STATUS.Fail;
            return false;
        }

    }


    public prepRows() {

        
        this.dataSize = this.countData(this.head);
        let tableLimit = Math.floor(Math.sqrt(this.dataSize));
        let curr:Cell | null = this.head;
        while(curr != null) {
            //first test 
            if(curr.x % 2 == 0) this.data.firstTestColumns.cells.push(curr)
            else this.data.firstTestColumns.others.push(curr);

            if(curr.x < tableLimit/2) this.data.secondTestColumns.cells.push(curr)
            else this.data.secondTestColumns.others.push(curr);

            if(curr.y % 2 == 0) this.data.thirdTestRows.cells.push(curr)
            else this.data.thirdTestRows.others.push(curr);

            if(curr.y < tableLimit/2) this.data.forthTestRows.cells.push(curr)
            else this.data.forthTestRows.others.push(curr);

            curr = curr.next;
        }

    }

    private countData(head:Cell) {
        let counter = 0;
        let curr:Cell = head;
        while(curr != null) {
            counter++;
            curr = curr.next;
        }
        return counter;
    }


    private getLastItem():Cell {
        let curr = this.head;
        while(curr.next != null) {
            curr = curr.next;
        }
        return curr;
    }





    private setPassFail(row:number, column:number, status:STATUS) {

   
    }
}