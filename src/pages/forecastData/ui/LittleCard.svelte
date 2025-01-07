<script lang="ts">
  import {onMount} from 'svelte'
  import type {Forecast} from '@/entities/weatherForecast'
  import {gradientColor, tempUnit} from '@/shared/lib'
  import {i18n} from '@/shared/i18n'
  import {getDataForecast} from '../model/getDataForecast'
  import {getCodeIconHours} from '../model/getCodeIconHours'

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
  /** Ощущаемая температура */
  let filtTemp: number = $state(0)
  /** Температура */
  let temp: number = $state(0)
  /** Шапка карточки */
  let titleCard: string[] | string = $state('')

  /** Обновление ширины карточки*/
  const updateWidth = (): void => {
    if (element) {
      widthElement = element.getBoundingClientRect().width
      if (widthElement) update(widthElement)

      window.removeEventListener('resize', updateWidth)
    }
  }
  /** Получаем данные для карточки погоды */
  const getData = () => {
    const data = getDataForecast(dataForecast, index)

    filtTemp = data.filtTemp
    temp = data.temp
    titleCard = data.titleCard
  }

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

<div
  class="little-card"
  bind:this={element}
  style="background-image: {$gradientColor}"
>
  <span class="little-card__time">{titleCard}</span>
  <img
    class="little-card__icon"
    src={`static/${getCodeIconHours(dataForecast, index)}.png`}
    alt="Иконка"
  />
  <div class="little-card__temp">{temp} {$tempUnit}</div>
  <div class="little-card__filt-temp">
    <div>{i18n.get('feels_like')}</div>
    <div>{filtTemp} {$tempUnit}</div>
  </div>
</div>

<style lang="sass">
  .little-card
    padding-top: 5px
    padding-right: 5px
    padding-left: 5px
    display: flex
    border-radius: 30px
    flex-direction: column
    align-items: center
    justify-content: center
    color: var(--white)
    &__time
      font-size: 35px
      line-height: 1
      margin-top: 10px
    &__icon
      width: 100%
    &__temp
      font-size: 40px
      line-height: 1
    &__filt-temp
      font-size: 18px
      line-height: 1
      margin: 10px 5px 25px
      text-align: center

  @media (max-width: 850px)
    .little-card
      &__time
        font-size: 28px
      &__temp
        font-size: 30px

  @media (max-width: 600px)
    .little-card
      &__filt-temp
        font-size: 16px

  @media (max-width: 450px)
    .little-card
      &__time
        font-size: 18px
      &__temp
        font-size: 20px
      &__filt-temp
        font-size: 14px

  @media (max-width: 380px)
    .little-card
      &__time
        font-size: 16px
      &__temp
        font-size: 18px
      &__filt-temp
        font-size: 12px
</style>
