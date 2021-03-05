import Table from "./Components/Table";
import HammingCodesReceiver from "./Services/HammingCodesReceiver"
import HammingCodesSender from "./Services/HammingCodesSender";
import { BinaryDigit } from "./Types/Binary";
import Cell from "./Types/Cell";
import '@fortawesome/fontawesome-free/css/all.css'
import "./styles.scss";
import ClientHandler from "./ClientHandler";

//keeping the glopal scope clean
    new ClientHandler();