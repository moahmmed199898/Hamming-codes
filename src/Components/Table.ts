import Cell from "../Types/Cell";
import CellList from "../Types/CellList";
import { STATUS } from "../Types/STATUS";

export default class Table {

    private head:Cell;
 
    constructor(CellList:CellList) {
         this.head = CellList.getHead();
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
                    // tdEle.innerText = curr.getData() + "\n" + curr.getIndex();
                    tdEle.innerText = curr.getData().toString();
                    // tdEle.style.backgroundColor = this.getBackgroundColor(curr.getStatus());
                    tdEle.classList.add(this.getStyleClass(curr.getStatus()))
                    curr = curr.next;
                } 


                trEle.appendChild(tdEle);

            }
            tableEle.appendChild(trEle);
        }
        
        parentElement.appendChild(tableEle);
    }


    
    private getStyleClass(status:STATUS):string {
        switch(status) {
            case STATUS.Fail: return "Fail";
            case STATUS.Neutral: return "Neutral";
            case STATUS.Pass: return "Pass"; 
            case STATUS.MultipleErrors: return "MultipleErrors";
            case STATUS.ParityBit: return "ParityBit";
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