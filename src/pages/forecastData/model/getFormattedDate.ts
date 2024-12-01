/** Получаем отформатированную дату */
export const getFormattedDate = (str: string): string => {
  let [month, number, day]: string[] = str.split(' ') as string[]
  month = month[0].toUpperCase() + month.slice(1)
  day = day[0].toUpperCase() + day.slice(1)
  return `${month} ${number} ${day}`
}
