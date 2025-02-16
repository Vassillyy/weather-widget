<script lang="ts">
  import type {Forecast} from '@/entities/weatherForecast'
  import {TableData} from '@/entities/weatherForecast'
  import {chosenCity} from '@/entities/city'
  import {searchMyCity} from '@/entities/city'
  import {Tabs} from '@/features/tabs'
  import {colors, backgroundColor} from '@/shared/lib'
  import {Button, Tooltip} from '@/shared/ui'
  import {i18n} from '@/shared/i18n'
  import TemperatureNow from './TemperatureNow.svelte'
  import ForecastDataHeader from './ForecastDataHeader.svelte'
  import ListHourCards from './ListHourCards.svelte'
  import ListDayCards from './ListDayCards.svelte'
  import {getForecastForCity} from '../model/getForecastForCity'

  /** Данные о прогнозе */
  let dataForecast: Forecast | undefined = $state.raw()
  /** Ошибка при получении данных о прогнозе */
  let error: boolean = $state(false)
  /** День или ночь */
  let isDay: boolean | undefined = $state()
  /** Текст тултипа */
  let textTooltip: string = $state('')

  /** Эффект для обновления состояния дня или ночи при обновлении данных погоды */
  $effect(() => {
    if (dataForecast) {
      isDay = !!dataForecast.current.is_day
    }
  })

  /**  Эффект для получения данных о прогнозе при изменении выбранного города */
  $effect(() => {
    if ($chosenCity) {
      dataForecast = undefined
      getDataForecast()
      textTooltip = ''
    }
  })

  /** Получение данных через деструктурицацию */
  const getDataForecast = async () => {
    error = false
    ;({dataForecast, error} = await getForecastForCity($chosenCity))
  }

  /** Получаем город пользователя */
  export const getMyCity = async (): Promise<void> => {
    let city: string | undefined
    try {
      city = await searchMyCity()
      if (city === $chosenCity) {
        textTooltip = i18n.get('data_already_loaded')
        return
      }
      textTooltip = ''
      chosenCity.set(city!)
    } catch (error) {
      textTooltip = i18n.get('allow_geo')
      throw error
    }
  }
</script>

<svelte:head>
  <title>{i18n.get('logo')}</title>
  <meta name="description" content="Аналитика погоды" />
</svelte:head>

<div class="forecast-data">
  <div
    class="forecast-data__content"
    class:forecast-data__content_day={dataForecast && isDay}
    class:forecast-data__content_night={dataForecast && !isDay}
    class:forecast-data__content_error={error}
  >
    <div class="forecast-data__main">
      <ForecastDataHeader {dataForecast} {error} />
      <TableData {dataForecast} />
    </div>
    <div class="forecast-data__side">
      <TemperatureNow
        {dataForecast}
        {error}
        update={(data) => {
          dataForecast = data
          textTooltip = ''
        }}
      />
      <Tooltip
        tip={textTooltip ? tip : null}
        theme={$backgroundColor === colors.WHITE ? 'tip-white' : 'tip-grey'}
        trigger="click"
      >
        <Button onclick={getMyCity} color={colors.WHITE_TRANSPARENT}>
          {#snippet text()}
            {i18n.get('my_geolocation')}
          {/snippet}
        </Button>
      </Tooltip>
      {#snippet tip()}
        <span class="forecast-data__tip">{textTooltip}</span>
      {/snippet}
    </div>
  </div>
  <div class="forecast-data__tab-content">
    <Tabs>
      {#snippet today()}
        <ListHourCards {dataForecast} {error} />
      {/snippet}

      {#snippet future()}
        <ListDayCards {dataForecast} {error} />
      {/snippet}
    </Tabs>
  </div>
</div>

<style lang="sass">
  .forecast-data
    display: flex
    flex-direction: column
    &__tip
      font-size: 20px
    &__content
      display: flex
      justify-content: space-between
      gap: 20px
      padding: 60px 40px
      background-size: cover
      border-radius: 40px
      color: var(--white)
      background-image: var(--gradient-light-gray)
      &_error
        border: 4px solid var(--light-red)
      &_day
        background-image: url("/static/sun.jpg")
        border: none
      &_night
        background-image: url("/static/night.jpg")
        border: none
    &__main
      display: flex
      flex-direction: column
      gap: 15px
    &__side
      display: flex
      flex-direction: column
      align-items: center
      gap: 25px

  @media (max-width: 1000px)
    .forecast-data__tip
      font-size: 16px

  @media (max-width: 700px)
    .forecast-data__content
      padding: 40px 30px

  @media (max-width: 550px)
    .forecast-data__content
      padding: 40px 20px
      font-size: 12px

  @media (max-width: 450px)
    .forecast-data
      &__tip
        font-size: 10px
      &__content
        padding: 30px 8px
</style>
