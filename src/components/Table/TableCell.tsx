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

    render() {
        return (
            <td key={this.props.base10Index} onClick={(e)=>this.props.onClick(e)} className={this.props.status.toString()}>{this.props.data}</td>
        )
    }
}