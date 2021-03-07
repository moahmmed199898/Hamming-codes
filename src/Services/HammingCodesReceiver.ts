import Cell from "../Types/Cell";
import CellList from "../Types/CellList";
import { STATUS } from "../Types/STATUS";
import HammingCodes from "./HammingCodes";



export default class HammingCodesReceiver extends HammingCodes {

    private head:Cell | null;
    private errorFound = false;
    private cellList:CellList;
    private data: {[key: number]:Cell[]} = {}
    private others: {[key: number]:Cell[]} = {}
    

    constructor(cellList:CellList) {
        super();
        this.cellList = cellList;
        this.head = cellList.getHead();
        this.prepRows();
    }

    
    public getData() {
        return this.cellList;
     
    }



    /**
     * Check1 checks if the odd colums are even or odd ( expected to be even)
     */
    public runTest(testNumber:number) {
        let testNumberAdjusted = this.cellList.getHead().getIndex().length - testNumber - 1;
        return this.test(this.data[testNumberAdjusted], this.others[testNumberAdjusted]);
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

    public getChecksCount() {
        return Object.keys(this.data).length;
        
    }


    private test(cells: Cell[], others: Cell[]):boolean {
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

    private prepRows() {
        let curr:Cell = this.head;
        while(curr!= null ) {
            let index = curr.getIndex();
            for(let i = 0; i<index.length; i++) {
                if(index[i] == 1) {
                    if(this.data[i] == undefined) this.data[i] = [curr]
                    else this.data[i].push(curr);
                } else {
                    if(this.data[i] == undefined) this.others[i] = [curr]
                    else this.others[i].push(curr);
                }
            }
            
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