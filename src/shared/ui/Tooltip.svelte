<script lang="ts">
  import {onMount} from 'svelte'
  import tippy from 'tippy.js'
  import type {Instance, Placement} from 'tippy.js'
  import type {Snippet} from 'svelte'
  import 'tippy.js/dist/tippy.css'

  type Props = {
    children: Snippet
    tip?: Snippet
    trigger?: 'mouseenter' | 'click'
    arrow?: boolean
    placement?: Placement
  }

  let {
    children,
    tip,
    trigger = 'mouseenter',
    arrow = true,
    placement = 'bottom'
  }: Props = $props()

  let tooltipElement: HTMLElement | undefined = $state()
  let tipElement: HTMLElement | undefined = $state()
  let instance: Instance | undefined = $state()

  onMount(() => {
    if (tooltipElement) {
      instance = tippy(tooltipElement, {
        content: tipElement,
        placement,
        theme: 'tip',
        trigger,
        arrow,
        offset: [0, 5],
        appendTo: document.body,
        interactive: true
      })
      return () => {
        if (instance) {
          instance.destroy()
        }
      }
    }
  })
</script>

<div class="tooltip" bind:this={tooltipElement}>
  {@render children()}
  {#if tip}
    <!-- a11y_click_events_have_key_events -->
    <div
      class="tooltip__tip"
      role="button"
      tabindex="0"
      bind:this={tipElement}
      onclick={() => {
        if (instance) instance.hide()
      }}
      onkeyup={() => {}}
    >
      {@render tip()}
    </div>
  {/if}
</div>

<style lang="sass">
  .tooltip
    cursor: pointer
  :global(.tippy-box[data-theme='tip'])
    background-color: var(--light-gray)
  :global(.tippy-box[data-theme='tip'][data-placement^=bottom]>.tippy-arrow:before)
    border-bottom-color: var(--light-gray)

    // TODO: Добавлен прозрачный стиль, тк если не передается tip, показывается пустая подсказка

  // :global(.tippy-box[data-theme='transparent'])
  //   background-color: transparent
  //   border: none
  // :global(.tippy-box[data-theme='transparent'][data-placement^=bottom]>.tippy-arrow:before)
    // border-bottom-color: transparent
</style>
