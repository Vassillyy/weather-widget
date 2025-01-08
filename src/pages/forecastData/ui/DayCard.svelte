<script lang="ts">
  import {onMount} from 'svelte'
  import type {Forecast} from '@/entities/weatherForecast'
  import {gradientColor, tempUnit} from '@/shared/lib'
  import {Icon} from '@/shared/ui'
  import {i18n} from '@/shared/i18n'
  import {getCodeIconDays} from '../model/getCodeIconDay'
  import {getForecastBigCardData} from '../model/getForecastBigCard'

  type Props = {
    dataForecast: Forecast
    update: (width: number) => void
    index: number
  }

  let {dataForecast, update, index}: Props = $props()

  /** Ссылка на элемент DOM */
  let element: HTMLElement | undefined = $state()
  /** Ширина элемента карточки */
  let widthElement: number | undefined = $state()
  /** Обозначение данного дня карточки */
  let day: string | undefined = $state()
  /**  Статус погоды */
  let statusWeather: string | undefined = $state()
  /** Температура */
  let temp: number | undefined = $state()
  /** Вероятность дождя */
  let chanceRain: number | undefined = $state()
  /** Вероятность снега */
  let chanceSnow: number | undefined = $state()

  /** Обновление ширины карточки*/
  const updateWidth = (): void => {
    if (element) {
      widthElement = element.getBoundingClientRect().width
      if (widthElement) update(widthElement)

      window.removeEventListener('resize', updateWidth)
    }
  }

  /** Получаем данные для карточки погоды */
  const getData = (): void => {
    const data = getForecastBigCardData(dataForecast, index)

    day = data.day
    statusWeather = data.statusWeather
    temp = data.temp
    chanceRain = data.chanceRain
    chanceSnow = data.chanceSnow
  }

  /** Эффект для обновления данных карточки при изменении единицы измерения температуры */
  $effect(() => {
    if ($tempUnit) getData()
  })

  onMount(() => {
    updateWidth()
    getData()

    window.addEventListener('resize', () => {
      updateWidth()
    })

    return () => {
      window.removeEventListener('resize', () => {
        updateWidth()
      })
    }
  })
</script>

<div class="big-card" bind:this={element} style="background: {$gradientColor}">
  <div class="big-card__header">
    <div>
      {index === 0
        ? i18n.get('today')
        : index === 1
          ? i18n.get('tomorrow')
          : i18n.get('in_two_days')}
    </div>
    <div>{day}</div>
  </div>
  <div class="big-card__status">{statusWeather}</div>
  <div class="big-card__body">
    <img
      class="big-card__image"
      src={`static/${getCodeIconDays(dataForecast, index)}.png`}
      alt="Иконка"
    />
    <div class="big-card__info">
      <div class="big-card__info-main">{temp} {$tempUnit}</div>
      <div class="big-card__info-item">
        <div class="big-card__info-icon">
          <Icon name="rain" />
        </div>
        {chanceRain} %
      </div>
      <div class="big-card__info-item">
        <div class="big-card__info-icon">
          <Icon name="snowflake" />
        </div>
        {chanceSnow} %
      </div>
    </div>
  </div>
</div>

<style lang="sass">
  .big-card
    height: 100%
    padding: 5px
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    border-radius: 35px
    color: var(--white)
    &__header
      display: flex
      justify-content: center
      gap: 20px
      font-size: 30px
      padding-top: 10px
    &__status
      margin: 5px
      font-size: 34px
      line-height: 1
      text-align: center
    &__body
      display: flex
      justify-content: center
      gap: 20px
    &__image
      width: 50%
    &__info
      &-main
        margin-top: 15px
        font-size: 55px
      &-item
        margin-top: 5px
        font-size: 30px
        display: flex
        align-items: center
        gap: 10px
      &-icon
        width: 40px
        height: 40px

  @media (max-width: 1000px)
    .big-card
      &__header
        font-size: 25px
      &__status
        font-size: 30px

  @media (max-width: 900px)
    .big-card
      &__info-main
        font-size: 45px

  @media (max-width: 800px)
    .big-card
      &__header
        font-size: 20px
      &__status
        font-size: 25px
      &__info
        &-main
          font-size: 36px
        &-item
          font-size: 25px
        &-icon
          width: 30px
          height: 30px

  @media (max-width: 630px)
    .big-card
      &__header
        font-size: 22px
      &__status
        font-size: 26px
      &__info
        &-main
          font-size: 30px
        &-item
          font-size: 22px

  @media (max-width: 580px)
    .big-card
      &__header
        font-size: 22px
      &__status
        font-size: 26px
      &__image
        width: 40%
      &__info
        &-main
          font-size: 30px
        &-item
          font-size: 22px
        &-icon
          width: 30px
          height: 30px

  @media (max-width: 450px)
    .big-card
      &__header
        font-size: 19px
      &__status
        font-size: 22px
      &__info
        &-main
          font-size: 25px
        &-item
          font-size: 20px
</style>
