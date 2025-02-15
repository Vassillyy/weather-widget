<script lang="ts">
  import {Icon} from '@/shared/ui'
</script>

<div class="footer">
  <div class="footer__item">
    <Icon name="instagram" />
    infernooo0
  </div>
  <div class="footer__item">
    <Icon name="telegram" />
    @Infern00000
  </div>
</div>

<style lang="sass">
  .footer
    margin-top: 20px
    display: flex
    justify-content: center
    align-items: center
    gap: 30px
    padding: 20px 20px 20px
    border-style: solid
    border-width: 0.2px
    border-color: var(--light-gray)
    border-radius: 30px 30px 0 0
    border-bottom: none
    &__item
      display: flex
      align-items: center
      gap: 15px
      color: var(--light-gray)
      font-size: 30px

  @media (max-width: 760px)
    .footer__item
      gap: 10px
      font-size: 20px

  @media (max-width: 500px)
    .footer
      gap: 15px
      &__item
        font-size: 17px
        gap: 5px

  @media (max-width: 400px)
    .footer
      gap: 10px
      &__item
        font-size: 15px
</style>
