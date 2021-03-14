import { BinaryDigit } from "../Types/Binary";
import Cell from "../Types/Cell";
import CellList from "../Types/CellList";

export default abstract class HammingCodes {
    protected cellList:CellList = new CellList();

    protected abstract setupSubscriptions():void;

    protected getParityBits():Cell[] {
        let curr = this.cellList.getHead();
        let parityBits:Cell[] = [];
        while(curr != null) {
            let indexes = curr.getIndex();
            let highBitsCount = 0;
            for(let index of indexes) {
                if(highBitsCount>1) break;
                if(index === 1) highBitsCount++;
            }
            if(highBitsCount === 1) parityBits.push(curr);
            curr = curr.next;
        }

        return parityBits;
    }

    protected findCountsOfOnes() {
        // considering the indexes are 8 in length we can loop though them and count how many ones per index ie 
        //0,0,0,0,0,0,1,0
        //0,0,0,0,0,1,1,0
        //this will result in 2 in the 2nd index and 1 in the first index
        let counters:{[key:number]:number} = {}
        let curr:Cell = this.cellList.getHead();

        while(curr != null ){
            let index = curr.getIndex();
            let data = curr.getData();
            for(let i = 0; i<index.length; i++){
                if(index[i] === 1 && data === 1) {
                    if(counters[i] === null) counters[i] = 1;
                    else counters[i]++;
                }
            }

            curr = curr.next;
        }
        return counters;
    }

        
    protected convertStringBinaryDigitsToCells(data:string[]):Cell {
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


}