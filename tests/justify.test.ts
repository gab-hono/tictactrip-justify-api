import { justify } from "../src/services/justify"

describe("justify", () => {
// TODO: A short line, less than 80 char. Returns 1 line
    it("A less than 80 character input should return a short line as-is. Last line rule applies", () => {
        const result = justify("Paris est une merveilleuse ville.");
        expect(result).toBe("Paris est une merveilleuse ville.");
    })


// TODO: Every non-final line is exactly 80 characters long


// TODO: Last line is not justified


// TODO: Only one word -> it doesn't brake the code


// TODO: empty string


// TODO: Many spaces between words


// TODO: A word (or expression) longuer than 80 characters


// TODO: A text with line-jumps (more that one paragraph)


//TODO: a line with just one justifiable word

})

