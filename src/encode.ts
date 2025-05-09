const rows = 6;
const cols = 7;

export const encode = (text: string) => {
    text += " ".repeat(cols - (text.length % cols));
    const len = text.length;
    const cound = len / cols;
    const res = new Uint8Array((cols * 2 + 3) * cound * rows + 3 * rows);
    let c = 0;
    for (let r = 0; r < rows; r++) {
        for (let i = 0; i < cound; i++) {
            if (i === 0) {
                res[c + 0] = 0;
                res[c + 1] = r === 1 || r === rows - 2 ? 0 : 1;
                res[c + 2] = 0;
                c += 3;
            }
            for (let j = 0; j < cols; j++) {
                if (r === 0 || r === rows - 1) {
                    res[c + 0] = 1;
                    res[c + 1] = 0;
                } else {
                    const index = i * cols + j;
                    const unicode = text.charCodeAt(index);
                    const binary = unicode.toString(2).padStart(8, "0");
                    const a = (r - 1) * 2;
                    const b = binary.slice(a, a + 2);
                    res[c + 0] = parseInt(b[0]) as any;
                    res[c + 1] = parseInt(b[1]) as any;
                }
                c += 2;
            }
            res[c + 0] = 1;
            res[c + 1] = r === 1 || r === rows - 2 ? 1 : 0;
            res[c + 2] = 1;
            c += 3;
        }
    }
    return res;
    // const len = text.length;
    // const res = new Uint8Array((len * 8) + (7 * 4));
    // for (let i = 0; i < len; i++) {
    //     const unicode = text.charCodeAt(i);
    //     const binary = unicode.toString(2).padStart(8, "0");
    //     for (let j = 0; j < 8; j++) {
    //         res[i * 8 + j] = parseInt(binary[j]);
    //     }
    // }
    // return res;
};
