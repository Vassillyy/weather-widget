<script lang="ts">
  import {DateTime} from 'luxon'
  import type {Forecast} from '@/entities/weatherForecast'
  import {gradientColor} from '@/shared/lib'
  import {i18n} from '@/shared/i18n'
  import {fillTime} from '../model/fillTime'
  import {updateProgress} from '../model/updateProgress'

  let {dataForecast}: {dataForecast: Forecast | undefined} = $props()

  /** Время заката солнца */
  let sunset: DateTime | undefined = $state()
  /** Время восхода солнца */
  let sunrise: DateTime | undefined = $state()
  /** Время захода солнца следующего дня */
  let sunriseNext: DateTime | undefined = $state()
  /** Прогресс заполнения */
  let progress = $state(0)
  /** Числовой идентификатор установленного таймера */
  let timeId: ReturnType<typeof setTimeout> | undefined = $state()
  /** Время до события */
  let time: string | undefined = $state()

  /** Эффект для получения данных о времени восхода и заката при обновлении данных погоды */
  $effect(() => {
    getDataAstrology()
  })

  /**
   * Получает данные о времени восхода и заката, а также обновляет прогресс
   * и время до следующего события. Устанавливает интервал для периодического
   * обновления прогресса каждую секунду.
   */
  const getDataAstrology = async () => {
    if (dataForecast) {
      const sunData = await fillTime(dataForecast)

      sunrise = sunData.sunrise
      sunset = sunData.sunset
      sunriseNext = sunData.sunriseNext

      const update = async () => {
        const progressData = updateProgress({
          sunrise: sunrise!,
          sunset: sunset!,
          sunriseNext: sunriseNext!
        })
        progress = progressData.progress
        time = progressData.time

        if (time === '00:00:00') {
          clearInterval(timeId)
          timeId = setTimeout(getDataAstrology, 1000)
          return
        }
      }

      await update()
      if (timeId) {
        clearInterval(timeId)
      }
      timeId = setInterval(update, 1000)
    }
  }
</script>

{#if sunrise && sunset && DateTime.now() >= sunrise && DateTime.now() <= sunset}
  <div class="astrology">
    <div class="astrology__header">
      <span>
        {i18n.get('sunrise_in')}
        {sunrise.toFormat('HH')}:{sunrise.toFormat('mm')}
      </span>
      <span>
        {i18n.get('sunset_in')}
        {sunset.toFormat('HH')}:{sunset.toFormat('mm')}
      </span>
    </div>
    <div class="astrology__progress-container">
      <div
        class="astrology__progress-bar"
        style="width: {progress}%; background-image: {$gradientColor}"
      ></div>
    </div>
    <div>{i18n.get('before_sunset')} {time}</div>
  </div>
{:else if sunrise && sunset && sunriseNext}
  <div class="astrology">
    <div class="astrology__header">
      <span>
        {i18n.get('sunset_in')}
        {sunset.toFormat('HH')}:{sunset.toFormat('mm')}
      </span>
      <span>
        {i18n.get('sunrise_in')}
        {sunriseNext.toFormat('HH')}:{sunriseNext.toFormat('mm')}
      </span>
    </div>
    <div class="astrology__progress-container">
      <div
        class="astrology__progress-bar"
        style="width: {progress}%; background-image: {$gradientColor}"
      ></div>
    </div>
    <div>{i18n.get('before_sunrise')} {time}</div>
  </div>
{/if}

<style lang="sass">
  .astrology
    display: flex
    flex-direction: column
    gap: 10px
    &__header
      display: flex
      justify-content: space-between
    &__progress-container
      box-sizing: border-box
      width: 100%
      border-radius: 10px
      border: 3px solid var(--white)
      overflow: hidden
    &__progress-bar
      height: 15px
      transition: width 0.5s

  @media (max-width: 1000px)
    .astrology
      gap: 7px
      &__progress-container
        border: 2px solid var(--white)
      &__progress-bar
        height: 10px

  @media (max-width: 500px)
    .astrology
      gap: 4px
      &__progress-container
        border: 1px solid var(--white)
      &__progress-bar
        height: 6px
</style>
