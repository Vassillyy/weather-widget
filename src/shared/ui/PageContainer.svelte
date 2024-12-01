<script lang="ts">
  let {children}: {children: any} = $props()
</script>

<div class="page-container">
  {@render children()}
</div>

<style lang="sass">
  .page-container
    background-color: transparent
    --horizontal-offset: 30px
    margin: 0 auto
    padding-bottom: 30px
    padding-left: var(--horizontal-offset)
    padding-right: var(--horizontal-offset)
    max-width: calc(1200px + var(--horizontal-offset) + var(--horizontal-offset))
    min-width: calc(320px + var(--horizontal-offset) + var(--horizontal-offset))

  @media (max-width: 760px)
    .page-container
      --horizontal-offset: 15px
</style>
