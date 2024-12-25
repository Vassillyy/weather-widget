<script lang="ts">
  import type {Forecast} from '@/entities/forecast'
  import {chosenCity} from '@/entities/city'
  import {TableData} from '@/features/tableData'
  import {colors} from '@/shared/lib'
  import {Button} from '@/shared/ui'
  import TemperatureNow from './TemperatureNow.svelte'
  import ForecastDataHeader from './ForecastDataHeader.svelte'
  import {getMyCity} from '../model/getMyCity'
  import {getForecastForCity} from '../model/getForecastForCity'

  /** Данные о прогнозе */
  let dataForecast: Forecast | undefined = $state.raw()
  /** Ошибка при получении данных о прогнозе */
  let error: boolean = $state(false)
  /** День или ночь */
  let isDay: boolean | undefined = $state()

  $effect(() => {
    if (dataForecast) {
      isDay = !!dataForecast.current.is_day
    }
  })

  $effect(() => {
    if ($chosenCity) {
      getDataForecast()
    }
  })

  /** Получение данных через деструктурицацию */
  const getDataForecast = async () => {
    if ($chosenCity) {
      ;({dataForecast, error} = await getForecastForCity($chosenCity))
    }
  }
</script>

<div
  class="forecast-data"
  class:forecast-data_day={dataForecast && isDay}
  class:forecast-data_night={dataForecast && !isDay}
>
  <div class="forecast-data__main">
    <ForecastDataHeader {dataForecast} {error} />
    <TableData {dataForecast} />
  </div>
  <div class="forecast-data__side">
    <TemperatureNow
      {dataForecast}
      {error}
      update={(data: Forecast) => (dataForecast = data)}
    />
    <Button onclick={getMyCity} color={colors.WHITE_TRANSPARENT}>
      {#snippet text()}
        Моя геолокация
      {/snippet}
    </Button>
  </div>
</div>

<style lang="sass">
  .forecast-data
    display: flex
    justify-content: space-between
    gap: 20px
    padding: 60px 40px
    background-size: cover
    border-radius: 40px
    color: var(--white)
    background-image: var(--gradient-light-gray)
    &_day
      background-image: url("/static/sun.jpg")
    &_night
      background-image: url("/static/night.jpg")
    &__main
      display: flex
      flex-direction: column
      gap: 15px
    &__side
      display: flex
      flex-direction: column
      gap: 25px

  @media (max-width: 700px)
    .forecast-data
      padding: 40px 30px

  @media (max-width: 550px)
    .forecast-data
      padding: 40px 20px

  @media (max-width: 450px)
    .forecast-data
      padding: 30px 8px
</style>
