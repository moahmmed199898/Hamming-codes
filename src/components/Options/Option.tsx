import React from "react";
import Switch from "react-switch";
type Props = {
    value:string,
    onClick?:Function
    checked:boolean
}
type State = {
    active:boolean
}

export default class Option extends React.Component<Props, State> {
    private readonly checkboxSize = 20;

    render() {
        return (
            <label>
                <Switch onColor="#3EB2E6" className="switch" checked={this.props.checked} width={this.checkboxSize*2} height={this.checkboxSize} onChange={()=>this.props.onClick == null? null: this.props.onClick()}/>
                <span onClick={()=>this.props.onClick == null? null: this.props.onClick()}>{this.props.value}</span>
            </label>
        )
    }
}