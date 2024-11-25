<script lang="ts">
  import {Icon} from '@/shared/ui'
  import {gradientColor} from '@/shared/lib'
</script>

<div class="logo">
  <Icon name="logo" />
  <p class="logo__text" style="background-image: {$gradientColor}">МетеоМир</p>
</div>

<style lang="sass">
  .logo
    display: flex
    align-items: center
    gap: 30px
    &__text
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
      margin: 0
      font-weight: 900
      font-size: 55px
</style>
