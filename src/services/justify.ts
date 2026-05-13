export function justify(text: string): string {
    
    const words = text.split(/\s+/).filter(w => w.length > 0); // Filter is in case we receive empty strings (it eliminates them)
    const lineWidth = 80;
    const lines: string[] = [];

    /* currentLine counts words. currentLength counts characters */
    let currentLine: string[] = [];
    let currentLength = 0;

    for (const word of words) {
        const spaceNeeded = currentLine.length > 0 ? 1 : 0;
        if (currentLength + spaceNeeded + word.length > lineWidth) {
            lines.push(currentLine.join(" "));
            currentLine = [word];
            currentLength = word.length;
        } else {
            currentLine.push(word);
            currentLength += spaceNeeded + word.length;
        }
    }

    /* Push remaining words as the last (unjustified) line */
    if (currentLine.length > 0) lines.push(currentLine.join(" "));

    return lines.map((line, index) => {

            /* last line doesn't need to be justified */
            const isLastLine = index === lines.length -1;
            if (isLastLine) return line;
            return justifyLine(line, lineWidth);
        }).join("\n");
    
}

function justifyLine(line: string, width: number): string {

    const words = line.split(" ");
    if (words.length === 1) {
        return words[0];
    }

    const totalSpaces = width - words.reduce((sum, w) => sum + w.length, 0);
    const gaps = words.length - 1;
    const spacePerGap = Math.floor(totalSpaces / gaps);
    const extraSpaces = totalSpaces % gaps;
    /* if spaces are not exactly divisible they're distributed from left to right */

    return words.reduce((result, word, i) => {
        if (i === 0) return word;
            
        const spaces = spacePerGap + (i <= extraSpaces ? 1 :0 );
        return result + " ".repeat(spaces) + word;
    }, "")
    
}