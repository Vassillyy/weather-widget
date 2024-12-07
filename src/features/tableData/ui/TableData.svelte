<script lang="ts">
  import type {Forecast} from '@/entities/forecast'

  type Props = {
    dataForecast: Forecast | undefined
  }

  let {dataForecast}: Props = $props()

  /** Массив направлений ветра */
  const directions: string[] = ['С', 'В', 'Ю', 'З', 'СВ', 'ЮВ', 'ЮЗ', 'СЗ']

  /** Направление ветра в градусах */
  let deg = $state(0)
  /** Направление ветра */
  let windDirection: string | undefined = $state()

  $effect(() => {
    if (dataForecast) {
      deg = dataForecast.current.wind_degree
      windDirection = directions[Math.floor((deg % 360) / 45) % 8]
    }
  })
</script>

{#if dataForecast}
  <table class="table-data">
    <thead>
      <tr>
        <td class="table-data__item table-data__item_centered" colspan="2">
          {dataForecast.current.condition.text}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table-data__item">
          Количество осадков: {dataForecast.current.precip_mm} мм
        </td>
        <td class="table-data__item">
          Влажность: {dataForecast.current.humidity} %
        </td>
      </tr>
      <tr>
        <td class="table-data__item">
          Скорость ветра:
          {((dataForecast.current.wind_kph * 10) / 36).toFixed(2)} м/с с {windDirection}
        </td>
        <td class="table-data__item">
          Порывы ветра: {((dataForecast.current.gust_kph * 10) / 36).toFixed(2)}
          м/с
        </td>
      </tr>
      <tr>
        <td class="table-data__item">
          Атмосферное давление: {dataForecast.current.pressure_mb} гПа
        </td>
        <td class="table-data__item">
          Видимость: {dataForecast.current.vis_km} км
        </td>
      </tr>
      <tr>
        <td class="table-data__item">
          Вероятность дождя: {dataForecast.forecast.forecastday[0].day
            .daily_chance_of_rain} %
        </td>
        <td class="table-data__item">
          Вероятность снега: {dataForecast.forecast.forecastday[0].day
            .daily_chance_of_snow} %
        </td>
      </tr>
    </tbody>
  </table>
{/if}

<style lang="sass">
  .table-data
    width: fit-content
    background-color: var(--white-transparent)
    border-radius: 20px
    &__item
      padding: 10px
      text-align: left
      font-size: 27px
      font-weight: 500
      text-shadow: 1.5px 1.5px var(--black)
    &__item_centered
      text-align: center

  @media (max-width: 1150px)
    .table-data__item
      font-size: 24px

  @media (max-width: 1000px)
    .table-data__item
      font-size: 18px

  @media (max-width: 800px)
    .table-data__item
      display: block

  @media (max-width: 510px)
    .table-data__item
      font-size: 14px
      padding: 5px
      text-shadow: 1px 1px var(--black)

  @media (max-width: 510px)
    .table-data__item
      font-size: 12px
</style>
