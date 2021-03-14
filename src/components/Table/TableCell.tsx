import React from "react";
import { Binary, BinaryDigit } from "../../Types/Binary";
import { STATUS } from "../../Types/STATUS";


type Props = {
    status:STATUS,
    data: BinaryDigit,
    onClick?: Function,
    base10Index: number,
    base2Index: Binary

}
type State = {}

export default class TableCell extends React.Component<Props,State> {
    getClass(){
        let state = this.props.status;
        switch(state) {
            case STATUS.Fail: return "Fail";
            case STATUS.Neutral: return "Neutral";
            case STATUS.Pass: return "Pass"; 
            case STATUS.MultipleErrors: return "MultipleErrors";
            case STATUS.ParityBit: return "ParityBit";
        }
    }

    render() {
        return (
            <td key={this.props.base10Index} onClick={(e)=>this.props.onClick(e)} className={this.getClass()}>{this.props.data}</td>
        )
    }
}