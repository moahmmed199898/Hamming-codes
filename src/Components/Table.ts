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


        const tableLimit = Math.ceil(Math.sqrt(this.countData(this.head)));
        const tableEle = document.createElement("table");
        let curr:Cell = this.head;

        for(let row = 0; row<tableLimit; row++) {
            const trEle = document.createElement("tr");
            for(let column = 0; column<tableLimit; column++) {
                const tdEle = document.createElement("td");
                if(curr == null) {
                    tdEle.innerText = "0";
                    tdEle.style.backgroundColor = "#808080";
                }
                else{
                    tdEle.innerText = curr.getData() + "\n" + curr.getIndex();
                    tdEle.style.backgroundColor = this.getBackgroundColor(curr.getStatus());
                    curr = curr.next;
                } 


                trEle.appendChild(tdEle);

            }
            tableEle.appendChild(trEle);
        }
        
        parentElement.appendChild(tableEle);
    }


    
    private getBackgroundColor(status:STATUS):string {
        switch(status) {
            case STATUS.Test: return "#000000"
            case STATUS.Fail: return "#800000";
            case STATUS.Neutral: return "#FFFFFF";
            case STATUS.Pass: return "#008000"; 
            case STATUS.MultipleErrors: return "#F08144";
            case STATUS.ParityBit: return "#add8e6";
        }
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