<template>
  <playing-page v-bind="vbPlayingPage" />
</template>
<script lang="ts">
import { Component, Vue, Getter, Mutation } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';

import PlayingPage from '~/components/pages/01/PlayingPage.vue';

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

  public destroyed() {
    this.setPlayerNum(0);
  }

  private get vbPlayingPage(): Partial<PlayingPage> {
    return {
      playerNum: this.playerNum,
      totalRound: 15,
      initPoint: 501,
      gameTitle: '501',
    };
  }
}
</script>
