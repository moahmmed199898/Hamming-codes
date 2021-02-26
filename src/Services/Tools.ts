import Cell from "../Types/Cell";

export function countData(head:Cell) {
    let counter = 0;
    let curr:Cell = head;
    while(curr != null) {
        counter++;
        curr = curr.next;
    }
    console.log(counter)
}


export function logData(head:Cell) {
    let curr:Cell = head;
    while(curr != null) {
        console.log(curr.getData())
        curr = curr.next;
    }
}

export function binaryToText(head:Cell) {
    
}