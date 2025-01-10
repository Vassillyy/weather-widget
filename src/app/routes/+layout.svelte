<script lang="ts">
  import type {Snippet} from 'svelte'
  import {Header} from '@/widgets/header'
  import {Footer} from '@/widgets/footer'
  import {PageContainer} from '@/shared/ui'
  import {backgroundColor} from '@/shared/lib'
  import '../global.css'

  let {children}: {children: Snippet} = $props()
</script>

<div class="app-root" style="background-color: {$backgroundColor}">
  <PageContainer>
    <Header />
    {@render children()}
    <Footer />
  </PageContainer>
</div>

<style lang="sass">
  .app-root
    transition: background-color 0.5s ease-in-out
</style>
