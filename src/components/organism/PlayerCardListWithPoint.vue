<template>
  <div style="display: flex;">
    <si-player-card-with-point
      v-for="(point, index) in points"
      :key="index"
      v-bind="vbPlayerCardWithPoint(index)"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiPlayerCardWithPoint } from '~/components/moleculesCatalog';

@Component({ components: { SiPlayerCardWithPoint } })
export default class PlayerCardListWithPoint extends Vue {
  @Prop({ default: 0 })
  public readonly points!: number[];
  @Prop({ default: 0 })
  public readonly currentPlayer!: number;
  @Prop({ default: 'max' })
  public readonly isTop!: 'max' | 'min';

  private readonly color: string[] = [
    '#FF6969',
    '#6EC4FF',
    '#F9BF4B',
    '#44D37E',
  ];

  private vbPlayerCardWithPoint(index: number): Partial<SiPlayerCardWithPoint> {
    return {
      point: this.points[index],
      isTop:
        (this.isTop === 'max'
          ? Math.max(...this.points)
          : Math.min(...this.points)) === this.points[index],
      playerName: `Player ${index + 1}`,
      color: index + 1 === this.currentPlayer ? this.color[index] : 'darkgray',
    };
  }
}
</script>
