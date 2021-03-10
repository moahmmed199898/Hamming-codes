import React from "react"
import "./_options.scss"

export default class Options extends React.Component {
    render() {
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
            </div>
        </div>
        )
    }
}