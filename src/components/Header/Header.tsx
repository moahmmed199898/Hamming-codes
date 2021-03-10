import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {input, receiverState} from "./../../State";
import './_header.scss';

type Props = {}
type State = {
    outputValue:string
}

export default class Header extends React.Component<Props,State> {

    constructor(props:Props){
        super(props);
        this.state = {
            outputValue: ""
        }


        receiverState.subscribe(v=>{
            this.setState({
                outputValue: v.getDataAsString()
            })
            return true;
        })
    }


    onkeyUpHandler(event: React.ChangeEvent<HTMLInputElement>) {
        input.next(event.currentTarget.value);
    }

    
    render() {
        return (
            <div className="header">
                <span className="wordSender">
                    <input onChange={this.onkeyUpHandler.bind(this)} type="text" maxLength={30}/>
                </span>
                
                <FontAwesomeIcon className="headerArrow" icon={faArrowRight}></FontAwesomeIcon>
                
                <span className="wordReciver">
                    <input type="text" value={this.state.outputValue} disabled></input>
                </span>
            </div>
        )
    }
}