<script lang="ts">
  import type {Snippet} from 'svelte'

  type Props = {
    onclick?: (event: MouseEvent) => void
    color?: string | null
    icon?: Snippet
    text?: Snippet
    [key: string]: any
  }

  let {onclick, color = null, icon, text, ...rest}: Props = $props()
</script>

<svelte:element
  this={'button'}
  role="button"
  tabindex="0"
  class="button"
  {onclick}
  class:button_icon={icon}
  class:button_text={text}
  style="background: {color ? color : 'transparent'}"
  {...rest}
>
  {#if icon}
    <div class="button__image">
      {@render icon()}
    </div>
  {:else if text}
    {@render text()}
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

    &_text
      border-radius: 10px
      padding: 8px 15px
      font-size: 25px
      color: var(--white)
      text-shadow: 1px 1px var(--black)
      font-style: italic
      font-weight: 400
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5)
      &:active
        transform: scale(0.9) translate(2px, 2px)
        box-shadow: none

  @media (max-width: 1000px)
    .button
      &_icon
        width: 50px
        height: 50px
      &__image
        width: 30px
        height: 30px
      &_text
        font-size: 17px

  @media (max-width: 450px)
    .button_text
      padding: 5px 5px
      font-size: 14px
</style>
