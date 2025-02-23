interface BanFn {
  (event: InputEvent): void
}

/**
 * Не допускаем ввод цифр и спец. символов.
 * @param event событие ввода.
 */
export const inputBan: BanFn = (event) => {
  if (event.data && /[^\p{L}\s-]/u.test(event.data)) {
    event.preventDefault()
  }
}
