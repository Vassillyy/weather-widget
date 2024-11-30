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
    margin-right: 10px
    &__text
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
      margin: 0
      font-weight: 900
      font-size: 55px

  @media (max-width: 1050px)
    .logo__text
      font-size: 50px

  @media (max-width: 760px)
    .logo
      gap: 10px
      &__text
        font-size: 38px

  @media (max-width: 600px)
    .logo
      flex-direction: column
      align-items: flex-start
      gap: 5px
      &__text
        font-size: 35px
</style>
