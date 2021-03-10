import React from "react"
import HammingCodesReceiver from "../../Services/HammingCodesReceiver";
import { receiverState } from "./../../State";
import "./_options.scss"

type Props = {}
type State = {
    receiverChecksCount: number;
}

export default class Options extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            receiverChecksCount: 0
        }
        
        receiverState.subscribe(this.reciverStateUpatedHandler.bind(this))
    }



    reciverStateUpatedHandler(v:HammingCodesReceiver) {
        this.setState({
            receiverChecksCount: v.getChecksCount()
        })
    }

    buildChecks() {
        let spans = [];
        for(let i = 0; i<this.state.receiverChecksCount; i++) {
            spans.push(<span className="disabled">ReciverCheck{i}</span>)
        }
        return spans;
    }

    componentWillUnmount() {
        receiverState.unsubscribe();
    }


    render() {
        let checks = this.buildChecks();
        return (
            <div className="options">
            <div className="senderOptions">
                <span className="disabled">Add Parity Bits</span>
                <span className="disabled">Show Parity Bits</span>
            </div>
            <div className="commonOptions">
                <span className="disabled">Show indexes in Binary</span>
                <span className="disabled">Show indexes in base 10</span>
            </div>
            <div className="receiverOptions">
                <span className="disabled">Multiple Error Check</span>
                {checks}
            </div>
        </div>
        )
    }
}