<template>
  <el-row>
    <div class="wrapper" :style="vbStyle">
      Round {{ currentRound }} / {{ totalRound }}
    </div>
    <div v-for="item in displayRoundMarks" :key="item.round">
      <si-round-score v-if="isRoundInfo(item)" v-bind="vbRoundScore(item)" />
      <si-round-three-score v-else v-bind="vbRoundThreeScore(item)" />
    </div>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiRoundScore, SiRoundThreeScore } from '~/components/atomsCatalog';
import { RoundInfo, RoundMultiInfo } from '~/components/interfaceManager';

@Component({
  components: {
    SiRoundScore,
    SiRoundThreeScore,
  },
})
export default class SiRound extends Vue {
  @Prop({ default: 0 })
  public readonly currentRound!: number;

  @Prop({ default: 0 })
  public readonly totalRound!: number;

  @Prop({ default: 'skyblue' })
  public readonly color!: string;

  @Prop({ default: '' })
  public readonly roundItems!: RoundInfo[] | RoundMultiInfo[];

  private get displayRoundMarks(): RoundInfo[] | RoundMultiInfo[] {
    if (this.totalRound <= 8) return this.roundItems;

    if (this.isRoundInfoArray(this.roundItems)) {
      return this.roundItems.filter(x =>
        this.currentRound <= 8
          ? x.round <= 8
          : x.round >= this.currentRound - 7 && x.round <= this.currentRound
      );
    } else {
      return this.roundItems.filter(x =>
        this.currentRound <= 8
          ? x.round <= 8
          : x.round >= this.currentRound - 7 && x.round <= this.currentRound
      );
    }
  }

  private isRoundInfoArray(x: any): x is RoundInfo[] {
    return typeof x[0].point === 'string';
  }

  private isRoundInfo(x: any): x is RoundInfo {
    return typeof x.point === 'string';
  }

  private vbRoundScore(item: RoundInfo): Partial<SiRoundScore> {
    return {
      round: item.round,
      point: item.point,
      color: this.color,
    };
  }

  private isRoundMultiInfo(x: any): x is RoundMultiInfo {
    return typeof x.points === 'object';
  }

  private vbRoundThreeScore(item: RoundMultiInfo): Partial<SiRoundThreeScore> {
    return {
      round: item.round,
      points: item.points,
      color: this.color,
    };
  }

  private get vbStyle(): { [key: string]: string } {
    return {
      backgroundColor: this.color,
    };
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  text-align: center;
  font-size: 2vw;
  height: 50px;
  line-height: 50px;
}
</style>
