<script lang="ts">
  import {chosenCity} from '@/entities/city'
  import {searchCityList} from '@/entities/city'
  import type {City} from '@/entities/city'
  import {i18n} from '@/shared/i18n'

  let {inputValue}: {inputValue: string} = $props()

  /** Данные о городах */
  let cityData: City | undefined = $state()

  /** Обновляем список городов */
  const updateCityList = async () => {
    cityData = await searchCityList(inputValue)
  }

  /** Эффект обновления списка городов */
  $effect(() => {
    if (inputValue) updateCityList()
  })
</script>

<div class="list-hints">
  {#if cityData && cityData.suggestions.length}
    {#each cityData.suggestions as hint}
      <button
        onclick={() => chosenCity.set(hint.data.city)}
        class="list-hints__row"
      >
        {hint.data.country}
        {hint.data.city_with_type}
      </button>
    {/each}
  {:else}
    <div class="list-hints__row list-hints__row_undefined">
      {i18n.get('city_not_found')}
    </div>
  {/if}
</div>

<style lang="sass">
  .list-hints
    &__row
      font-size: 20px
      color: var(--black)
      padding: 5px 10px
      border-radius: 8px
      border: none
      background-color: transparent
      width: 100%
      text-align: left
    &__row:hover
      background-color: var(--white)
      color: var(--dark-blue)
      cursor: pointer
    &__row_undefined:hover
      background-color: transparent
</style>
