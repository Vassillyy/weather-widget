<script lang="ts">
  import {onMount} from 'svelte'
  import {fetchForecast} from '@/entities/forecast'
  import type {Forecast} from '@/entities/forecast'
  import {TableData} from '@/features/tableData'
  import TemperatureNow from './TemperatureNow.svelte'
  import ForecastDataHeader from './ForecastDataHeader.svelte'

  /** Данные о прогнозе */
  let dataForecast: Forecast | undefined = $state.raw()
  /** Ошибка при получении данных о прогнозе */
  let error: boolean = $state(false)

  const fetchForecastForCity = (city: any) => {
    fetchForecast(city)
      .then((data) => {
        dataForecast = data
        error = false
      })
      .catch(() => {
        error = true
        dataForecast = undefined
      })
  }

  onMount(() => {
    fetchForecastForCity('Москва')
  })
</script>

<div class="forecast-data">
  <div class="forecast-data__main">
    <ForecastDataHeader {dataForecast} {error} />
    <TableData {dataForecast} />
  </div>
  <TemperatureNow {dataForecast} {error} />
</div>

<style lang="sass">
  .forecast-data
    display: flex
    justify-content: space-between
    padding: 60px 40px
    background-size: cover
    background-image: url("/static/sun.jpg")
    border-radius: 40px
    color: var(--white)
    &__main
      display: flex
      flex-direction: column
      gap: 15px

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
