<script lang="ts">
  import type {Forecast} from '@/entities/weatherForecast'
  import {i18n} from '@/shared/i18n'
  import Astrology from './Astrology.svelte'

  let {dataForecast}: {dataForecast: Forecast | undefined} = $props()

  /** Массив направлений ветра */
  const directions = [
    i18n.get('north'),
    i18n.get('north_east'),
    i18n.get('east'),
    i18n.get('south_east'),
    i18n.get('south'),
    i18n.get('south_west'),
    i18n.get('west'),
    i18n.get('north_west')
  ]

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
  <div class="table-data">
    <table>
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
            {i18n.get('amount_of_precipitation')}
            {dataForecast.current.precip_mm}
            {i18n.get('mm')}
          </td>
          <td class="table-data__item">
            {i18n.get('humidity')}
            {dataForecast.current.humidity} %
          </td>
        </tr>
        <tr>
          <td class="table-data__item">
            {i18n.get('wind_speed')}
            {((dataForecast.current.wind_kph * 10) / 36).toFixed(2)}
            {i18n.get('m_s')}
            {i18n.get('from')}
            {windDirection}
          </td>
          <td class="table-data__item">
            {i18n.get('gusts_of_wind')}
            {((dataForecast.current.gust_kph * 10) / 36).toFixed(2)}
            {i18n.get('m_s')}
          </td>
        </tr>
        <tr>
          <td class="table-data__item">
            {i18n.get('atmospheric_pressure')}
            {dataForecast.current.pressure_mb}
            {i18n.get('h_pa')}
          </td>
          <td class="table-data__item">
            {i18n.get('visibility')}
            {dataForecast.current.vis_km}
            {i18n.get('km')}
          </td>
        </tr>
        <tr>
          <td class="table-data__item">
            {i18n.get('probability_of_rain')}
            {dataForecast.forecast.forecastday[0].day.daily_chance_of_rain} %
          </td>
          <td class="table-data__item">
            {i18n.get('probability_of_snow')}
            {dataForecast.forecast.forecastday[0].day.daily_chance_of_snow} %
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="table-data__item table-data__item_centered" colspan="2">
            <Astrology {dataForecast} />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
{/if}

<style lang="sass">
  .table-data
    position: relative
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

  @media (max-width: 810px)
    .table-data__item
      display: block

  @media (max-width: 530px)
    .table-data__item
      font-size: 14px
      padding: 5px
      text-shadow: 1px 1px var(--black)

  @media (max-width: 510px)
    .table-data__item
      font-size: 12px
</style>
