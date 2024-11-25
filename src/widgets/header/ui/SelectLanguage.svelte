<script lang="ts">
  import {Icon, Tooltip, Button} from '@/shared/ui'

  type Language = {
    value: string
    name: string
  }

  const listLanguages: Language[] = [
    {
      value: 'ru',
      name: 'Русский'
    },
    {
      value: 'en',
      name: 'English'
    }
  ]

  let seclectedLanguage: Language = listLanguages[0]

  const changeLanguage = (language: Language): void => {
    seclectedLanguage = listLanguages.find(
      (lang) => lang.value === language.value
    )!
  }
</script>

<div class="select-language">
  <Tooltip trigger="click" arrow={false} placement="bottom-end">
    <Button>
      {#snippet icon()}
        <Icon name={seclectedLanguage.value} />
      {/snippet}
    </Button>
    {#snippet tip()}
      <div class="select-language__list-items">
        {#each listLanguages as language}
          <button
            class="select-language__item"
            onclick={() => changeLanguage(language)}
          >
            <div class="select-language__icon">
              <Icon name={language.value} />
            </div>
            <span class="select-language__label">
              {language.name}
            </span>
          </button>
        {/each}
      </div>
    {/snippet}
  </Tooltip>
</div>

<style lang="sass">
  .select-language
    &__list-items
      display: flex
      flex-direction: column
      gap: 10px
    &__item
      display: flex
      align-items: center
      gap: 10px
      cursor: pointer
      border: none
      background-color: transparent
      padding: 5px 10px 5px 5px
      border-radius: 5px
      &:hover
        background: var(--white)
    &__icon
      width: 40px
      height: 40px
    &__label
      font-size: 20px
</style>
