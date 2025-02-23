interface FormattedDateFn {
  (str: string): string
}

/** Получаем отформатированную дату */
export const getFormattedDate: FormattedDateFn = (str) => {
  let [month, number, day]: string[] = str.split(' ')
  month = month[0].toUpperCase() + month.slice(1)
  day = day[0].toUpperCase() + day.slice(1)
  return `${month} ${number} ${day}`
}
