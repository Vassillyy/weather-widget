<script lang="ts">
  import type {Forecast} from '@/entities/weatherForecast'
  import {TableData} from '@/entities/weatherForecast'
  import {chosenCity} from '@/entities/city'
  import {searchMyCity} from '@/entities/city'
  import {Tabs} from '@/features/tabs'
  import {colors} from '@/shared/lib'
  import {Button} from '@/shared/ui'
  import {i18n} from '@/shared/i18n'
  import TemperatureNow from './TemperatureNow.svelte'
  import ForecastDataHeader from './ForecastDataHeader.svelte'
  import ListHourCards from './ListHourCards.svelte'
  import ListDayCards from './ListDayCards.svelte'
  import {getForecastForCity} from '../model/getForecastForCity'

  /** Данные о прогнозе */
  let dataForecast: Forecast | undefined = $state.raw()
  /** Ошибка при получении данных о прогнозе */
  let error: boolean = $state(false)
  /** День или ночь */
  let isDay: boolean | undefined = $state()
  /** Флаг, определяющий, отображать ли сообщение об ошибке геолокации */
  let showError = $state(false)
  /** Идентификатор таймера для скрытия сообщения об ошибке геолокации */
  let errorTimer: ReturnType<typeof setTimeout> | undefined = $state()

  /** Эффект для обновления состояния дня или ночи при обновлении данных погоды */
  $effect(() => {
    if (dataForecast) {
      isDay = !!dataForecast.current.is_day
    }
  })

  /**  Эффект для получения данных о прогнозе при изменении выбранного города */
  $effect(() => {
    if ($chosenCity) {
      dataForecast = undefined
      getDataForecast()
    }
  })

  /** Получение данных через деструктурицацию */
  const getDataForecast = async () => {
    ;({dataForecast, error} = await getForecastForCity($chosenCity))
  }

  /**
   * Обрабатывает отображение ошибки геолокации в зависимости от наличия города.
   * @param city - Название города.
   */
  const getErrorGeo = (city?: string): void => {
    if (city) {
      showError = false
      clearTimeout(errorTimer)
    } else {
      showError = true

      if (errorTimer) {
        clearTimeout(errorTimer)
      }

      errorTimer = setTimeout(() => {
        showError = false
        errorTimer = undefined
      }, 5000)
    }
  }

  /** Получаем город пользователя */
  export const getMyCity = async (): Promise<void> => {
    let city: string | undefined

    try {
      city = await searchMyCity()
      chosenCity.set(city!)
    } catch (error) {
      throw error
    } finally {
      getErrorGeo(city)
    }
  }
</script>

<svelte:head>
  <title>{i18n.get('logo')}</title>
  <meta name="description" content="Аналитика погоды" />
</svelte:head>

<div class="forecast-data">
  <div
    class="forecast-data__content"
    class:forecast-data__content_day={dataForecast && isDay}
    class:forecast-data__content_night={dataForecast && !isDay}
    class:forecast-data__content_error={error}
  >
    <div class="forecast-data__main">
      <ForecastDataHeader {dataForecast} {error} />
      <TableData {dataForecast} />
    </div>
    <div class="forecast-data__side">
      <TemperatureNow
        {dataForecast}
        {error}
        update={(data) => (dataForecast = data)}
      />
      {#if dataForecast}
        <div class="forecast-data__block-geo">
          <Button onclick={getMyCity} color={colors.WHITE_TRANSPARENT}>
            {#snippet text()}
              {i18n.get('my_geolocation')}
            {/snippet}
          </Button>
          {#if showError}
            <div class="forecast-data__error">{i18n.get('allow_geo')}</div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
  <div class="forecast-data__tab-content">
    <Tabs>
      {#snippet today()}
        <ListHourCards {dataForecast} {error} />
      {/snippet}

      {#snippet future()}
        <ListDayCards {dataForecast} {error} />
      {/snippet}
    </Tabs>
  </div>
</div>

<style lang="sass">
  .forecast-data
    display: flex
    flex-direction: column
    &__content
      display: flex
      justify-content: space-between
      gap: 20px
      padding: 60px 40px
      background-size: cover
      border-radius: 40px
      color: var(--white)
      background-image: var(--gradient-light-gray)
      &_error
        border: 4px solid var(--light-red)
      &_day
        background-image: url("/static/sun.jpg")
        border: none
      &_night
        background-image: url("/static/night.jpg")
        border: none
    &__main
      display: flex
      flex-direction: column
      gap: 15px
    &__side
      display: flex
      flex-direction: column
      align-items: center
      gap: 25px
    &__block-geo
      position: relative
      display: inline-flex
      flex-direction: column
      align-items: center
    &__error
      position: absolute
      bottom: -30px
      text-align: center
      color: var(--light-red)
      text-shadow: 1.5px 1.5px var(--black)
      font-size: 25px
      white-space: nowrap

  @media (max-width: 1000px)
    .forecast-data__error
      font-size: 18px

  @media (max-width: 700px)
    .forecast-data__content
      padding: 40px 30px

  @media (max-width: 550px)
    .forecast-data__content
      padding: 40px 20px

  @media (max-width: 450px)
    .forecast-data
      &__content
        padding: 30px 8px
      &__error
        font-size: 14px
        white-space: wrap
        bottom: -35px
</style>
