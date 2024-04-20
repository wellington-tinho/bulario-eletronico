export function FormatDate(date: string): string {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleString('pt-BR', { timeZone: 'UTC' });
  return formattedDate.replace(/,/g, '');
}