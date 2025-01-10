<script lang="ts">
  import type {Forecast} from '@/entities/weatherForecast'
  import {Icon, ProgressBar} from '@/shared/ui'
  import {colors, backgroundColor} from '@/shared/lib'
  import DayCard from './DayCard.svelte'

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

  /** Эффект для обновления значения шага при изменении ширины карточки */
  $effect(() => {
    if (widthCard) {
      step = currentIndex * -(widthCard + 5)
    }
  })

  /** Эффект для вычисления видимости карточек на основе ширины списка карточек */
  $effect(() => {
    if (widthListCards && widthCard) {
      visibilityCards = Math.floor(widthListCards / +widthCard.toFixed(0))
    }
  })

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
</script>

<svelte:window on:keydown={(e) => navigationWithArrows(e)} />

<div class="list-big-cards">
  {#if dataForecast}
    {#if currentIndex !== 0}
      <button
        class="list-big-cards__button list-big-cards__button_left"
        style="background-color: {backgroundColorButton}"
        onclick={() => (currentIndex -= 1)}
      >
        <Icon name="arrowLeft" />
      </button>
    {/if}

    {#if visibilityCards && currentIndex < 3 - visibilityCards}
      <button
        class="list-big-cards__button list-big-cards__button_right"
        style="background-color: {backgroundColorButton}"
        onclick={() => (currentIndex += 1)}
      >
        <Icon name="arrowRight" />
      </button>
    {/if}

    <div class="list-big-cards__active">
      <div
        class="list-big-cards__list"
        bind:clientWidth={widthListCards}
        style={`transform: translateX(${step}px)`}
      >
        {#each Array.from({length: 3}) as _, index}
          <div class="list-big-cards__card">
            <DayCard
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
      class="list-big-cards__image-error"
      src="static/errorTab.jpg"
      alt="Иконка"
    />
  {:else}
    <div class="list-big-cards_loading">
      <ProgressBar color={backgroundColorProgressBar} />
    </div>
  {/if}
</div>

<style lang="sass">
  .list-big-cards
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
      align-items: stretch
      gap: 5px
      transition: transform 0.5s ease-out
    &__card
      width: calc((100% - 10px) / 3)
      display: flex
      flex-direction: column
      flex-shrink: 0
    &__image-error
      width: 80%
      border: 4px solid var(--light-red)
      border-radius: 30px

  @media (max-width: 1150px)
    .list-big-cards__card
        width: calc((100% - 5px) / 2)

  @media (max-width: 800px)
    .list-big-cards
      &__button
        width: 20px
        height: 60px
      &__button_left
        left: 10px
      &__button_right
        right: 10px

  @media (max-width: 630px)
    .list-big-cards__card
        width: calc(100%)
</style>
