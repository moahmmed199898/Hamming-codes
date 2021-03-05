import { logData } from "../Services/Tools";
import { BinaryDigit } from "./Binary";
import Cell from "./Cell";
import { STATUS } from "./STATUS";

export default class CellManager {
    private head:Cell;
    private size:number;
    public constructor(cells?:Cell) {
        if(cells == null) this.head = null
        else this.head = cells;

        this.size = this.countData(cells);
    }

    public addToTheBeginning(cell: Cell):void {
        if(this.head == null) this.head = cell;
        cell.next = this.head;
        this.head = cell;
        this.size++;
    }

    public addToTheEnd(cell: Cell):void {
        let lastCell = this.getCell(this.size - 1);
        lastCell.next = cell;
        this.size++;
    }

    public addCellByIndex(cell:Cell, index:number):void {
        if(index === 0) return this.addToTheBeginning(cell);
        if(index >= this.size) return this.addToTheEnd(cell);

        let before = this.getCell(index -1);
        let after = this.getCell(index);

        cell.next = after;
        before.next = cell;

        this.size++;
    }

    public getLastCell():Cell {
        return this.getCell(this.size-1);
    }

    public getCell(index: number): Cell {
        if(index > this.size-1) return null;
        
        let curr = this.head;
        for(let i = 0; i<=index; i++) curr = curr.next;

        return curr;
    }

    public getHead():Cell {
        return this.head;
    }

    
    public expandListSize(expectedSize:number):void {

        for(let i = this.size; i<expectedSize; i++) {
            let temp = new Cell(0,i);
            temp.next = this.head;
            this.head = temp;
        }
        
    }

    public makeListSquareable():void {
        let base = 2;
        while(this.size > base) {
            base = Math.pow(base,2);
        }
        
        this.expandListSize(base);
    }

    public reIndexCells():void {
        let curr = this.head;
        let index = 0;
        while(curr != null) {
            curr.setIndex(index);
            curr = curr.next;
            index++;
        }
    }

    public getSize():number {
        return this.size;
    }

    private countData(head:Cell) {
        let counter = 0;
        let curr:Cell = head;
        while(curr != null) {
            counter++;
            curr = curr.next;
        }
        return counter;
    }


    public setData(text:string) {
        let binaryData = this.getBinaryData(text);
        let cells = this.convertStringBinaryDigitsToCells(binaryData);
        this.head = cells;
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


}