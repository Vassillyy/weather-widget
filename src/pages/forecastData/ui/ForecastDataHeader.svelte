<script lang="ts">
  import type {Forecast} from '@/entities/forecast'
  import {DateTime} from 'luxon'
  import {getFormattedDate} from '../model/getFormattedDate'

  type Props = {
    dataForecast: Forecast | undefined
    error: boolean
  }

  let {dataForecast, error}: Props = $props()
</script>

<div class="forecast-data-header">
  {#if dataForecast}
    {@const [date, timeUpdate] = dataForecast.current.last_updated.split(' ')}
    {@const formattedDate = DateTime.fromISO(date)
      .setLocale('ru')
      .toFormat('cccc, d MMMM')}
    <span class="forecast-data-header__geolocation">
      {dataForecast.location.country}
      {dataForecast.location.name}
    </span>
    <div class="forecast-data-header__geolocation-info">
      <span>{getFormattedDate(formattedDate)}</span>
      <span>Обновлено в: {timeUpdate}</span>
    </div>
  {:else if error}
    <span class="forecast-data-header__geolocation-error">
      Извините, данные о погоде временно недоступны<br />
      Пожалуйста, попробуйте позже
    </span>
  {:else}
    <span class="forecast-data-header__geolocation-info"
      >Загрузка данных...</span
    >
  {/if}
</div>

<style lang="sass">
  .forecast-data-header
    display: flex
    flex-direction: column
    gap: 15px
    &__geolocation
      font-size: 60px
      line-height: 1
      font-weight: 500
      text-align: left
      text-shadow: 4px 4px var(--black)
      margin-bottom: 15px
    &__geolocation-info
      font-size: 25px
      text-align: left
      text-shadow: 2px 2px var(--black)
      display: flex
      gap: 20px
    &__geolocation-error
      color: var(--light-red)
      font-size: 36px
      text-align: left
      text-shadow: 2px 2px var(--black)
</style>
