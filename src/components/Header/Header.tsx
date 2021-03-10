import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './_header.scss';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <span className="wordSender">
                    <input type="text" maxLength={30}/>
                </span>
                
                <FontAwesomeIcon className="headerArrow" icon={faArrowRight}></FontAwesomeIcon>
                
                <span className="wordReciver">
                    <input type="text" disabled></input>
                </span>
            </div>
        )
    }
}