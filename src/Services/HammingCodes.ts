import Cell from "../Types/Cell";
import { STATUS } from "../Types/STATUS";



export default class HammingCodes {

    private head:Cell | null;
    private errorFound = false;

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
        this.check1()
        this.check2()
        this.check3()
        this.check4()
        this.twoErrorCheck()
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


    public twoErrorCheck() {
        let countOfOnes = this.countTheOnesInNode(this.head);
        if(this.errorFound && countOfOnes%2 == 0) {
            let curr = this.head;
            while(curr!= null) {
                curr.setStatus(STATUS.MultipleErrors);
                curr = curr.next;
            }
        } else if(!this.errorFound && countOfOnes%2 == 0) {
            this.head.setStatus(STATUS.Pass)
        }

    }


    private test (array: { cells: Array<Cell>; others: Array<Cell>; }):boolean {
        const {cells, others} = array;
        let countOfOnes:number = this.countTheOnes(cells);

        // if the count is even 
        if(countOfOnes%2 == 0) {
            for(let cell of cells) cell.setStatus(STATUS.Pass);
            return true;

        } else {
            //if not 
            for(let cell of cells) 
            {
                if(cell.getStatus() != STATUS.Pass) {
                    cell.setStatus(STATUS.Fail);
                }
            }

            //passing the others 
            for(let cell of others) {
                cell.setStatus(STATUS.Pass);
            }
            this.errorFound = true;
            return false;
        }

    }


    public prepRows() {
        let curr:Cell = this.head;
        while(curr!= null ) {
            let index = curr.getIndex();

            //first check data
            if(index[index.length-1] == 1) this.data.firstTestColumns.cells.push(curr)
            else this.data.firstTestColumns.others.push(curr);

            if(index[index.length-2] == 1) this.data.secondTestColumns.cells.push(curr);
            else this.data.secondTestColumns.others.push(curr);

            if(index[index.length-3] == 1) this.data.thirdTestRows.cells.push(curr);
            else this.data.thirdTestRows.others.push(curr);

            if(index[index.length-4] == 1) this.data.forthTestRows.cells.push(curr);
            else this.data.forthTestRows.others.push(curr);

            
            curr = curr.next;
        }

    }


    private countTheOnes(cells:Cell[]):number {
        let countOfOnes = 0;
        //get the count of ones 
        for(let cell of cells){
            if(cell.getData() == 1) countOfOnes++;
        }
        return countOfOnes;
    }

    
    private countTheOnesInNode(head:Cell):number {
        let countOfOnes = 0;
        let curr = this.head;
        while(curr != null) {
            if(curr.getData() == 1) countOfOnes++;
            curr = curr.next;
        }
        return countOfOnes;
    }
}