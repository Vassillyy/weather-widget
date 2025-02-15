<script lang="ts">
  import tippy from 'tippy.js'
  import type {Instance, Placement} from 'tippy.js'
  import type {Snippet} from 'svelte'
  import 'tippy.js/dist/tippy.css'

  type Props = {
    children: Snippet
    tip: Snippet | null
    trigger?: 'mouseenter' | 'click'
    arrow?: boolean
    placement?: Placement
    theme?: string
    showTip?: boolean
  }

  let {
    children,
    tip,
    trigger = 'mouseenter',
    arrow = true,
    placement = 'bottom',
    theme = 'tip-white',
    showTip = false
  }: Props = $props()

  /** Элемент контейнера тултипа */
  let tooltipElement: HTMLElement | undefined = $state()
  /** Элемент содержимого тултипа */
  let tipElement: HTMLElement | undefined = $state()
  /** Экземпляр Tippy.js */
  let instance: Instance | undefined = $state()

  /** Эффект отвечает за показ или скрытие тултипа в зависимости от значения showTip */
  $effect(() => {
    if (showTip) instance?.show()
    else instance?.hide()
  })

  /** Эффект для управления состоянием тултипа в зависимости от наличия значения в tip */
  $effect(() => {
    if (tip) instance?.enable()
    else instance?.disable()
  })

  /** Эффект для обновления тултипа */
  $effect(() => {
    if (tooltipElement) {
      instance = tippy(tooltipElement, {
        content: tipElement,
        placement,
        theme,
        trigger,
        arrow,
        offset: [0, 10],
        appendTo: document.body,
        interactive: true
      })

      return () => {
        instance?.destroy()
      }
    }
  })
</script>

<div class="tooltip" bind:this={tooltipElement}>
  {@render children()}
  {#if tip}
    <div
      class="tooltip__tip"
      role="button"
      tabindex="0"
      bind:this={tipElement}
      onclick={() => instance?.hide()}
      onkeyup={() => {}}
    >
      {@render tip()}
    </div>
  {/if}
</div>

<style lang="sass">
  .tooltip
    cursor: pointer

  :global(.tippy-box[data-theme='tip-grey'])
    background-color: var(--light-gray)
    color: var(--black)
  :global(.tippy-box[data-theme='tip-grey'][data-placement^=bottom]>.tippy-arrow:before)
    border-bottom-color: var(--light-gray)

  :global(.tippy-box[data-theme='tip-white'])
    background-color: var(--light-blue)
    color: var(--white)
  :global(.tippy-box[data-theme='tip-white'][data-placement^=bottom]>.tippy-arrow:before)
    border-bottom-color: var(--light-blue)
</style>
