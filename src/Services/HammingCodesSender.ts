import { Binary, BinaryDigit } from "../Types/Binary";
import Cell from "../Types/Cell";
import CellManager from "../Types/CellManager";
import { STATUS } from "../Types/STATUS";
import { logData } from "./Tools";

export default class HammingCodesSender {
    private cellManager:CellManager;

    constructor(data: string) {
        let binaryData:string[] = this.getBinaryData(data);
        binaryData.unshift("0");
        let cells:Cell = this.convertStringBinaryDigitsToCells(binaryData);
        this.cellManager = new CellManager(cells);
        this.addParityBits();
        // this.cellManager.makeListSquareable();
        this.cellManager.reIndexCells();
        
    }



    private addParityBits() {
        let currentIndex = 0;
        
        for(let exponent = 0; currentIndex < this.cellManager.getSize(); exponent++) {
            let cell = new Cell(0);
            cell.setStatus(STATUS.ParityBit)
            this.cellManager.addCellByIndex(cell, currentIndex);
            currentIndex = Math.pow(2,exponent);
        }
        this.cellManager.reIndexCells();
        this.checkParityBits();

        
    }


    private checkParityBits() {
        let countsOfOnesPerIndex = this.findCountsOfOnes();
        console.log(countsOfOnesPerIndex)
        
    }

    private findCountsOfOnes() {
        // considering the indexes are 8 in length we can loop though them and count how many ones per index ie 
        //0,0,0,0,0,0,1,0
        //0,0,0,0,0,1,1,0
        //this will result in 2 in the 2nd index and 1 in the first index
        let counters:{[key:number]:number} = {}
        let curr:Cell = this.cellManager.getHead();

        while(curr != null ){
            if(curr.getData() == 1) {
                let index: BinaryDigit[] = curr.getIndex();
                for(let i = 0; i<index.length; i++) {
                    if(index[i] == 1) {
                        if(counters[i] == null) counters[i] = 1;
                        else counters[i] = counters[i]++;
                    }
                }
            }

            curr = curr.next;
        }

        return counters;
    }


    public getCells():CellManager {
        return this.cellManager;
    }


    
    private convertStringBinaryDigitsToCells(data:string[]):Cell {
        let firstDigit:BinaryDigit = Number.parseInt(data[0]) as BinaryDigit;
        let start = new Cell(firstDigit,0);
        let curr = start;
        for(let i = 1; i<data.length;i++) {
            let digit = Number.parseInt(data[i]) as BinaryDigit;
            curr.next = new Cell(digit,i);
            curr = curr.next;
        }

        return start;
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


}