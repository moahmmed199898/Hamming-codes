import Cell from "../Types/Cell";

export default class Table {

    private data:Array<Cell> = [];
 
    constructor(table:Array<Array<Cell>>) {
         for(let i = 0; i<table.length; i++) {
            for(let j = 0; j<table[i].length; j++) {
                this.data.push(table[i][j]);
            }
         }
    }
 
 
    /**
     * render
     
     */
    public render(parentElement:HTMLElement) {
        const tableLimit = Math.sqrt(this.data.length);
        const tableEle = document.createElement("table");
        for(let i=0; i<this.data.length; i = i+tableLimit) {
            const tr = document.createElement("tr");
            for(let j = 0; j<tableLimit; j++) {
                const td = document.createElement("td");
                td.innerText = this.data[i+j].data.toString();
                td.style.background = this.data[i+j].color;
                tr.appendChild(td);
            }

            tableEle.appendChild(tr);
        };
        parentElement.appendChild(tableEle);
    }
 
 }