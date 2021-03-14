import { input$, options$, sender$ } from "../State";
import Cell from "../Types/Cell";
import { STATUS } from "../Types/STATUS";
import HammingCodes from "./HammingCodes";

export default class HammingCodesSender extends HammingCodes {
    private parityBitsSet:boolean;
    constructor(data?: string) {
        super();
        if(data !== null) this.setData(data);
        this.parityBitsSet = false;

        /*if this doesn't make sense to you don't worry, you are not alone, this is one of these js things where you need an hour to research 
          and still don't understand it but here is quick explanation:
          JS is a single threaded language but it can do things like await and set timeouts without freezing the main thread. The way it does that is by putting things
          that need to be awaited or setTimeout/setInterval on the side while it runs everything else and comes back to the setTimeout. So, by setting setTimeout of 0 
          we are saying "hey do everything else and finish this last" 
          
          this is not the a good explanation but hey, I tried ¯\_(ツ)_/¯

          Why am I doing this? I need the observables to be set and if I don't do it this way it will be... let's not talk about it ⊙﹏⊙ 

        */
        setTimeout(()=>this.setupSubscriptions());
    }


    protected setupSubscriptions(): void {

        input$.subscribe(input => {
            let options = options$.getValue();
            options.addParityBits = false;
            options.showParityBits = false;
            options$.next(options);

            this.setData(input)
            sender$.next(this);
        });

        options$.subscribe(options=>{
            if(options.addParityBits) this.addParityBits();
            else this.removeParityBits();

            if(options.showParityBits) this.setParityBitStatus();
            else this.removeParityBitStatus();

            sender$.next(this)
        })
    }

    public setCells(cells:Array<Cell>) {
        this.cellList = cells;
    }


    public addParityBits() {
        if(this.parityBitsSet) return;
        let length = this.cellList.length
        for(let i = 0; i<length; i++) {
            let cell = new Cell(0);
            let index = Math.pow(2,i);
            if(index > length) break;
            this.cellList.splice(index,0, cell);
        }
        this.parityBitsSet = true;
        this.reIndexCells();
        this.setParityBits();
        
    }

    public removeParityBits() {
        if(!this.parityBitsSet) return;
        for(let parityBit of this.getParityBits()) {
            let index = this.cellList.findIndex(cell=>cell.getBase10Index() === parityBit.getBase10Index());
            this.cellList.splice(index,1)
        }
        
        this.parityBitsSet = false;
    }

    public setParityBitStatus() {
        if(!this.parityBitsSet) {
            let options = options$.getValue();
            options.addParityBits = true;
            options$.next(options)
        }

        let parrityBits = this.getParityBits();
        for(let parrityBit of parrityBits) {
            parrityBit.setStatus(STATUS.ParityBit);
        }
    }

    public removeParityBitStatus() {
        let parrityBits = this.getParityBits();
        for(let parrityBit of parrityBits) {
            if(parrityBit.getStatus() === STATUS.ParityBit){
                parrityBit.setStatus(STATUS.Neutral);
            }
        }
    }

    private setParityBits() {
        let parityBits = this.getParityBits();
        for(let parityBit of parityBits) {
            const parityGroupIndex = parityBit.getIndex().indexOf(1);
            const countsOfOnesPerGroup = this.findCountsOfOnes();
            if(countsOfOnesPerGroup[parityGroupIndex] !== undefined && countsOfOnesPerGroup[parityGroupIndex] % 2 !== 0) {
                parityBit.setData(1);
            }
        }

            
    }


    public getCells():Array<Cell> {
        return this.cellList;
    }

    private getBinaryData(data: string) {
        let binaryData:string[] = data.split("").map(val=>val.charCodeAt(0).toString(2));
        for(let i = 0; i<binaryData.length; i++) {
            let data = binaryData[i].split("");
            while(data.length < 8) data.unshift("0");
            binaryData[i] = data.join("");
        }
        binaryData = binaryData.join("").split("");
        return binaryData;
        
    }

    private setZeroIndexParity() {
        throw NotImplementedException();
    }


    public setData(data:string) {
        let binaryData:string[] = this.getBinaryData(data);
        let cells:Cell[] = this.convertStringBinaryDigitsToCells(binaryData);
        this.cellList = cells;
        this.reIndexCells();
    }

    
    public reIndexCells():void {
        let index = 0;
        for(let cell of this.cellList) {
            cell.setIndex(index);
            index++;
        }
    }

}

function NotImplementedException() {
    throw new Error("Function not implemented.");
}
