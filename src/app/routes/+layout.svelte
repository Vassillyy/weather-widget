<script lang="ts">
  import {Header} from '@/widgets/header'
  import {PageContainer} from '@/shared/ui'
  import '../global.css'

  let {children} = $props()
</script>

<PageContainer>
  <Header />
  {@render children()}
</PageContainer>
