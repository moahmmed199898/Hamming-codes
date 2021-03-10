import React from "react";
import HammingCodesSender from "../../Services/HammingCodesSender";
import CellList from "../../Types/CellList";
type Props = {}
type State = {}

export default class Table extends React.Component<Props,State> {
    private cellList:CellList;

    constructor(props:Props) {
        super(props);
        let sender = new HammingCodesSender("Hello");
        
        this.cellList = sender.getCells();
        console.log(this.cellList.toArray())
    }


    render() {
        return (
        <div className="tables">
            {this.cellList.toArray().map(cell=>cell.getData())}
        </div>
        )
    }
}