<template>
  <div class="row row--padded">
    <div class="col-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4">
      <error-message v-if="errorMessage">{{ errorMessage }}</error-message>
    </div>
  </div>
  <div class="row row--padded">
    <div class="col-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4">
      <play-card :card-data="activeCard" />
    </div>
  </div>
  <div class="row row--padded">
    <div class="col-6 col-md-4 col-md-offset-2 col-lg-2 col-lg-offset-4">
      <button
        class="btn btn--block"
        :disabled="!remainingCards"
        @click="drawCard"
      >
        Karte ziehen
      </button>
    </div>
    <div class="col-6 col-md-4 col-lg-2">
      <button
        class="btn btn--block"
        :disabled="usedCards.length === 0"
        @click="reset"
      >
        Neu mischen
      </button>
    </div>
  </div>
  <div class="row row--padded">
    <div class="col-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4">
      Es sind noch {{ remainingCards }}/{{ cards.length }} Karten im Stapel.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { CardData } from '@/interfaces/CardData'
import PlayCard from '@/components/PlayCard.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

export default defineComponent({
  components: {
    PlayCard,
    ErrorMessage
  },
  /**
   * Component data.
   *
   * @returns Component data.
   */
  data: () => ({
    errorMessage: ''
  }),
  computed: {
    ...mapState(['cards', 'usedCards']),
    ...mapGetters(['activeCard']),
    remainingCards(): number {
      return this.cards.length - this.usedCards.length
    }
  },
  methods: {
    ...mapMutations(['drawCard', 'reset']),
    /**
     * Loads card data from a GitHub gist when the `username` and `gist` route
     * parameters are specified.
     */
    async loadCardsFromGist(): Promise<void> {
      const { username, gist } = this.$route.params

      if (
        typeof username !== 'string' ||
        typeof gist !== 'string' ||
        !username ||
        !gist
      ) {
        this.errorMessage =
          'Die Kartendaten müssen von einem GitHub Gist geladen werden.'
        return
      }

      let rawCards: CardData[]

      try {
        rawCards = await this.fetchGist(username, gist)
      } catch (ex) {
        this.errorMessage = `Ausnahmefehler beim Laden der Kartendaten: ${ex.message}`
        return
      }

      if (!(rawCards instanceof Array)) {
        this.errorMessage = 'Die Kartendaten konnten nicht geladen werden.'
        return
      }

      for (const rawCard of rawCards) {
        if (
          typeof rawCard !== 'object' ||
          typeof rawCard.id !== 'string' ||
          typeof rawCard.name !== 'string' ||
          !(rawCard.blacklist instanceof Array)
        ) {
          this.errorMessage = 'Die geladenen Kartendaten sind ungültig.'
          return
        }

        try {
          this.$store.commit('addCard', rawCard)
        } catch (ex) {
          this.errorMessage = `Ausnahmefehler beim Hinzufügen einer Karte: ${ex.message}`
          return
        }
      }
    },
    /**
     * Fetches raw JSON from a GitHub gist, validates it and generates an array
     * containing card data.
     *
     * @param username - Username the gist belongs to.
     * @param gist - Hash of the gist.
     * @returns Array of parsed card data.
     */
    async fetchGist(username: string, gist: string): Promise<CardData[]> {
      const gistURL = `https://gist.githubusercontent.com/${username}/${gist}/raw/`

      const result = await fetch(gistURL)
      const rawCards = await result.json()

      if (!(rawCards instanceof Array)) {
        throw new Error('Empty data.')
      }

      const cards: CardData[] = []

      for (const rawCard of rawCards) {
        if (
          typeof rawCard !== 'object' ||
          typeof rawCard.id !== 'string' ||
          typeof rawCard.name !== 'string' ||
          !(rawCard.blacklist instanceof Array)
        ) {
          throw new Error('Attempted to parse invalid card data.')
        }

        rawCard.blacklist.forEach((x: unknown) => {
          if (typeof x !== 'string') {
            throw new Error(
              'Encountered an invalid blacklist entry while parsing card data.'
            )
          }
        })

        cards.push({
          id: rawCard.id,
          name: rawCard.name,
          blacklist: rawCard.blacklist
        })
      }

      return cards
    }
  },
  /**
   * Calls this.loadCardsFromGist on component creation.
   */
  created() {
    this.loadCardsFromGist()
  }
})
</script>
