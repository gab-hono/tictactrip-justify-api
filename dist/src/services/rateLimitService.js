"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRateLimit = checkRateLimit;
exports.incrementWordCount = incrementWordCount;
const usageStore = new Map();
const DAILY_LIMIT = 80000;
function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}
function checkRateLimit(token) {
    const usage = usageStore.get(token);
    const today = getTodayDate();
    /* If no usage yet, or usage is from a previous day, allow */
    if (!usage || usage.date !== today)
        return true;
    return usage.wordCount < DAILY_LIMIT;
}
function incrementWordCount(token, wordCount) {
    const usage = usageStore.get(token);
    const today = getTodayDate();
    if (!usage || usage.date !== today) {
        usageStore.set(token, { wordCount, date: today });
    }
    else {
        usageStore.set(token, { wordCount: usage.wordCount + wordCount, date: today });
    }
}
