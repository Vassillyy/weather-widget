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
    <div class="forecast-data-header__geolocation">
      {dataForecast.location.country}
      {dataForecast.location.name}
    </div>
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
    <div class="forecast-data-header__geolocation">Загрузка данных...</div>
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
    &__geolocation-info
      display: flex
      gap: 20px
      font-size: 25px
      text-align: left
      text-shadow: 2px 2px var(--black)
    &__geolocation-error
      color: var(--light-red)
      font-size: 36px
      text-align: left
      text-shadow: 2px 2px var(--black)

  @media (max-width: 1000px)
    .forecast-data-header
      gap: 5px
      &__geolocation
        font-size: 45px
      &__geolocation-info
        font-size: 21px

  @media (max-width: 710px)
    .forecast-data-header
      &__geolocation-info
        flex-direction: column
        gap: 8px

  @media (max-width: 640px)
    .forecast-data-header
      &__geolocation
        font-size: 35px
      &__geolocation-info
        gap: 5px

  @media (max-width: 580px)
    .forecast-data-header
      gap: 3px
      &__geolocation
        font-size: 30px
        text-shadow: 3px 3px var(--black)
      &__geolocation-info
        font-size: 18px
        text-shadow: 1px 1px var(--black)
        gap: 2px
      &__geolocation-error
        font-size: 20px

  @media (max-width: 510px)
    .forecast-data-header
      &__geolocation
        font-size: 25px
      &__geolocation-info
        font-size: 14px
</style>
