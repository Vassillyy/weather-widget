<script lang="ts">
  import {Header} from '@/widgets/header'
  import {PageContainer} from '@/shared/ui'
  import {backgroundColor} from '@/shared/lib'
  import '../global.css'

  let {children} = $props()
</script>

<div class="app-root" style="background-color: {$backgroundColor}">
  <PageContainer>
    <Header />
    {@render children()}
  </PageContainer>
</div>

<style lang="sass">
  .app-root
    transition: background-color 0.5s ease-in-out
</style>
