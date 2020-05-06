<template>
  <si-darts-board v-bind="vbDartsBoard" />
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiDartsBoard } from '~/components/moleculesCatalog';
import { AreaColorInfo } from '~/components/interfaceManager';
import { BULL_INDEX } from '~/components/constManager';

@Component({ components: { SiDartsBoard } })
export default class ShootOutDartsBoard extends Vue {
  @Prop({ default: () => new Set<number>() })
  public readonly hitNumbers!: Set<number>;
  @Prop({ default: 0 })
  public readonly suggestNumber!: number;

  private get vbDartsBoard(): Partial<SiDartsBoard> {
    return {
      numberColorInfo: this.createNumberColorInfo,
      innerBullColor:
        this.hitNumbers.size === 21
          ? 'yellow'
          : this.hitNumbers.has(BULL_INDEX)
          ? 'gray'
          : this.suggestNumber === BULL_INDEX
          ? 'yellow'
          : undefined,
      outerBullColor:
        this.hitNumbers.size === 21
          ? 'yellow'
          : this.hitNumbers.has(BULL_INDEX)
          ? 'gray'
          : this.suggestNumber === BULL_INDEX
          ? 'yellow'
          : undefined,
    };
  }

  private get createNumberColorInfo(): AreaColorInfo[] {
    if (this.hitNumbers.size === 21) {
      return Array.from(this.hitNumbers).map(x => {
        if ([3, 6, 11, 20].includes(x)) {
          return {
            number: x,
            doubleColor: 'red',
            outerColor: 'red',
            tripleColor: 'red',
            innerColor: 'red',
          };
        } else {
          return {
            number: x,
            doubleColor: 'gray',
            outerColor: 'gray',
            tripleColor: 'gray',
            innerColor: 'gray',
          };
        }
      });
    } else if (this.hitNumbers.has(this.suggestNumber)) {
      return Array.from(this.hitNumbers).map(x => ({
        number: x,
        doubleColor: 'gray',
        outerColor: 'gray',
        tripleColor: 'gray',
        innerColor: 'gray',
      }));
    } else {
      return Array.from(this.hitNumbers)
        .map(x => ({
          number: x,
          doubleColor: 'gray',
          outerColor: 'gray',
          tripleColor: 'gray',
          innerColor: 'gray',
        }))
        .concat([
          {
            number: this.suggestNumber,
            doubleColor: 'yellow',
            outerColor: 'yellow',
            tripleColor: 'yellow',
            innerColor: 'yellow',
          },
        ]);
    }
  }
}
</script>
