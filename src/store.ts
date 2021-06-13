import { createStore } from 'vuex'
import { CardData } from '@/interfaces/CardData'

function getRandomIntInclusive(min: number, max: number): number {
  const randomBuffer = new Uint32Array(1)

  window.crypto.getRandomValues(randomBuffer)

  const randomNumber = randomBuffer[0] / (0xffffffff + 1)

  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(randomNumber * (max - min + 1)) + min
}

interface StoreState {
  cards: CardData[]
  usedCards: string[]
  activeCardID?: string
}

export const store = createStore({
  state: (): StoreState => ({
    cards: [],
    usedCards: [],
    activeCardID: undefined
  }),
  getters: {
    /**
     * Finds the active card in the stack (using the ID in state.activeCardID).
     *
     * @param state - Store state.
     * @returns Object of the active card.
     */
    activeCard(state) {
      return state.cards.find(card => card.id === state.activeCardID)
    }
  },
  mutations: {
    /**
     * "Draws" a card from the deck at random that has not yet been drawn.
     *
     * @param state - Store state.
     */
    drawCard(state) {
      if (state.cards.length <= state.usedCards.length) {
        return
      }

      const unusedCards = state.cards.filter(
        card => state.usedCards.indexOf(card.id) === -1
      )

      const { id } =
        unusedCards[getRandomIntInclusive(0, unusedCards.length - 1)]

      state.usedCards.push(id)
      state.activeCardID = id
    },
    /**
     * Resets the deck (makes all cards available to be drawn again).
     *
     * @param state - Store state.
     */
    reset(state) {
      state.usedCards = []
      state.activeCardID = undefined
    },
    /**
     * Adds a card to the deck. Throws an error if a card with the same ID
     * already exists or the card data is invalid.
     *
     * @param state - Store state.
     * @param card - Card data.
     */
    addCard(state, card: CardData) {
      if (state.cards.find(x => card.id === x.id)) {
        throw new Error(
          `Attempted to add two cards with the same id (${card.id}).`
        )
      }

      if (!/^[A-Za-z0-9_-]{21}$/.test(card.id)) {
        throw new Error(
          `Attempted to add a card with an invalid nanoid (${card.id}).`
        )
      }

      card.name = card.name.trim()

      card.blacklist = card.blacklist
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(x => x.trim())

      state.cards.push(card)
    },
    /**
     * Clears all cards from the deck.
     *
     * @param state - Store state.
     */
    clearCards(state) {
      state.cards = []
    }
  }
})
