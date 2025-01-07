<script lang="ts">
  import {onMount} from 'svelte'
  import {colors} from '@/shared/lib'

  let {color = colors.WHITE}: {color?: string} = $props()

  /** Угол вращения элемента в градусах */
  let deg = $state(0)
  /** Ссылка на элемент DOM */
  let element: HTMLElement | undefined = $state()
  /** Ширина элемента, используемая для установки ширины бордера */
  let widthElement: number | undefined = $state()

  /** Интервал для обновления угла вращения */
  const interval = setInterval(() => {
    deg += 20
  }, 100)

  /** Обновление ширины бордера*/
  const updateWidth = (): void => {
    if (element) {
      widthElement = element.getBoundingClientRect().width
    }
  }

  onMount(() => {
    updateWidth()

    window.addEventListener('resize', () => {
      updateWidth()
    })

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', updateWidth)
    }
  })
</script>

<div
  bind:this={element}
  class="progress-bar"
  style={`rotate: ${deg}deg; border-bottom-color: ${color}; border-right-color: ${color}; border-width: ${
    widthElement ? Math.floor(widthElement / 35) : 7
  }px`}
></div>

<style lang="sass">
  .progress-bar
    box-sizing: border-box
    aspect-ratio: 1 / 1
    border-radius: 50%
    border-top-color: transparent
    border-left-color: transparent
    border-style: solid
</style>
