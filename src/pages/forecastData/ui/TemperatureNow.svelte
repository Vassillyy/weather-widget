<script lang="ts">
  import {Duration} from 'luxon'
  import type {Forecast} from '@/entities/weatherForecast'
  import {chosenCity} from '@/entities/city'
  import {searchForecast} from '@/entities/weatherForecast'
  import {colors, gradientColor, tempUnit, backgroundColor} from '@/shared/lib'
  import {ProgressBar, Icon, Tooltip} from '@/shared/ui'
  import {i18n} from '@/shared/i18n'
  import {getCodeIconNow} from '../model/getCodeIconNow'

  type Props = {
    dataForecast: Forecast | undefined
    error: boolean
    update: (data: Forecast | undefined) => void
  }

  let {dataForecast, error, update}: Props = $props()

  /** Угол поворота стрелок при клике на обновить данные */
  let rotation = $state(0)
  /** Состояние кнопки обновления данных */
  let disabled = $state(false)
  /** Оставшееся время до разблокировки кнопки обновить */
  let timeLeft: Duration | undefined = $state()
  /** Текст подсказки */
  let textTip: string = $derived(
    disabled && timeLeft
      ? i18n.get('update_in') + ' ' + timeLeft?.toFormat('mm:ss')
      : i18n.get('update_data')
  )

  /** Обновляем данные погоды */
  const updateData = async (): Promise<void> => {
    rotation += 180
    disabled = true
    update(undefined)
    const data = await searchForecast($chosenCity)
    update(data)
    timeLeft = Duration.fromObject({minutes: 0.2})
    const interval = setInterval(() => {
      if (timeLeft!.as('seconds') > 0) {
        timeLeft = timeLeft!.minus({seconds: 1})
      } else {
        clearInterval(interval)
        timeLeft = undefined
        disabled = false
      }
    }, 1000)
  }
</script>

<div class="temperature-now" style="background-image: {$gradientColor}">
  {#if dataForecast}
    <Tooltip
      theme={$backgroundColor === colors.WHITE ? 'tip-white' : 'tip-grey'}
    >
      <button {disabled} onclick={updateData} class="temperature-now__update">
        <Icon name="reboot" {rotation} />
      </button>
      {#snippet tip()}
        <span class="temperature-now__tip">{textTip}</span>
      {/snippet}
    </Tooltip>
    <img
      class="temperature-now__icon"
      src={`static/${getCodeIconNow(dataForecast)}.png`}
      alt="Погода"
    />
    <span class="temperature-now__temp-value">
      {#if dataForecast.current}
        {$tempUnit === '°C'
          ? Math.round(dataForecast.current.temp_c) + ' ' + $tempUnit
          : Math.round(dataForecast.current.temp_f) + ' ' + $tempUnit}
      {/if}
    </span>
    <div class="temperature-now__temp-feeling-block">
      <div class="temperature-now__temp-feeling-value">
        {i18n.get('feels_like')}
      </div>
      <div class="temperature-now__temp-feeling-value">
        {#if dataForecast.current}
          {$tempUnit === '°C'
            ? Math.round(dataForecast.current.feelslike_c) + ' ' + $tempUnit
            : Math.round(dataForecast.current.feelslike_f) + ' ' + $tempUnit}
        {/if}
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
    &__update
      background-color: var(--dark-blue)
      padding: 5px 35px
      border-radius: 30px
      border: none
      cursor: pointer
    &__tip
      font-size: 18px
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
      &__update
         padding: 3px 30px
      &__tip
        font-size: 12px
      &__icon
        width: 120px
      &__icon_no-data
        padding-top: 55px
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
      &__update
         padding: 2px 20px
      &__tip
        font-size: 10px
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
