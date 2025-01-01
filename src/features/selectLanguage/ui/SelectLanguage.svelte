<script lang="ts">
  import {Icon, Tooltip, Button} from '@/shared/ui'
  import {i18n} from '@/shared/i18n'
  import {listLanguages} from '../model/listLanguages'
  import type {Language} from '../model/Language'

  /** Выбранный язык*/
  let seclectedLanguage: Language = $state(
    (() => {
      const storedLang = localStorage.getItem('lang')

      return (
        listLanguages.find((lang) => lang.value === storedLang) ||
        listLanguages[0]
      )
    })()
  )
  /**
   * Смена языка.
   * @param language - выьранный язык.
   */
  const changeLanguage = (language: Language): void => {
    i18n.set(seclectedLanguage.value)
    localStorage.setItem('lang', language.value)
    seclectedLanguage = language
  }
</script>

<div class="select-language">
  <Tooltip
    theme="tip-grey"
    trigger="click"
    arrow={false}
    placement="bottom-end"
  >
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

  @media (max-width: 760px)
    .select-language
      &__list-items
        gap: 5px
      &__icon
        width: 30px
        height: 30px
      &__label
        font-size: 18px
</style>
