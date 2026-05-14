import { justify } from "../src/services/justify"

describe("justify", () => {
// OK: A short line, less than 80 char. Returns 1 line
    it("A less than 80 character input should return a short line as-is. Last line rule applies", () => {
        const result = justify("Paris est une merveilleuse ville.");
        expect(result).toBe("Paris est une merveilleuse ville.");
    })


// OK: Every non-final line is exactly 80 characters long
    it("each non-last line should be exactly 80 charachters wide", () => {
        const text = "La dernière fois que j'ai voyagé c'était au Chili pour voir ma famille. Je suis allé en avion et tout s'est très bien passé.";
        const lines = justify(text).split("\n");
        const nonLastLines = lines.slice(0, -1);
        nonLastLines.forEach(line => {
            expect(line.length).toBe(80)
        })
    })


// OK: Last line is not justified
    it("last line should not be justified", () => {
        const text = "La dernière fois que j'ai voyagé c'était au Chili pour voir ma famille. Je suis allé en avion et tout s'est très bien passé."
        const lines = justify(text).split("\n");
        const lastLine = lines[lines.length - 1];
        expect(lastLine.length).toBeLessThan(80);
    })


// OK: Only one word -> it doesn't brake the code
    it("should handle a sigle word", () => {
        expect(justify("Bonjour")).toBe("Bonjour");
    })


// OK: empty string
    it("should handle an empty string", () => {
        expect(justify("")).toBe("");
    })


// OK: Many spaces between words
    it("should normalize multiple spaces between words", () => {
        const result = justify("Paris    est     une   ville             merveilleuse");
        expect(result).toBe("Paris    est     une   ville             merveilleuse".replace(/\s+/g, " ").trim());
    })


// OK: A word (or expression) longuer than 80 characters
    it("a word longer than 80 characters should be placed alone on its line", () => {
        const word = "supercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocious"
        const lines = justify(word).split("\n");
        expect(lines[0]).toBe(word);
    })

// OK: A text with line breaks — \n should be treated as whitespace
    it("should handle text with line breaks between words", () => {
        const text = "Paris est\nune\nville\nMerveilleuse et je\nme sens chez moi \nquand je\n suis à Paris.";
        const result = justify(text);
        expect(result).not.toContain("\n\n");
        const lines = result.split("\n");
        lines.slice(0, -1).forEach(line => {
            expect(line.length).toBeLessThan(81);
        });
    })
})

