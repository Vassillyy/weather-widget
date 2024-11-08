<script lang="ts">
  import {fsd} from 'feature-sliced-svelte'
</script>

<div use:fsd={'widgets/Header'} class="header"></div>

<style lang="sass">
  .header
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
</style>
