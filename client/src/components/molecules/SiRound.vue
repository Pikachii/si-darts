<template>
  <el-row>
    <div class="wrapper" :style="vbStyle">
      Round {{ currentRound }} / {{ totalRound }}
    </div>
    <div v-for="item in displayRoundMarks" :key="item.round">
      <si-cricket-round-score
        v-if="isCricketRoundInfo(item)"
        v-bind="vbCricketRoundScore(item)"
      />
      <si-round-score
        v-else-if="isRoundInfo(item)"
        v-bind="vbRoundScore(item)"
      />
      <si-round-three-score v-else v-bind="vbRoundThreeScore(item)" />
    </div>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import {
  SiCricketRoundScore,
  SiRoundScore,
  SiRoundThreeScore,
} from '~/components/atomsCatalog';
import {
  CricketRoundInfo,
  RoundInfo,
  RoundMultiInfo,
} from '~/components/interfaceManager';

@Component({
  components: {
    SiCricketRoundScore,
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
  public readonly roundItems!:
    | RoundInfo[]
    | RoundMultiInfo[]
    | CricketRoundInfo[];

  private get displayRoundMarks():
    | RoundInfo[]
    | RoundMultiInfo[]
    | CricketRoundInfo[] {
    if (this.totalRound <= 8) return this.roundItems;

    if (this.isRoundInfoArray(this.roundItems)) {
      return this.roundItems.filter(x =>
        this.currentRound <= 8
          ? x.round <= 8
          : x.round >= this.currentRound - 7 && x.round <= this.currentRound
      );
    } else if (this.isCricketRoundInfoArray(this.roundItems)) {
      return this.roundItems;
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

  private isCricketRoundInfoArray(x: any): x is CricketRoundInfo[] {
    return typeof x[0].cricketNumber === 'string';
  }

  private isCricketRoundInfo(x: any): x is CricketRoundInfo {
    return typeof x.cricketNumber === 'string';
  }

  private vbRoundScore(item: RoundInfo): Partial<SiRoundScore> {
    return {
      round: item.round,
      point: item.point,
      color: this.color,
    };
  }

  private vbCricketRoundScore(
    item: CricketRoundInfo
  ): Partial<SiCricketRoundScore> {
    return {
      cricketNumber: item.cricketNumber,
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
