<template>
  <el-row>
    <si-block v-bind="vbBlock" />
    <si-round v-bind="vbRound" style="margin-top: 5px;" />
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiBlock } from '~/components/atomsCatalog';
import { SiRound } from '~/components/moleculesCatalog';
import { RoundInfo, RoundMultiInfo } from '~/components/interfaceManager';

@Component({ components: { SiBlock, SiRound } })
export default class PlayingLeftContent extends Vue {
  @Prop({ default: '' })
  public readonly gameTitle!: string;

  @Prop({ default: 0 })
  public readonly currentRound!: number;

  @Prop({ default: 0 })
  public readonly totalRound!: number;

  @Prop({ default: 'skyblue' })
  public readonly color!: string;

  @Prop({ default: '' })
  public readonly roundItems!: RoundInfo[] | RoundMultiInfo[];

  private get vbBlock(): Partial<SiBlock> {
    return {
      text: this.gameTitle,
      color: this.color,
    };
  }

  private get vbRound(): Partial<SiRound> {
    return {
      currentRound: this.currentRound,
      totalRound: this.totalRound,
      roundItems: this.roundItems,
      color: this.color,
    };
  }
}
</script>
<style lang="scss" scoped>
.round {
  text-align: center;
  height: 50px;
  line-height: 50px;

  &.num {
    font-size: 1em;
  }

  &.detail {
    font-size: 2em;
  }
}
</style>
