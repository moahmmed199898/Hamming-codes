import React from "react";
import Cell from "../../Types/Cell";
import CellList from "../../Types/CellList";
import { receiverState } from "./../../State";
import TableCell from "./TableCell";
import "./_table.scss";
type Props = {}
type State = {
    table:Cell[][]
}

export default class Table extends React.Component<Props,State> {
    private cellList:CellList;
    private tableLimit: number;

    constructor(props:Props) {
        super(props);

        this.state = {
            table: []
        }


        receiverState.subscribe(v=>{
            this.cellList = v.getData();
            this.setState({
                table: this.getTable()
            })
        })
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
                    {this.state.table.length === 0 ? <tr><td>N/A</td></tr>:
                        this.state.table.map((row,i)=>{
                            return <tr key={i}>
                                {row.map(c=>
                                     <TableCell status={c.getStatus()} data={c.getData()} base10Index={c.getBase10Index()} base2Index={c.getIndex()} /> 
                                    )}
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        )
    }
}