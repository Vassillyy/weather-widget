<script lang="ts">
  import type {Forecast} from '@/entities/forecast'
  import {gradientColor, tempUnit, getCodeIconNow} from '@/shared/lib'

  type Props = {
    dataForecast: Forecast | undefined
    error: boolean
  }

  let {dataForecast, error}: Props = $props()
</script>

<div class="temperature-now" style="background: {$gradientColor}">
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
    <span class="temperature-now__temp-feeling-value"
      >Ощущается как
      {$tempUnit === '°C'
        ? Math.round(dataForecast.current.feelslike_c) + ' ' + $tempUnit
        : Math.round(dataForecast.current.feelslike_f) + ' ' + $tempUnit}
    </span>
  {:else if error}
    <img
      class="temperature-now__icon temperature-now__icon_error"
      src="static/smail.png"
      alt="Ошибка"
    />
  {:else}
    Загрузкааааааааа
  {/if}
</div>

<style lang="sass">
  .temperature-now
    border-radius: 30px
    padding: 20px
    display: flex
    flex-direction: column
    align-items: center
    gap: 15px
    flex-shrink: 0
    &__header
      background-color: var(--dark-blue)
      padding: 8px 35px
      border-radius: 30px
      font-size: 21px
      line-height: 1
      font-weight: 500
    &__icon
      width: 210px
    &__icon_error
      padding-top: 95px
      padding-bottom: 95px
    &__temp-value
      font-size: 78px
      line-height: 1
    &__temp-feeling-value
      font-size: 20px
      line-height: 1
      padding-bottom: 10px
</style>
