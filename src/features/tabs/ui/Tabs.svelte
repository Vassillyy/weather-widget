<script lang="ts">
  import type {Snippet} from 'svelte'
  import {backgroundColor, colors} from '@/shared/lib'
  import {i18n} from '@/shared/i18n'

  type Props = {
    today: Snippet
    future: Snippet
  }

  let {today, future}: Props = $props()

  /** Именование табов */
  let headerTabs = [i18n.get('forecast_today'), i18n.get('forecast_future')]
  /** Индекс активного таба */
  let activeTab = $state(0)
</script>

<div class="tabs">
  <div class="tabs__header">
    {#each headerTabs as tab, index}
      <div
        tabindex="0"
        role="tab"
        class="tabs__tab"
        class:tabs__tab_active={activeTab === index}
        style="color: {$backgroundColor === colors.WHITE
          ? colors.DARK_BLUE
          : colors.WHITE}"
        onclick={() => (activeTab = index)}
        onkeyup={({key}) => {
          if (key === 'Enter') activeTab = index
        }}
      >
        {tab}
      </div>
    {/each}
  </div>
  <div class="tabs__content">
    {#if activeTab === 0}
      {@render today()}
    {:else}
      {@render future()}
    {/if}
  </div>
</div>

<style lang="sass">
  .tabs
    display: flex
    flex-direction: column
    align-items: start
    &__header
      display: flex
      justify-content: left
      gap: 5px
      margin: 20px 0
      width: fit-content
      cursor: pointer
    &__tab
      padding: 20px 30px 15px
      font-weight: 600
      font-size: 30px
    &__tab_active
      border-bottom: 4px solid var(--dark-turquoise)
    &__content
      padding: 10px 0
      width: 100%

	
  @media (max-width: 1000px)
    .tabs
      &__header
        margin: 10px 0
      &__tab
        padding: 15px 20px 10px
        font-size: 25px

  @media (max-width: 600px)
    .tabs
      &__header
        margin: 5px 0
      &__tab
        padding: 10px 15px 5px
        font-size: 20px

  @media (max-width: 450px)
    .tabs
      &__header
        margin: 3px 0
      &__tab
        padding: 8px 10px 4px
        font-size: 15px
</style>
