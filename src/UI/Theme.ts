import { STATUS } from "../Types/STATUS";

export default class Theme {
    public static setCurrentThemeStatus(status:STATUS) {
        const headerEle = document.getElementById("header");
        const optionsEle = document.getElementById("options");
        this.setStyleClass(headerEle,status)
        this.setStyleClass(optionsEle,status)
    }

    public static setElementStatus(ele:HTMLElement, status:STATUS) {
        this.setStyleClass(ele,status);
    }


    private static getStyleClass(status:STATUS):string {
        switch(status) {
            case STATUS.Fail: return "Fail";
            case STATUS.Neutral: return "Neutral";
            case STATUS.Pass: return "Pass"; 
            case STATUS.MultipleErrors: return "MultipleErrors";
            case STATUS.ParityBit: return "ParityBit";
        }
    }

    private static setStyleClass(ele:HTMLElement, status:STATUS) {
        ele.classList.remove("Fail");
        ele.classList.remove("Neutral");
        ele.classList.remove("Pass");
        ele.classList.remove("MultipleErrors");
        ele.classList.remove("ParityBit");
        ele.classList.add(this.getStyleClass(status));

    }
}