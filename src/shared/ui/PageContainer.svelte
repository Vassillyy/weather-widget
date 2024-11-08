<script lang="ts">
  import {fsd} from 'feature-sliced-svelte'
</script>

<div use:fsd={'shared/PageContainer'} class="page-container" style="background-color: red">
  <slot />
</div>

<style lang="sass">
  .page-container
    --horizontal-offset: 30px
    margin: 0 auto
    padding-bottom: 30px
    padding-left: var(--horizontal-offset)
    padding-right: var(--horizontal-offset)
    width: calc(1200px + var(--horizontal-offset) + var(--horizontal-offset))
    transition: background-color 0.5s ease-in-out
</style>
