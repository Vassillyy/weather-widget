<script lang="ts">
  import {backgroundColor} from '@/shared/lib'

  let {children}: {children: any} = $props()
</script>

<div class="page-container" style="background-color: {$backgroundColor}">
  {@render children()}
</div>

<style lang="sass">
  .page-container
    transition: background-color 0.5s ease-in-out
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
