import { encode } from "./encode";

const code = encode("hello word");
for (let r = 0; r < 6; r++) {
    let s = "";
    const cols = code.length / 6;
    for (let c = 0; c < cols; c++) {
        s += code[r * cols + c] ? "██" : "░░";
    }
    console.log(s);
}
