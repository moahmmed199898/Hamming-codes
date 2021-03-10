import React from "react";
import "./_tableKey.scss";

export default class TableKey extends React.Component{
    render() {
        return (
            <div className="tableKey">
                <ul>
                    <li className="Pass">Pass</li>
                    <li className="Fail">Fail</li>
                    <li className="ParityBit">Parity Bit</li>
                    <li className="Neutral">Neutral</li>
                    <li className="MultipleErrors">Multiple Errors</li>
                    <li className="NA">N/A</li>
                </ul>
            </div>
        )
    }
}