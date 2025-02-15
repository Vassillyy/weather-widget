<script lang="ts">
  import type {Snippet} from 'svelte'

  let {children}: {children: Snippet} = $props()
</script>

<div class="page-container">
  {@render children()}
</div>

<style lang="sass">
  .page-container
    --horizontal-offset: 30px
    background-color: transparent
    margin: 0 auto
    padding-left: var(--horizontal-offset)
    padding-right: var(--horizontal-offset)
    max-width: calc(1200px + var(--horizontal-offset) + var(--horizontal-offset))
    min-width: 332px

  @media (max-width: 760px)
    .page-container
      --horizontal-offset: 15px
  
  @media (max-width: 450px)
    .page-container
      --horizontal-offset: 8px

  @media (max-width: 380px)
    .page-container
      --horizontal-offset: 4px
</style>
