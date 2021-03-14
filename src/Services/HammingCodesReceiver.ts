import { options$, receiver$, sender$ } from "../State";
import Cell from "../Types/Cell";
import CellList from "../Types/CellList";
import { STATUS } from "../Types/STATUS";
import HammingCodes from "./HammingCodes";



export default class HammingCodesReceiver extends HammingCodes {

    private head:Cell;
    private errorFound = false;
    private data: {[key: number]:Cell[]} = {}
    private others: {[key: number]:Cell[]} = {}
    

    constructor(cellList?:CellList) {
        super();
        if(cellList!==null) this.setData(cellList);

        /*if this doesn't make sense to you don't worry, you are not alone, this is one of these js things where you need an hour to research 
          and still don't understand it but here is quick explanation:
          JS is a single threaded language but it can do things like await and set timeouts without freezing the main thread. The way it does that is by putting things
          that need to be awaited or setTimeout/setInterval on the side while it runs everything else and comes back to the setTimeout. So, by setting setTimeout of 0 
          we are saying "hey do everything else and finish this last" 
          
          this is not the a good explanation but hey, I tried ¯\_(ツ)_/¯

          Why am I doing this? I need the observables to be set and if I don't do it this way it will be... let's not talk about it ⊙﹏⊙ 

        */
        setTimeout(() => this.setupSubscriptions());
    }

    protected setupSubscriptions() {

            options$.subscribe(options=>{
                options.receiverChecks.forEach(testNumber=>this.runTest(testNumber))
                receiver$.next(this);
            }) 


            sender$.subscribe(sender=>{
                this.setData(sender.getCells());
                receiver$.next(this)
            });
    }


    public setData(cellList:CellList) {
        this.cellList = cellList;
        this.head = cellList.getHead();
        this.prepRows();
    }
    public getData() {
        return this.cellList;
    }

    public getDataAsString():string {
        let parityBits = this.getParityBits();
        let curr = this.cellList.getHead().next;
        let bits = "";
        let index = 0;
        while(curr != null) {
            if(parityBits.indexOf(curr) === -1) {
                bits+= curr.getData();
                if(index === 7) {
                    bits += " "
                    index = 0;
                } else index++;
            }
            curr = curr.next;
        }

        let bins = bits.split(" ");
        if(bins[bins.length-1] === "") bins= bins.slice(0,bins.length-1);
        bits = bins.map(bin=>String.fromCharCode(parseInt(bin,2))).join("");

        return bits
    }

    public runTest(testNumber:number) {
        let testNumberAdjusted = this.cellList.getHead().getIndex().length - testNumber - 1;
        this.test(this.data[testNumberAdjusted], this.others[testNumberAdjusted]);
    }

    public twoErrorCheck() {
        let countOfOnes = this.countTheOnesInNode(this.head);
        if(this.errorFound && countOfOnes%2 === 0) {
            let curr = this.head;
            while(curr!= null) {
                curr.setStatus(STATUS.MultipleErrors);
                curr = curr.next;
            }
        } else if(!this.errorFound && countOfOnes%2 === 0) {
            this.head.setStatus(STATUS.Pass)
        }

    }

    public getChecksCount() {
        return Object.keys(this.data).length+1;
        
    }


    private test(cells: Cell[], others: Cell[]):boolean {
        let countOfOnes:number = this.countTheOnes(cells);

        // if the count is even 
        if(countOfOnes%2 === 0) {
            for(let cell of cells) cell.setStatus(STATUS.Pass);
            return true;

        } else {
            //if not 
            for(let cell of cells) 
            {
                if(cell.getStatus() !== STATUS.Pass) {
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
                if(index[i] === 1) {
                    if(this.data[i] === undefined) this.data[i] = [curr]
                    else this.data[i].push(curr);
                } else {
                    if(this.data[i] === undefined) this.others[i] = [curr]
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
            if(cell.getData() === 1) countOfOnes++;
        }
        return countOfOnes;
    }

    
    private countTheOnesInNode(head:Cell):number {
        let countOfOnes = 0;
        let curr = this.head;
        while(curr != null) {
            if(curr.getData() === 1) countOfOnes++;
            curr = curr.next;
        }
        return countOfOnes;
    }
}