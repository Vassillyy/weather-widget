<script lang="ts">
  import {DateTime} from 'luxon'
  import type {Forecast} from '@/entities/weatherForecast'
  import {Icon, ProgressBar} from '@/shared/ui'
  import {colors, backgroundColor} from '@/shared/lib'
  import HourCard from './HourCard.svelte'

  type Props = {
    dataForecast: Forecast | undefined
    error: boolean
  }

  let {dataForecast, error}: Props = $props()

  /** Ширина карточки */
  let widthCard: number | undefined = $state()
  /** Выбранный индекс карточки */
  let currentIndex: number = $state(0)
  /** Щаг при нажатии на кнопку сдвига карточек */
  let step: number = $state(0)
  /** Ширина списка карточек */
  let widthListCards: number | undefined = $state()
  /** Количество видимых карточек */
  let visibilityCards: number | undefined = $state()

  /** Цвет фона кнопки */
  const backgroundColorButton = $derived(
    $backgroundColor === colors.WHITE ? colors.LIGHT_CYAN : colors.GRAY_60
  )
  /** Цвет прогресс бара */
  const backgroundColorProgressBar = $derived(
    $backgroundColor === colors.WHITE ? colors.BLUE_60 : colors.WHITE
  )

  /**
   * Навигация по элементам с помощью клавишь.
   * @param event - событие нажатия клавиши.
   */
  const navigationWithArrows = (event: KeyboardEvent) => {
    const isRightArrow = event.key === 'ArrowRight'
    const isLeftArrow = event.key === 'ArrowLeft'

    if (isRightArrow && currentIndex < 24 - visibilityCards!) currentIndex++
    else if (isLeftArrow && currentIndex > 0) currentIndex--
  }

  /** Эффект для обновления значения шага при изменении ширины карточки */
  $effect(() => {
    if (widthCard) {
      step = currentIndex * -(widthCard + 5)
    }
  })

  /** Эффект для вычисления видимости карточек на основе ширины списка карточек */
  $effect(() => {
    if (widthListCards && widthCard) {
      visibilityCards = Math.floor(widthListCards / widthCard)
    }
  })

  /** Эффект для обновления текущего индекса на основе видимости карточек */
  $effect(() => {
    if (visibilityCards) {
      currentIndex =
        DateTime.local().hour > 24 - visibilityCards
          ? 24 - visibilityCards
          : DateTime.local().hour
    }
  })
</script>

<svelte:window on:keydown={(e) => navigationWithArrows(e)} />

<div class="list-little-cards">
  {#if dataForecast}
    <button
      class="list-little-cards__button list-little-cards__button_left"
      style="background-color: {backgroundColorButton}"
      onclick={() => (currentIndex -= 1)}
      disabled={currentIndex === 0}
    >
      {#if currentIndex !== 0}
        <Icon name="arrowLeft" />
      {/if}
    </button>

    <button
      class="list-little-cards__button list-little-cards__button_right"
      style="background-color: {backgroundColorButton}"
      onclick={() => (currentIndex += 1)}
      disabled={!!visibilityCards && currentIndex >= 24 - visibilityCards}
    >
      {#if visibilityCards && currentIndex < 24 - visibilityCards}
        <Icon name="arrowRight" />
      {/if}
    </button>

    <div class="list-little-cards__active">
      <div
        class="list-little-cards__list"
        bind:clientWidth={widthListCards}
        style={`transform: translateX(${step}px)`}
      >
        {#each Array.from({length: 24}) as _, index}
          <div class="list-little-cards__card">
            <HourCard
              update={(width) => (widthCard = width)}
              {dataForecast}
              {index}
            />
          </div>
        {/each}
      </div>
    </div>
  {:else if error}
    <img
      class="list-little-cards__image-error"
      src="static/errorTab.jpg"
      alt="Иконка"
    />
  {:else}
    <div class="list-little-cards_loading">
      <ProgressBar color={backgroundColorProgressBar} />
    </div>
  {/if}
</div>

<style lang="sass">
  .list-little-cards
    position: relative
    display: flex
    justify-content: center
    &_loading
      width: 25%
      margin: 20px 0
    &__button
      border: none
      top: 50%
      position: absolute
      transform: translateY(-50%)
      width: 30px
      height: 80px
      border-radius: 10px
      &:active
        transform: translateY(-50%) scale(0.9)
      &:disabled
        cursor: not-allowed
        opacity: 0.5
    &__button_left
      left: 0
    &__button_right
      right: 0
    &__active
      overflow: hidden
      width: calc(100% - 70px)
    &__list
      display: flex
      gap: 5px
      transition: transform 0.5s ease-out
    &__card
      width: calc((100% - 25px) / 6)
      flex-shrink: 0
    &__image-error
      width: 80%
      border: 4px solid red
      border-radius: 30px

  @media (max-width: 1150px)
    .list-little-cards__card
      width: calc((100% - 20px) / 5)

  @media (max-width: 950px)
    .list-little-cards__card
      width: calc((100% - 15px) / 4)

  @media (max-width: 800px)
    .list-little-cards
      &__button
        width: 20px
        height: 60px
      &__button_left
        left: 10px
      &__button_right
        right: 10px

  @media (max-width: 650px)
    .list-little-cards__card
      width: calc((100% - 10px) / 3)
</style>
