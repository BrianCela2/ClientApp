export function formatDateTimeToDate(dateString: string): string {
    const date = new Date(dateString);
    
    const offsetMs = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offsetMs);
    
    return localDate.toISOString().split('T')[0];
}
