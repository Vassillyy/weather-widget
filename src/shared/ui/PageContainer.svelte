<script lang="ts">
  let {children}: {children: any} = $props()
</script>

<div class="page-container">
  {@render children()}
</div>

<style lang="sass">
  .page-container
    --horizontal-offset: 30px
    margin: 0 auto
    padding-bottom: 30px
    padding-left: var(--horizontal-offset)
    padding-right: var(--horizontal-offset)
    max-width: calc(1200px + var(--horizontal-offset) + var(--horizontal-offset))
</style>
