import Cell from "../Types/Cell";
import { STATUS } from "../Types/STATUS";

export default class Table {

    private head:Cell;
 
    constructor(head:Cell) {
         this.head = head;
    }
 
 
    /**
     * render
     
     */
    public render(parentElement:HTMLElement) {
        //clear the parent element 
        parentElement.innerHTML = "";



        const tableLimit = Math.sqrt(this.countData(this.head));
        const tableEle = document.createElement("table");
        let curr:Cell = this.head;

        for(let row = 0; row<tableLimit; row++) {
            const trEle = document.createElement("tr");
            for(let column = 0; column<tableLimit; column++) {
                const tdEle = document.createElement("td");
                tdEle.innerText = curr.data.toString();
                switch(curr.status) {
                    case STATUS.Fail: tdEle.style.backgroundColor = "#800000"; break;
                    case STATUS.Neutral: tdEle.style.backgroundColor = "#FFFFFF"; break;
                    case STATUS.Pass: tdEle.style.backgroundColor = "#008000"; break;
                }


                trEle.appendChild(tdEle);
                curr = curr.next;
            }
            tableEle.appendChild(trEle);
        }
        
        parentElement.appendChild(tableEle);
    }


    
    private countData(head:Cell | null) {
        let counter = 0;
        let curr:Cell | null = head;
        while(curr != null) {
            counter++;
            curr = curr.next;
        }
        return counter;
    }

 
 }