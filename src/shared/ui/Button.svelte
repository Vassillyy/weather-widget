<script lang="ts">
  type Props = {
    onclick?: (event: MouseEvent) => void
    color?: string | null
    icon?: any
    [key: string]: any
  }

  let {onclick, color = null, icon, ...rest}: Props = $props()
</script>

<svelte:element
  this={'button'}
  role="button"
  tabindex="0"
  class="button"
  {onclick}
  class:button_icon={icon}
  style="background: {color ? color : 'transparent'}"
  {...rest}
>
  {#if icon}
    <div class="button__image">
      {@render icon()}
    </div>
  {/if}
</svelte:element>

<style lang="sass">
  .button
    display: flex
    justify-content: center
    align-items: center
    border: none
    padding: 0
    cursor: pointer
    transition: background 5s ease-in-out
    flex-shrink: 0
    &:disabled
      cursor: not-allowed
    &_icon
      width: 60px
      height: 60px
      border-radius: 50%
    &__image
      width: 40px
      height: 40px
</style>
