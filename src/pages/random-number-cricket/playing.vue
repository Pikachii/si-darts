<template>
  <playing-page v-bind="vbPlayingPage" />
</template>
<script lang="ts">
import { Component, Vue, Getter, Mutation } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';

import PlayingPage from '~/components/pages/Cricket/PlayingPage.vue';

@Component({
  layout: 'playing',
  components: { PlayingPage },
})
export default class extends Vue {
  public fetch({ store, redirect }: Context) {
    const playerNum = store.getters['playerNum'];
    if (playerNum === 0) {
      redirect(200, '/');
    }
  }

  @Getter('playerNum')
  private readonly playerNum!: number;

  @Mutation('setPlayerNum')
  private setPlayerNum!: (playerNum: number) => void;

  private cricketNumbers: number[];

  constructor() {
    super();
    const arr = Array.from(Array(20)).map((_x, index) => index + 1);
    let a = arr.length;
    // シャッフルアルゴリズム
    while (a) {
      const j = Math.floor(Math.random() * a);
      const t = arr[--a];
      arr[a] = arr[j];
      arr[j] = t;
    }

    this.cricketNumbers = [...arr.slice(0, 5)];
    this.cricketNumbers.sort((a, b) => a - b);
  }

  public destroyed() {
    this.setPlayerNum(0);
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
