<script lang="ts">
  import {Header} from '@/widgets/header'
  import {PageContainer} from '@/shared/ui'
  import '../global.css'
</script>

<PageContainer>
  <Header />
  <slot />
</PageContainer>
