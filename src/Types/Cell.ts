import { Binary } from "./Binary";
import { STATUS } from "./STATUS";

export default class Cell{
    public data:Binary    
    public status:STATUS
    public x:number;
    public y:number;
    constructor(data:Binary, x:number, y:number) {
        this.data = data;
        this.status = STATUS.Neutral;
        this.x = x;
        this.y = y;
    }

    public valueOf()


    
    
}