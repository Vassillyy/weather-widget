<script lang="ts">
  import {fly} from 'svelte/transition'
  import {searchCity} from '@/entities/city'
  import {chosenCity} from '@/entities/city'
  import {backgroundColor, colors} from '@/shared/lib'
  import {Button, Icon} from '@/shared/ui'

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

  // let list: any = $state([])

  // const x = async (val: any) => {
  //   list = await searchCity(val)
  // }
</script>

<svelte:window onclick={(e) => closeInput(e)} />

<form class="search" bind:this={searchElement}>
  {#if isActive}
    <input
      type="text"
      class="search__input"
      class:search__input_active={isActive}
      placeholder={showPlaceholder ? 'Введите город' : ''}
      style="border-color: {colorBorder}; color: {colorText}"
      transition:fly={{x: 15, duration: 600}}
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
    box-sizing: border-box
    position: relative
    display: flex
    justify-content: flex-end
    align-items: center
    &__input
      position: absolute
      right: 0
      box-sizing: border-box
      border-radius: 50%
      border-width: 3px
      border-style: solid
      padding: 0
      height: 60px
      background-color: transparent
      &:focus
        outline: none
      &_active
        font-size: 25px
        border-radius: 20px
        width: 250px
        padding-right: 70px
        padding-left: 15px
    &__button
      z-index: 2

  @media (max-width: 760px)
    .search
      &__input
        font-size: 18px
        height: 50px
        &_active
          width: 200px

  @media (max-width: 370px)
    .search
      &__input
        border-radius: 15px
        font-size: 14px
        height: 40px
        &_active
          width: 150px
          padding-right: 35px
          padding-left: 7px
</style>
