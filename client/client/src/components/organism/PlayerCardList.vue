<template>
  <div style="display: flex">
    <si-player-card v-for="n of playerNum" :key="n" v-bind="vbPlayerCard(n)" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiPlayerCard } from '~/components/moleculesCatalog';

@Component({ components: { SiPlayerCard } })
export default class PlayerCardList extends Vue {
  @Prop({ default: 0 })
  public readonly playerNum!: number;

  private readonly color: string[] = [
    '#FF6969',
    '#6EC4FF',
    '#F9BF4B',
    '#44D37E',
  ];

  private vbPlayerCard(index: number): Partial<SiPlayerCard> {
    return {
      playerName: `Player ${index}`,
      color: this.color[index - 1],
    };
  }
}
</script>
