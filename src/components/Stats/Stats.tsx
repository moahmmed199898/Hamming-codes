import React from "react";
import HammingCodesReceiver from "../../Services/HammingCodesReceiver";
import {receiver$} from "./../../State";
import "./_stats.scss";

type Props = {}
type State = {
    size:number;
}

export default class Stats extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            size: 0
        }
        receiver$.subscribe(this.receiverUpdatedHandler.bind(this))
    }


    receiverUpdatedHandler(v:HammingCodesReceiver) {
        this.setState({
            size: v.getData().length
        })
    }

    render() {
        return (
            <div className="stats">
            <ul>
                <li>Size: <span className="size">{this.state.size}</span> bits</li>
            </ul>
        </div>
        )
    }
}