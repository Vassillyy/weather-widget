<script lang="ts">
  import {backgroundColor, colors} from '@/shared/lib'
  import {Button, Icon} from '@/shared/ui'
  import {fly} from 'svelte/transition'

  /** Значение input-а */
  let inputValue: string = $state('')
  /**  Активное состояние input поля. */
  let isActive: boolean = $state(false)
  /** Неактивное состояние кнопки */
  let disabledButton: boolean = $state(false)
  /** Состояние placeholder. */
  let showPlaceholder: boolean = $state(false)
  /** Элемент HTML, представляющий форму поиска. */
  let searchElement: HTMLElement | null = $state(null)
  /** Элемент HTML, представляющий input. */
  let inputElement: HTMLElement | null = $state(null)
  /**
   * Скрываем input.
   * @param event - событие клика мыши.
   */
  const closeInput = (event: MouseEvent): void => {
    if (
      event.target instanceof Node &&
      searchElement &&
      !searchElement.contains(event.target)
    ) {
      isActive = false
      inputValue = ''
    }
  }
  /** Дейсвие по клику (или открываем input или ищем город) */
  const clickAction = (): void => {
    isActive ? searchSity() : (isActive = true)
  }
  /** Поиск города */
  const searchSity = (): void => {
    console.log('Ищем нужный город')
  }
  /** Цвет обводки. */
  const colorBorder: string = $derived(
    $backgroundColor === colors.WHITE ? colors.BLUE_60 : colors.WHITE
  )
  /** Цвет текста в поле. */
  const colorText: string = $derived(
    $backgroundColor === colors.WHITE ? colors.BLUE_60 : colors.WHITE
  )
</script>

<svelte:window onclick={(e) => closeInput(e)} />

<form class="search" bind:this={searchElement}>
  {#if isActive}
    <input
      type="text"
      class="search__input"
      class:search__input_active={isActive}
      style="border-color: {colorBorder}; color: {colorText}"
      transition:fly={{x: 250, duration: 600}}
      onintrostart={() => {
        showPlaceholder = false
        disabledButton = true
      }}
      onintroend={() => {
        showPlaceholder = true
        disabledButton = false
        if (inputElement) {
          inputElement.focus()
        }
      }}
      onoutrostart={() => {
        showPlaceholder = false
        disabledButton = true
      }}
      onoutroend={() => (disabledButton = false)}
      bind:value={inputValue}
      bind:this={inputElement}
    />
  {/if}
  {#if showPlaceholder && !inputValue}
    <span class="search__placeholder" style="color: {colorText}"
      >Введите город</span
    >
  {/if}
  <div class="search__button">
    <Button disabled={disabledButton} onclick={clickAction}>
      {#snippet icon()}
        <Icon name="search" />
      {/snippet}
    </Button>
  </div>
</form>

<style lang="sass">
  .search
    position: relative
    display: flex
    justify-content: flex-end
    align-items: center
    width: 250px
    overflow: hidden
    &__input
      position: absolute
      right: 0
      box-sizing: border-box
      border-radius: 50%
      border-width: 3px
      border-style: solid
      padding: 0
      width: 60px
      height: 60px
      transition: width 0.3s ease
      background-color: transparent
      &:focus
        outline: none
      &_active
        font-size: 25px
        border-radius: 20px
        width: 100%
        padding: 6px 70px 6px 15px
    &__button
      z-index: 2
    &__placeholder
      position: absolute
      left: 0
      padding-left: 20px
      font-size: 20px
      font-weight: 500
      letter-spacing: 1px
</style>
