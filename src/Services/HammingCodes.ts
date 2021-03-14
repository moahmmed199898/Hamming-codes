import { BinaryDigit } from './../Types/Binary';
import Cell from "../Types/Cell";

export default abstract class HammingCodes {
    protected cellList:Array<Cell> = new Array<Cell>();

    protected abstract setupSubscriptions():void;

    protected getParityBits():Cell[] {
        let parityBits: Array<Cell> = [];
        let highestIndex = this.cellList[0].getIndex().length;
        for(let i = 0; i<highestIndex; i++) {
            let index = Math.pow(2,i);
            if(index>this.cellList.length-1) break;
            parityBits.push(this.cellList[index]);
        }

        return parityBits;
        
    }

    protected findCountsOfOnes() {
        // considering the indexes are 8 in length we can loop though them and count how many ones per index ie 
        //0,0,0,0,0,0,1,0
        //0,0,0,0,0,1,1,0
        //this will result in 2 in the 2nd index and 1 in the first index
        let counters:{[key:number]:number} = {}

        for(let cell of this.cellList){
            let index = cell.getIndex();
            let data = cell.getData();
            for(let i = 0; i<index.length; i++){
                if(index[i] === 1 && data === 1) {
                    if(counters[i] === null) counters[i] = 1;
                    else counters[i]++;
                }
            }
        }
        return counters;
    }

        
    protected convertStringBinaryDigitsToCells(data:string[]):Array<Cell> {
        let results:Array<Cell> = []
        for(let digit of data) {
            let binaryDigit = Number.parseInt(digit) as BinaryDigit;
            let cell = new Cell(binaryDigit);
            results.push(cell);
        }
        return results;
    }


}