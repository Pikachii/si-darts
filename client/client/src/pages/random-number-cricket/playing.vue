<template>
  <playing-page v-bind="vbPlayingPage" />
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';

import BasePage from '~/components/pages/ContainerBase/PlayingBasePage';
import PlayingPage from '~/components/pages/Cricket/PlayingPage.vue';
import { BULL_INDEX } from '~/components/constManager';

@Component({
  layout: 'playing',
  components: { PlayingPage },
})
export default class extends mixins<BasePage>(BasePage) {
  private cricketNumbers: number[] = [];

  public created() {
    const arr = Array.from(Array(20)).map((_x, index) => index + 1);
    let a = arr.length;
    // シャッフルアルゴリズム
    while (a) {
      const j = Math.floor(Math.random() * a);
      const t = arr[--a];
      arr[a] = arr[j];
      arr[j] = t;
    }

    // Bullは必ず最後に設定する
    this.cricketNumbers = [...arr.slice(0, 6)].concat([BULL_INDEX]);
    this.cricketNumbers.sort((a, b) => a - b);
  }

  private get vbPlayingPage(): Partial<PlayingPage> {
    return {
      playerNum: this.playerNum,
      cricketNumbers: this.cricketNumbers,
      gameTitle: 'Random Number Cricket',
    };
  }
}
</script>
