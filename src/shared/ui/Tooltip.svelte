<script lang="ts">
  import {onMount} from 'svelte'
  import tippy, {type Placement} from 'tippy.js'
  import 'tippy.js/dist/tippy.css'

  type Props = {
    children: any
    tip: any
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

  let tooltipElement: any = $state()
  let tipElement: any = $state()
  let instance: any = $state()

  onMount(() => {
    if (tooltipElement) {
      instance = tippy(tooltipElement, {
        content: tipElement,
        placement,
        theme: 'tip',
        trigger,
        arrow,
        offset: [0, 5],
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
    <!--    a11y_click_events_have_key_events-->
    <div
      class="tooltip__tip"
      role="button"
      tabindex="0"
      bind:this={tipElement}
      onclick={() => instance.hide()}
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
</style>
