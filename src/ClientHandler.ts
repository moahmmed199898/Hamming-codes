import Table from "./Components/Table";
import HammingCodesReceiver from "./Services/HammingCodesReceiver";
import HammingCodesSender from "./Services/HammingCodesSender";
import { logData } from "./Services/Tools";
import CellList from "./Types/CellList";

export default class ClientHandler {
    private userInput:HTMLInputElement; 
    private output:HTMLElement;
    private tableEle:HTMLElement;


    private CellList:CellList;
    private sender:HammingCodesSender;
    private receiver:HammingCodesReceiver;
    private table: Table;

    private state = {
        addParityBitButtonChecked: false,
        showParityBitButtonChecked: false,
        showIndexesInBinaryButtonChecked: false,
        showIndexesInBase10ButtonChecked: false,
        reciverCheck1ButtonChecked: false,
        reciverCheck2ButtonChecked: false,
        reciverCheck3ButtonChecked: false,
        reciverCheck4ButtonChecked: false,
        multipleErrorCheckButtonChecked: false,

    }
    

    constructor() {

        this.setupProperties();
        this.setUpEventHandlers();
        this.userInputEventHandler();
    }
    
    private setupProperties() {
        this.userInput = <HTMLInputElement> document.getElementById("userInput");
        this.output = document.getElementById("output");
        this.tableEle = document.querySelector("#tables #sender");

        this.CellList = new CellList();
        this.receiver = new HammingCodesReceiver(this.CellList);
        this.sender = new HammingCodesSender(this.userInput.value);
        this.table = new Table(this.CellList);

    }

    private setUpEventHandlers() {


        let addParityBitButton = document.getElementById("addParityBitButton");
        let showParityBitButton = document.getElementById("showParityBitButton");
        let showIndexesInBinaryButton = document.getElementById("showIndexesInBinaryButton");
        let showIndexesInBase10Button = document.getElementById("showIndexesInBase10Button");
        let reciverCheck1Button = document.getElementById("reciverCheck1Button");
        let reciverCheck2Button = document.getElementById("reciverCheck2Button");
        let reciverCheck3Button = document.getElementById("reciverCheck3Button");
        let reciverCheck4Button = document.getElementById("reciverCheck4Button");
        let multipleErrorCheckButton = document.getElementById("multipleErrorCheckButton")

        this.userInput.addEventListener("keyup", this.userInputEventHandler.bind(this));
        addParityBitButton.addEventListener("click", this.addParityBitHandler.bind(this));
        showParityBitButton.addEventListener("click", this.toggleParityBitHandler.bind(this));

    }


    private userInputEventHandler() {
        this.CellList.setData(this.userInput.value)
        this.render();
    }

    private addParityBitHandler(event:Event) {
        this.sender.setCells(this.CellList)

        if(this.state.addParityBitButtonChecked) return;

        this.sender.addParityBits();
        this.CellList = this.sender.getCells();
        this.state.addParityBitButtonChecked = true;
        this.toggleActiveState(event.target);
        this.render();
    }

    private toggleParityBitHandler(event:Event) {
        this.sender.setCells(this.CellList)

        if(this.state.showParityBitButtonChecked) this.sender.removeParityBitStatus();
        else this.sender.setParityBitStatus();

        this.toggleActiveState(event.target);
        this.CellList = this.sender.getCells();
        this.render();
    }







    private toggleActiveState(target:EventTarget) {
        let element = <HTMLElement> target;
        if(element.classList.contains("active")) {
            element.classList.remove("active");
            element.classList.add("disabled");
        } else {
            element.classList.remove("disabled");
            element.classList.add("active");
        }
    }

    private render() {
        this.table = new Table(this.CellList);
        this.table.render(this.tableEle);
    }
}