import React from "react";
import { options$ } from "../../State";
import { Binary, BinaryDigit } from "../../Types/Binary";
import { STATUS } from "../../Types/STATUS";


type Props = {
    status:STATUS,
    data: BinaryDigit,
    base10Index: number,
    base2Index: Binary

}
type State = {
    showIndexInBinary: boolean,
    showIndexesinBase10: boolean,
    data: BinaryDigit
}

export default class TableCell extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            showIndexInBinary:false,
            showIndexesinBase10: false,
            data: this.props.data
        }

        this.setupSubscriptions();
    } 


    getStyleClass(){
        let state = this.props.status;
        switch(state) {
            case STATUS.Fail: return "Fail";
            case STATUS.Neutral: return "Neutral";
            case STATUS.Pass: return "Pass"; 
            case STATUS.MultipleErrors: return "MultipleErrors";
            case STATUS.ParityBit: return "ParityBit";
        }
    }

    onClickHandler() {
        this.setState((state) => {
            return {
                data: state.data === 1 ? 0 : 1
            }
        })
    }

    setupSubscriptions() {
        options$.subscribe(options=>{
            this.setState({
                showIndexInBinary: options.showIndexesInBinary,
                showIndexesinBase10: options.showIndexesInBase10
            })
        })
    }

    render() {
        return (
            <td
             key={this.props.base10Index}
             onClick={()=>this.onClickHandler()}
             className={this.getStyleClass()}>
                 {this.state.data}
                 {this.state.showIndexInBinary? <div>{this.props.base2Index.toString()}</div>: null}
                 {this.state.showIndexesinBase10? <div>{this.props.base10Index}</div>: null}
            </td>
        )
    }
}