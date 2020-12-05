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
  private get vbPlayingPage(): Partial<PlayingPage> {
    return {
      playerNum: this.playerNum,
      cricketNumbers: [20, 19, 18, 17, 16, 15, BULL_INDEX],
      totalRound: 15,
      gameTitle: 'Standard Cricket',
    };
  }
}
</script>
