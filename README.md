# tictactrip-justify-api

A REST API that justifies text to a line width of 80 characters, with token-based authentication and a daily rate limit of 80,000 words per token.

## Tech Stack

- Node.js / TypeScript
- Express
- Jest / Supertest

## Installation

```bash
git clone https://github.com/gab-hono/tictactrip-justify-api.git
cd tictactrip-justify-api
npm install
npm run dev
```

## API Reference

### POST /api/token

Returns a unique token for a given email address.

**Request**
```json
Content-Type: application/json

{ "email": "foo@bar.com" }
```

**Response**
```json
{ "token": "your-token-here" }
```

**curl example**
```bash
curl -X POST http://localhost:3000/api/token \
  -H "Content-Type: application/json" \
  -d '{"email": "foo@bar.com"}'
```

---

### POST /api/justify

Justifies the provided plain text to 80 characters per line.

**Request**
Content-Type: text/plain
Authorization: Bearer <your-token>
Your text to justify goes here.

**Response**
Content-Type: text/plain
Your justified text, with each non-final line
padded to exactly 80 characters.

**curl example**
```bash
curl -X POST http://localhost:3000/api/justify \
  -H "Authorization: Bearer your-token-here" \
  -H "Content-Type: text/plain" \
  -d "The text you want to justify goes here and it should be long enough to wrap."
```

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad request — missing or invalid email, or empty body |
| 401 | Unauthorized — missing or invalid token |
| 402 | Payment Required — daily limit of 80,000 words exceeded |

## Technical Decisions

**In-memory storage**: Tokens and usage counters are stored in memory using JavaScript `Map` objects. This keeps the implementation simple and dependency-free, which is appropriate for this exercise. In a production environment, a persistent store like Redis would be used.

**Rate limiting**: Each token tracks a word count and the date of last use. If the date has changed since the last request, the counter resets automatically. If the daily limit of 80,000 words is exceeded, the API returns a `402 Payment Required` error.

**Words longer than 80 characters**: If a single word exceeds the line width, it is placed alone on its own line without truncation or hyphenation. Hyphenation is a complex typographic problem outside the scope of this exercise.

**Justification algorithm**: Spaces are distributed evenly between words. When the total number of spaces is not exactly divisible by the number of gaps, the extra spaces are distributed from left to right — one extra space per gap until the remainder is used up. The last line of any text is never justified, following standard typographic convention.

## Tests

```bash
npm test
```

Two test suites covering:
- `justify.test.ts` — unit tests for the justification algorithm (edge cases: empty string, single word, multiple spaces, line breaks, words over 80 characters)
- `api.test.ts` — integration tests for both endpoints (authentication, rate limiting, response format)