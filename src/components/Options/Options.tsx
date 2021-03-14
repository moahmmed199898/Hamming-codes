import React from "react"
import HammingCodesReceiver from "../../Services/HammingCodesReceiver";
import { OptionsState } from "../../Types/OptionsState";
import { options$, receiver$ } from "./../../State";
import Option from "./Option"
import "./_options.scss"

type Props = {}
type State = {
    receiverChecksCount: number;
    options:OptionsState
}

export default class Options extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            receiverChecksCount: 0,
            options: options$.getValue()
        }
        
        receiver$.subscribe(this.receiverStateUpdatedHandler.bind(this))
        options$.subscribe(this.optionsStateUpdatedHandler.bind(this));
    }

    private optionsStateUpdatedHandler(v:OptionsState) {
        this.setState({
            options:v
        })
    }

    private receiverStateUpdatedHandler(v:HammingCodesReceiver) {
        this.setState({
            receiverChecksCount: v.getChecksCount()
        })
    }

    private buildChecks() {
        let spans = [];
        for(let i = 0; i<this.state.receiverChecksCount; i++) {
            let value = `ReceiverCheck ${i}`;
            spans.push(<Option checked={this.state.options.receiverChecks.has(i)} key={i} onClick={()=>this.receiverCheckOnClickHandler(i)} value={value} />)
        }
        return spans;
    }

    private receiverCheckOnClickHandler(testNumber:number) {
        let options = this.state.options;
        if(options.receiverChecks.has(testNumber)) {
            options.receiverChecks.delete(testNumber);
        } else {
            options.receiverChecks.add(testNumber)
        }
        options$.next(options);
    }

    private addParityBitsOnCheckHandler() {
        let options = this.state.options;
        options.addParityBits = !options.addParityBits;
        options$.next(options);
    }

    private showParityBitsOnCheckHandler() {
        let options = this.state.options;
        options.showParityBits = !options.showParityBits;
        options$.next(options);
    }

    private showIndexesInBinaryOnCheckHandler() {
        let options = this.state.options;
        options.showIndexesInBinary = !options.showIndexesInBinary;
        options$.next(options);
    }

    private showIndexesInBase10OnCheckHandler() {
        let options = this.state.options;
        options.showIndexesInBase10 = !options.showIndexesInBase10;
        options$.next(options);
    }

    private multipleErrorCheckClickHandler() {
        let options = this.state.options;
        options.multipleErrorCheck = !options.multipleErrorCheck;
        options$.next(options);
    }



    render() {
        let checks = this.buildChecks();
        let options = this.state.options;
        return (
            <div className="options">
            <div className="senderOptions">
                <Option onClick={this.addParityBitsOnCheckHandler.bind(this)} checked={options.addParityBits} value="Add Parity Bits" />
                <Option onClick={this.showParityBitsOnCheckHandler.bind(this)} checked={options.showParityBits} value="Show Parity Bits" />
            </div>
            <div className="commonOptions">
                <Option onClick={this.showIndexesInBinaryOnCheckHandler.bind(this)} checked={options.showIndexesInBinary} value="Show indexes in Binary" />
                <Option onClick={this.showIndexesInBase10OnCheckHandler.bind(this)} checked={options.showIndexesInBase10} value="Show indexes in base 10" />
            </div>
            <div className="receiverOptions">
                <Option onClick={this.multipleErrorCheckClickHandler.bind(this)} checked={options.multipleErrorCheck} value="Multiple Error Check" />
                {checks}
            </div>
        </div>
        )
    }
}