import React from "react";
import HammingCodesSender from "../../Services/HammingCodesSender";
import CellList from "../../Types/CellList";
import "./_table.scss";
type Props = {}
type State = {}

export default class Table extends React.Component<Props,State> {
    private cellList:CellList;
    private tableLimit: number;
    constructor(props:Props) {
        super(props);
        let sender = new HammingCodesSender("H");
        this.cellList = sender.getCells();
    }


    private getTable() {
        this.tableLimit = Math.ceil(Math.sqrt(this.cellList.getSize()));
        let curr = this.cellList.getHead();
        let counter = 0;
        let table = [];
        let row = [];
        while(curr!=null) {
            row.push(curr);
            counter++;
            curr = curr.next;
            if(counter > this.tableLimit) {
                table.push(row);
                row = [];
                counter = 0;
            }
        }
        return table;
    }


    render() {
        return (
        <div className="tables">
            <table>
                <tbody>
                    {this.getTable().map((row,i)=>{
                        return <tr key={i}>{row.map(cell=><td key={cell.getBase10Index()}>{cell.getData()}</td>)}</tr>
                    })}
                </tbody>
            </table>
        </div>
        )
    }
}