/**
 * Не допускаем ввод цифр и спец. символов.
 * @param event событие ввода.
 */
export const inputBan = (event: InputEvent) => {
  if (event.data && /[^\p{L}\s-]/u.test(event.data)) {
    event.preventDefault()
  }
}
