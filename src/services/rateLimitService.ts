const usageStore = new Map<string, { wordCount: number; date: string }>();

const DAILY_LIMIT = 80000;

function getTodayDate(): string {
    return new Date().toISOString().split("T")[0];
}

export function checkRateLimit(token: string): boolean {
    const usage = usageStore.get(token);
    const today = getTodayDate();


    /* If no usage yet, or usage is from a previous day, allow */
    if(!usage || usage.date !== today) return true;

    return usage.wordCount < DAILY_LIMIT;
}

export function incrementWordCount(token: string, wordCount: number): void {
    const usage = usageStore.get(token);
    const today = getTodayDate();

    if (!usage || usage.date !== today) {
        usageStore.set(token, { wordCount, date: today });
    } else {
        usageStore.set(token, { wordCount: usage.wordCount + wordCount, date: today })
    }
}