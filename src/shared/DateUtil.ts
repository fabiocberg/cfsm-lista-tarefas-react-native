export function dateFormatted(date?: Date): string {
  if (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const mintues = date.getMinutes();
    // 01/12/2021 09:00
    // 1/12/2021 9:0
    const dayString = day > 9 ? day : `0${day}`;
    const monthString = month > 9 ? month : `0${month}`;
    const hourString = hour > 9 ? hour : `0${hour}`;
    const minutesString = mintues > 9 ? mintues : `0${mintues}`;

    return `${dayString}/${monthString}/${year} ${hourString}:${minutesString}`;
  }
  return "";
}

export function dateToDatabaseString(date: Date): string {
  // yyyy-MM-dd HH:mm:ss
  return date.toJSON().slice(0, 19).replace("T", " ");
}

export function stringToDate(dateString: string): Date {
  return new Date(dateString.replace(" ", "T"));
}
