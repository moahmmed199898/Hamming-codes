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
        this.check1();
        this.check2();
        this.check3();
        this.check4();

    }

    public getData() {
        return this.head;
     
    }



    /**
     * Check1 checks if the odd colums are even or odd ( expected to be even)
     */
    public check1() {
        const {cells, others} = this.data.firstTestColumns;
        let countOfOnes = 0;
        for(let cell of cells) countOfOnes++;
        if(countOfOnes%2 == 0) {
            for(let cell of cells) cell.status = STATUS.Pass;
        } else {
            for(let cell of cells) cell.status = STATUS.Fail;
        }

        


    }


    public check2() {


    }


    public check3() {

    }

    public check4() {
    }


    public prepRows() {

        
        this.dataSize = this.countData(this.head);
        let tableLimit = Math.floor(Math.sqrt(this.dataSize));
        let curr:Cell | null = this.head;
        while(curr != null) {
            //first test 
            if(curr.x % 2 == 0) this.data.firstTestColumns.cells.push(curr)
            else this.data.firstTestColumns.others.push(curr);

            if(curr.x >= tableLimit/2) this.data.secondTestColumns.cells.push(curr)
            else this.data.secondTestColumns.others.push(curr);

            if(curr.y % 2 == 0) this.data.thirdTestRows.cells.push(curr)
            else this.data.thirdTestRows.others.push(curr);

            if(curr.y >= tableLimit/2) this.data.forthTestRows.cells.push(curr)
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





    private setPassFail(row:number, column:number, status:STATUS) {

   
    }
}