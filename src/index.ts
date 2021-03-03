import Table from "./Components/Table";
import HammingCodesReceiver from "./Services/HammingCodesReceiver"
import HammingCodesSender from "./Services/HammingCodesSender";
import { BinaryDigit } from "./Types/Binary";
import Cell from "./Types/Cell";
import '@fortawesome/fontawesome-free/css/all.css'
import "./styles.scss";

let table;

const sender:HTMLElement = <HTMLElement> document.getElementById("sender");
const reciver:HTMLElement = <HTMLElement> document.getElementById("reciver");

const hammingCodes = new HammingCodesSender("H");
let data = hammingCodes.getCells()
table = new Table(data);
table.render(sender);

const hammingCodesReciver = new HammingCodesReceiver(data);
hammingCodesReciver.checkData();
data = hammingCodesReciver.getData();
table = new Table(data);
table.render(reciver);