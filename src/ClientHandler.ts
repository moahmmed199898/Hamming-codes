import Table from "./Components/Table";
import HammingCodesReceiver from "./Services/HammingCodesReceiver";
import HammingCodesSender from "./Services/HammingCodesSender";
import { logData } from "./Services/Tools";
import CellList from "./Types/CellList";

export default class ClientHandler {
    private userInput:HTMLInputElement; 
    private output:HTMLElement;
    private tableEle:HTMLElement;
    private sizeEle:HTMLElement

    private cellList:CellList;
    private sender:HammingCodesSender;
    private receiver:HammingCodesReceiver;
    private table: Table;

    private state = {
        addParityBitButtonChecked: false,
        showParityBitButtonChecked: false,
        showIndexesInBinaryButtonChecked: false,
        showIndexesInBase10ButtonChecked: false,
        multipleErrorCheckButtonChecked: false,

    }
    

    constructor() {
        this.setupProperties();
        this.setUpEventHandlers();
        this.userInputEventHandler();
        this.setUpReceiverChecks();
    }
    
    private setupProperties() {
        this.userInput = <HTMLInputElement> document.getElementById("userInput");
        this.output = document.getElementById("output");
        this.tableEle = document.querySelector("#tables #sender");
        this.sizeEle = document.getElementById("size");

        this.cellList = new CellList();
        this.receiver = new HammingCodesReceiver(this.cellList);
        this.sender = new HammingCodesSender(this.userInput.value);
        this.table = new Table(this.cellList);

    }

    private setUpEventHandlers() {


        let addParityBitButton = document.getElementById("addParityBitButton");
        let showParityBitButton = document.getElementById("showParityBitButton");
        let showIndexesInBinaryButton = document.getElementById("showIndexesInBinaryButton");
        let showIndexesInBase10Button = document.getElementById("showIndexesInBase10Button");
        let multipleErrorCheckButton = document.getElementById("multipleErrorCheckButton")

        this.userInput.addEventListener("keyup", this.userInputEventHandler.bind(this));
        addParityBitButton.addEventListener("click", this.addParityBitHandler.bind(this));
        showParityBitButton.addEventListener("click", this.toggleParityBitHandler.bind(this));
        showIndexesInBinaryButton.addEventListener("click", this.toggleBinaryIndexesHandler.bind(this))
        showIndexesInBase10Button.addEventListener("click", this.toggleBase10IndexesHandler.bind(this))
        multipleErrorCheckButton.addEventListener("click", this.reciverMultipleErrorCheck.bind(this))

    }

    private setUpReceiverChecks() {
        const receiverOptionsELe = document.getElementById("receiverOptions")
        this.receiver = new HammingCodesReceiver(this.cellList);
        let checksCount = this.receiver.getChecksCount();
        for(let i = 0; i<checksCount; i++) {
            let checkSpanEle = document.createElement("span");
            checkSpanEle.classList.add("disabled");
            checkSpanEle.innerText = `Receiver Check ${i}`
            checkSpanEle.addEventListener("click", (e) => this.receiverCheckHandler(i,e));
            receiverOptionsELe.appendChild(checkSpanEle);
        }

    }

    private userInputEventHandler() {
        this.cellList.setData(this.userInput.value)
        this.render();
    }

    private addParityBitHandler(event:Event) {
        this.sender.setCells(this.cellList)

        if(this.state.addParityBitButtonChecked) return;

        this.sender.addParityBits();
        this.cellList = this.sender.getCells();
        this.state.addParityBitButtonChecked = true;
        this.toggleActiveState(event.target);
        this.render(event);
    }

    private toggleParityBitHandler(event:Event) {
        this.sender.setCells(this.cellList)

        if(this.state.showParityBitButtonChecked) this.sender.removeParityBitStatus();
        else this.sender.setParityBitStatus();

        this.toggleActiveState(event.target);
        this.cellList = this.sender.getCells();
        this.render(event);
    }

    private toggleBinaryIndexesHandler(event:Event) {
        if(this.state.showIndexesInBase10ButtonChecked) this.toggleActiveState(document.getElementById("showIndexesInBase10Button"))
        this.table.toggleShowBinaryIndex();
        this.state.showIndexesInBinaryButtonChecked = !this.state.showIndexesInBinaryButtonChecked;
        this.toggleActiveState(event.target);
        this.table.render(this.tableEle);
    }

    private toggleBase10IndexesHandler(event:Event) {
        if(this.state.showIndexesInBinaryButtonChecked) this.toggleActiveState(document.getElementById("showIndexesInBinaryButton"))
        this.table.toggleShowBase10Index();
        this.state.showIndexesInBase10ButtonChecked = !this.state.showIndexesInBase10ButtonChecked;
        this.toggleActiveState(event.target);
        this.table.render(this.tableEle);
    }

    private receiverCheckHandler(checkNumber:number, event:Event) {
        this.receiver = new HammingCodesReceiver(this.cellList);
        this.receiver.runTest(checkNumber);
        this.cellList = this.receiver.getData();
        this.render(event)
    }


    private reciverMultipleErrorCheck(event:Event) {
        this.receiver = new HammingCodesReceiver(this.cellList);
        this.receiver.twoErrorCheck();
        this.cellList = this.receiver.getData();
        this.render(event)
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

    private render(event?:Event) {
        if(event != null) this.toggleActiveState(event.target)
        this.table = new Table(this.cellList);
        this.sizeEle.innerHTML = this.cellList.getSize().toString();
        this.table.render(this.tableEle);
    }
}