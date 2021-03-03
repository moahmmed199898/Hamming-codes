import { Binary, BinaryDigit } from "../Types/Binary";
import Cell from "../Types/Cell";
import CellManager from "../Types/CellManager";
import { STATUS } from "../Types/STATUS";
import HammingCodes from "./HammingCodes";
import { countData, logData } from "./Tools";

export default class HammingCodesSender extends HammingCodes {

    constructor(data: string) {
        super();
        let binaryData:string[] = this.getBinaryData(data);
        let cells:Cell = this.convertStringBinaryDigitsToCells(binaryData);
        this.cellManager = new CellManager(cells);
        this.addParityBits();
        this.cellManager.reIndexCells();
        
    }



    private addParityBits() {
        let currentIndex = 1;
        
        for(let exponent = 0; currentIndex < this.cellManager.getSize(); exponent++) {
            let cell = new Cell(0);
            cell.setStatus(STATUS.ParityBit)
            this.cellManager.addCellByIndex(cell, currentIndex-1);
            currentIndex = Math.pow(2,exponent);
        }
        

        this.cellManager.reIndexCells();
        this.setParityBits();

        
    }

    private setParityBits() {
        let parityBits = this.getParityBits();
        for(let parityBit of parityBits) {
            const parityGroupIndex = parityBit.getIndex().indexOf(1);
            const countsOfOnesPerGroup = this.findCountsOfOnes();
            if(countsOfOnesPerGroup[parityGroupIndex] != undefined && countsOfOnesPerGroup[parityGroupIndex] % 2 != 0) {
                parityBit.setData(1);
            }
        }

            
    }

    public getCells():CellManager {
        return this.cellManager;
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
        let curr = this.cellManager.getHead();
        let countOfOnes = 0;
        while(curr != null) {
            if(curr.getData() == 1) countOfOnes++;
            curr = curr.next;
        }

        if(countOfOnes % 2 != 0) {
            this.cellManager.getHead().setData(1)
        }
    }

}