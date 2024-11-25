<script lang="ts">
  import {colors, gradientColor, tempUnit} from '@/shared/lib'
  import {Button, Icon} from '@/shared/ui'
  import Logo from './Logo.svelte'
  import Search from './Search.svelte'
  import SelectLanguage from './SelectLanguage.svelte'
  import {changeTempUnit} from '../model/changeTempUnit'
  import {changeColors} from '../model/changeColors'
</script>

<div class="header">
  <Logo />

  <div class="header__block-settings">
    <Search />

    <Button onclick={changeTempUnit} color={$gradientColor}>
      {#snippet icon()}
        {#if $tempUnit === '°C'}
          <Icon name="celsius" />
        {:else}
          <Icon name="fahrenheit" />
        {/if}
      {/snippet}
    </Button>

    <Button onclick={changeColors}>
      {#snippet icon()}
        {#if $gradientColor === colors.GRADIENT_VIOLET}
          <Icon name="night" />
        {:else}
          <Icon name="day" />
        {/if}
      {/snippet}
    </Button>

    <SelectLanguage />
  </div>
</div>

<style lang="sass">
  .header
    display: flex
    justify-content: space-between
    align-items: center
    &__block-settings
      display: flex
      align-items: center
      gap: 40px
</style>
