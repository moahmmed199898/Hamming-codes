import Cell from "../Types/Cell";
import { STATUS } from "../Types/STATUS";

export default class Table {

    private head:Cell | null;
 
    constructor(head:Cell | null) {
         this.head = head;
    }
 
 
    /**
     * render
     
     */
    public render(parentElement:HTMLElement) {
        //clear the parent element 
        parentElement.innerHTML = "";



        const tableLimit = this.countData(this.head);
        const tableEle = document.createElement("table");
        let curr:Cell | null = this.head;
        for(let i=0; i<tableLimit; i++) {
            const tr = document.createElement("tr");
            for(let j = 0; j<tableLimit; j++) {
                const td = document.createElement("td");
                td.innerText = <string> curr?.data.toString();
                curr = <NonNullable<Cell>> curr?.next;
                tr.appendChild(td);
            }

            tableEle.appendChild(tr);
        };
        parentElement.appendChild(tableEle);
    }


    
    private countData(head:Cell | null) {
        let counter = 0;
        let curr:Cell | null = head;
        console.log(curr)
        while(curr != null) {
            counter++;
            curr = curr.next;
        }
        return counter;
    }

 
 }