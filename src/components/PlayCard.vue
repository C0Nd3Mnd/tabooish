<template>
  <div class="play-card__wrapper">
    <div class="row">
      <div class="col-12 play-card__name">
        <h2>{{ cardData.name }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ul class="play-card__list">
          <li
            v-for="(entry, i) in cardData.blacklist"
            :key="i"
            class="play-card__list-item"
          >
            {{ entry }}
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <span class="play-card__id">{{ cardData.id }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    cardData: {
      type: Object,
      required: false,
      /**
       * Placeholder card.
       *
       * @returns Placeholder card.
       */
      default: () => ({
        id: '?',
        name: 'Bitte Karte ziehen!',
        blacklist: ['\u2660', '\u2663', '\u2665', '\u2666', '\ud83d\ude00']
      })
    }
  }
})
</script>
