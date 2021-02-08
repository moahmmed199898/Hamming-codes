import { Binary } from "./Binary";

export default class Cell {
    public data:Binary    
    public color:string

    constructor(data:Binary, color:string) {
        this.data = data;
        this.color = color;
    }
}