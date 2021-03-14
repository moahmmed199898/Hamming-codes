import { options$, receiver$, sender$ } from "../State";
import Cell from "../Types/Cell";
import { STATUS } from "../Types/STATUS";
import HammingCodes from "./HammingCodes";



export default class HammingCodesReceiver extends HammingCodes {

    private errorFound = false;
    private data: {[key: number]:Cell[]} = {}
    private others: {[key: number]:Cell[]} = {}
    

    constructor(cellList?:Array<Cell>) {
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


    public setData(cellList:Array<Cell>) {
        this.cellList = cellList;
        this.prepRows();
    }
    public getData() {
        return this.cellList;
    }

    public getDataAsString():string {
        let bits = "";
        let bitCount = 0;
        let parityBits = this.getParityBits();
        // loop though the cell list
        for(let i = 0; i<this.cellList.length; i++) {
            //if there is a bit parity bit don't add it to the output
            if(parityBits.findIndex(parityBit => parityBit.equals(this.cellList[i])) > -1) continue;
            //get the data from the cell
            bits += this.cellList[i].getData();
            //check if there are 8 bits
            bitCount++;
            if(bitCount === 8) {
                bits +=" "
                bitCount = 0;
            }
        }

        //remove white space
        bits.trim();
        //split into 8 bit bins
        let bins = bits.split(" ");
        //convert to Ascii 
        if(bins[bins.length-1] === "") bins= bins.slice(0,bins.length-1);
        bits = bins.map(bin=>String.fromCharCode(parseInt(bin,2))).join("");

        return bits;
    }

    public runTest(testNumber:number) {
        let testNumberAdjusted = this.cellList[0].getIndex().length - testNumber - 1;
        this.test(this.data[testNumberAdjusted], this.others[testNumberAdjusted]);
    }

    public twoErrorCheck() {
        throw NotImplementedException();

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
        for(let cell of this.cellList) {
            let index = cell.getIndex();
            for(let i = 0; i<index.length; i++) {
                if(index[i] === 1) {
                    if(this.data[i] === undefined) this.data[i] = [cell]
                    else this.data[i].push(cell);
                } else {
                    if(this.data[i] === undefined) this.others[i] = [cell]
                    else this.others[i].push(cell);
                }
            }
            
            cell = cell.next;
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

    
    private countTheOnesInNode(cells:Array<Cell>):number {
        let countOfOnes = 0;
        for(let cell of cells) {
            if(cell.getData() === 1) countOfOnes++;
        }
        return countOfOnes;
    }
}

function NotImplementedException() {
    throw new Error("Function not implemented.");
}
