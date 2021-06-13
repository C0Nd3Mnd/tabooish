<template>
  <div class="row">
    <div class="col-12">
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="router-link"
      >
        {{ link.label }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  /**
   * Component data.
   *
   * @returns Component data.
   */
  data: () => ({
    links: [
      {
        path: '/stack',
        label: 'Stapel'
      },
      {
        path: '/cards',
        label: 'Karten'
      }
    ]
  })
})
</script>
