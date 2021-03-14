import { input$, options$, sender$ } from "../State";
import Cell from "../Types/Cell";
import CellList from "../Types/CellList";
import { STATUS } from "../Types/STATUS";
import HammingCodes from "./HammingCodes";

export default class HammingCodesSender extends HammingCodes {
    private parityBits:Array<Cell> = [];
    constructor(data?: string) {
        super();
        if(data !== null) this.setData(data);


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
            this.setData(input)
            sender$.next(this);
        });

        options$.subscribe(options=>{

            if(options.addParityBits) {
                this.addParityBits();
            } else {
                this.removeParityBits();
            }

            
            sender$.next(this)
        })
    }

    public setCells(cells:CellList) {
        this.cellList = cells;
    }


    public addParityBits() {
        let currentIndex = 1;
        
        for(let exponent = 0; currentIndex < this.cellList.getSize(); exponent++) {
            let cell = new Cell(0);
            this.cellList.addCellByIndex(cell, currentIndex-1);
            currentIndex = Math.pow(2,exponent);
            this.parityBits.push(cell);
        }
        this.cellList.reIndexCells();
        this.setParityBits();
        
    }

    public removeParityBits() {
        for(let parityBit of this.parityBits) {
            this.cellList.removeCell(parityBit);
        }
    }

    public setParityBitStatus() {
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


    public getCells():CellList {
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
        let curr = this.cellList.getHead();
        let countOfOnes = 0;
        while(curr !== null) {
            if(curr.getData() === 1) countOfOnes++;
            curr = curr.next;
        }

        if(countOfOnes % 2 !== 0) {
            this.cellList.getHead().setData(1)
        }
    }


    public setData(data:string) {
        let binaryData:string[] = this.getBinaryData(data);
        let cells:Cell = this.convertStringBinaryDigitsToCells(binaryData);
        this.cellList = new CellList(cells);
    }

    

}