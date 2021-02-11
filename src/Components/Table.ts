import Cell from "../Types/Cell";
import { STATUS } from "../Types/STATUS";

export default class Table {

    private data:Array<Cell> = [];
 
    constructor(table:Array<Cell>) {
         this.data = table;
    }
 
 
    /**
     * render
     
     */
    public render(parentElement:HTMLElement) {
        //clear the parent element 
        parentElement.innerHTML = "";



        const tableLimit = 4;
        const tableEle = document.createElement("table");
        
        for(let i=0; i<tableLimit; i++) {
            const tr = document.createElement("tr");
            for(let j = 0; j<tableLimit; j++) {
                const td = document.createElement("td");
                td.innerText = this.data[i].data.toString();
                tr.appendChild(td);
            }

            tableEle.appendChild(tr);
        };
        parentElement.appendChild(tableEle);
    }
 
 }