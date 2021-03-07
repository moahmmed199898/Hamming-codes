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
        this.sizeEle = document.getElementById("size");

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
        showIndexesInBinaryButton.addEventListener("click", this.toggleBinaryIndexesHandler.bind(this))
        showIndexesInBase10Button.addEventListener("click", this.toggleBase10IndexesHandler.bind(this))
        reciverCheck1Button.addEventListener("click", this.receiverCheck1Handler.bind(this))
        reciverCheck2Button.addEventListener("click", this.receiverCheck2Handler.bind(this))
        reciverCheck3Button.addEventListener("click", this.receiverCheck3Handler.bind(this))
        reciverCheck4Button.addEventListener("click", this.receiverCheck4Handler.bind(this))
        multipleErrorCheckButton.addEventListener("click", this.reciverMultipleErrorCheck.bind(this))

    }


    private userInputEventHandler() {
        this.CellList.setData(this.userInput.value)
        this.sizeEle.innerHTML = this.CellList.getSize().toString();
        this.render();
    }

    private addParityBitHandler(event:Event) {
        this.sender.setCells(this.CellList)

        if(this.state.addParityBitButtonChecked) return;

        this.sender.addParityBits();
        this.CellList = this.sender.getCells();
        this.state.addParityBitButtonChecked = true;
        this.toggleActiveState(event.target);
        this.render(event);
    }

    private toggleParityBitHandler(event:Event) {
        this.sender.setCells(this.CellList)

        if(this.state.showParityBitButtonChecked) this.sender.removeParityBitStatus();
        else this.sender.setParityBitStatus();

        this.toggleActiveState(event.target);
        this.CellList = this.sender.getCells();
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

    private receiverCheck1Handler(event:Event) {
        this.receiver = new HammingCodesReceiver(this.CellList);
        this.receiver.check1();
        this.CellList = this.receiver.getData();
        this.render(event)
    }
    
    private receiverCheck2Handler(event:Event) {
        this.receiver = new HammingCodesReceiver(this.CellList);
        this.receiver.check2();
        this.CellList = this.receiver.getData();
        this.render(event)
    }

    private receiverCheck3Handler(event:Event) {
        this.receiver = new HammingCodesReceiver(this.CellList);
        this.receiver.check3();
        this.CellList = this.receiver.getData();
        this.render(event)
    }

    private receiverCheck4Handler(event:Event) {
        this.receiver = new HammingCodesReceiver(this.CellList);
        this.receiver.check4();
        this.CellList = this.receiver.getData();
        this.render(event)
    }

    private reciverMultipleErrorCheck(event:Event) {
        this.receiver = new HammingCodesReceiver(this.CellList);
        this.receiver.twoErrorCheck();
        this.CellList = this.receiver.getData();
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
        this.table = new Table(this.CellList);
        this.table.render(this.tableEle);
    }
}