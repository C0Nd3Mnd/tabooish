<template>
  <div class="row">
    <div class="col-12">
      <h1>Tabooish</h1>
    </div>
  </div>
  <!-- <navigation-bar /> -->
  <router-view />
  <div class="row">
    <div class="col-12" style="font-style: italic">
      <p>
        Dieses Tool ist unter der
        <a
          href="https://github.com/C0Nd3Mnd/tabooish/blob/main/LICENSE"
          target="_blank"
        >
          MIT-Lizenz
        </a>
        lizenziert.
        <a href="https://github.com/C0Nd3Mnd/tabooish" target="_blank">
          Quellcode auf GitHub
        </a>
      </p>
      <p>
        Version {{ version }} -
        <a
          href="https://github.com/C0Nd3Mnd/tabooish/blob/main/CHANGELOG.md"
          target="_blank"
        >
          Changelog
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { version } from '../package.json'
// import NavigationBar from './components/NavigationBar.vue'

export default defineComponent({
  components: {
    // NavigationBar
  },
  /**
   * Component data.
   *
   * @returns Component data.
   */
  data: () => ({
    version
  })
})
</script>
