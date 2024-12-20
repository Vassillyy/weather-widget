<script lang="ts">
  import type {Forecast} from '@/entities/forecast'
  import {gradientColor, tempUnit, getCodeIconNow} from '@/shared/lib'
  import {ProgressBar} from '@/shared/ui'

  type Props = {
    dataForecast: Forecast | undefined
    error: boolean
  }

  let {dataForecast, error}: Props = $props()
</script>

<div class="temperature-now" style="background-image: {$gradientColor}">
  {#if dataForecast}
    <span class="temperature-now__header">Сейчас</span>
    <img
      class="temperature-now__icon"
      src={`static/${getCodeIconNow(dataForecast)}.png`}
      alt="Погода"
    />
    <span class="temperature-now__temp-value">
      {$tempUnit === '°C'
        ? Math.round(dataForecast.current.temp_c) + ' ' + $tempUnit
        : Math.round(dataForecast.current.temp_f) + ' ' + $tempUnit}
    </span>
    <div class="temperature-now__temp-feeling-block">
      <div class="temperature-now__temp-feeling-value">Ощущается как:</div>
      <div class="temperature-now__temp-feeling-value">
        {$tempUnit === '°C'
          ? Math.round(dataForecast.current.feelslike_c) + ' ' + $tempUnit
          : Math.round(dataForecast.current.feelslike_f) + ' ' + $tempUnit}
      </div>
    </div>
  {:else if error}
    <img
      class="temperature-now__icon temperature-now__icon_no-data"
      src="static/smail.png"
      alt="Ошибка"
    />
  {:else}
    <div class="temperature-now__icon temperature-now__icon_no-data">
      <ProgressBar />
    </div>
  {/if}
</div>

<style lang="sass">
  .temperature-now
    height: fit-content
    border-radius: 30px
    padding: 20px
    display: flex
    flex-direction: column
    align-items: center
    gap: 14px
    flex-shrink: 0
    &__header
      background-color: var(--dark-blue)
      padding: 7px 35px
      border-radius: 30px
      font-size: 22px
      line-height: 1
      font-weight: 500
    &__icon
      width: 210px
    &__icon_no-data
      padding-top: 95px
      padding-bottom: 95px
    &__temp-value
      font-size: 78px
      line-height: 1
    &__temp-feeling-block
      display: flex
      gap: 6px
      padding-bottom: 14px
    &__temp-feeling-value
      font-size: 20px
      line-height: 1

  @media (max-width: 1150px)
    .temperature-now
      padding: 15px
      gap: 8px
      &__header
        font-size: 21px
      &__icon
        width: 170px
      &__icon_no-data
        padding-top: 85px
        padding-bottom: 85px
      &__temp-value
        font-size: 66px
      &__temp-feeling-block
        display: flex
        flex-direction: column
        align-items: center
        gap: 5px
        padding-bottom: 0

  @media (max-width: 1000px)
    .temperature-now
      gap: 4px
      &__header
        font-size: 14px
        padding: 5px 20px
      &__icon
        width: 120px
      &__icon_no-data
        padding-top:55px
        padding-bottom: 55px
      &__temp-value
        font-size: 40px
      &__temp-feeling-block
        gap: 2px
      &__temp-feeling-value
        font-size: 16px
    
  @media (max-width: 450px)
    .temperature-now
      gap: 2px
      &__header
        font-size: 10px
        padding: 4px 16px
      &__icon
        width: 80px
      &__icon_no-data
        padding-top:35px
        padding-bottom: 35px
      &__temp-value
        font-size: 30px
      &__temp-feeling-value
        font-size: 10px
</style>
