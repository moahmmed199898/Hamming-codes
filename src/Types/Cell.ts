import { Binary, BinaryDigit } from "./Binary";
import { STATUS } from "./STATUS";

export default class Cell{
    private data:BinaryDigit    
    private status:STATUS
    private index: Binary;
    public next:Cell | null;
    
    private static maxLength = 0;

    constructor(data:BinaryDigit, index:number) {
        this.data = data;
        this.status = STATUS.Neutral;
        this.next = null;
        this.setIndex(index);
    }


    public getData():BinaryDigit { return this.data }
    public setData(data:BinaryDigit) { this.data = data }
    public getStatus():STATUS{return this.status}
    public setStatus(status:STATUS){this.status = status;}
    public getIndex(): Binary{
        let results = new Array<BinaryDigit>(Cell.maxLength);
        let i =0;
        for(; i<Cell.maxLength - this.index.length; i++) results[i] = 0;
        for(let j = 0; i<Cell.maxLength; i++) {
            console.log(Cell.maxLength - this.index.length - i)
            results[i] = this.index[j];
            j++
        }
        return results;
    }
    public setIndex(index:number){
        this.index = index.toString(2).split("").map(num=>parseInt(num) as BinaryDigit);   
        Cell.maxLength = this.index.length;
    }




    
    
}