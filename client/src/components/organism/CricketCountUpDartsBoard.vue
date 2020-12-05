<template>
  <si-darts-board v-bind="vbDartsBoard" />
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiDartsBoard } from '~/components/moleculesCatalog';
import { AreaColorInfo } from '~/components/interfaceManager';
import { BULL_INDEX } from '~/components/constManager';

@Component({ components: { SiDartsBoard } })
export default class CricketCountUpDartsBoard extends Vue {
  @Prop({ default: () => new Set<number>() })
  public readonly targetNumbers!: Set<number>;

  private get vbDartsBoard(): Partial<SiDartsBoard> {
    return {
      numberColorInfo: this.createNumberColorInfo,
      innerBullColor: this.targetNumbers.has(BULL_INDEX) ? 'yellow' : undefined,
      outerBullColor: this.targetNumbers.has(BULL_INDEX) ? 'yellow' : undefined,
    };
  }

  private get createNumberColorInfo(): AreaColorInfo[] {
    return Array.from(this.targetNumbers)
      .filter(x => x !== BULL_INDEX)
      .map(x => ({
        number: x,
        doubleColor: 'yellow',
        outerColor: 'yellow',
        tripleColor: 'yellow',
        innerColor: 'yellow',
      }));
  }
}
</script>
