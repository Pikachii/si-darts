<template>
  <div class="content">
    <si-player-cricket-marks v-bind="vbFirstCricketMarks" />
    <si-player-cricket-marks v-bind="vbSecondCricketMarks" />
    <si-cricket-numbers v-bind="vbCricketNumbers" />
    <si-player-cricket-marks v-bind="vbThirdCricketMarks" />
    <si-player-cricket-marks v-bind="vbFourthCricketMarks" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import {
  SiCricketNumbers,
  SiPlayerCricketMarks,
} from '~/components/moleculesCatalog';
import { SiCricketNumberStatus } from '~/components/interfaceManager';

@Component({ components: { SiCricketNumbers, SiPlayerCricketMarks } })
export default class CricketDisplay extends Vue {
  @Prop({ default: () => [] })
  public readonly numbers!: SiCricketNumberStatus[];
  @Prop({ default: () => [] })
  public readonly allPlayerMarks!: number[][];
  @Prop({ default: 0 })
  public readonly playerNum!: number;

  private readonly color: string[] = [
    '#FF6969',
    '#6EC4FF',
    '#F9BF4B',
    '#44D37E',
  ];

  private get vbFirstCricketMarks(): Partial<SiPlayerCricketMarks> {
    return {
      playerMarks: this.playerNum >= 3 ? this.allPlayerMarks[0] : [],
      color: this.color[0],
    };
  }

  private get vbSecondCricketMarks(): Partial<SiPlayerCricketMarks> {
    return {
      playerMarks: this.allPlayerMarks[this.playerNum >= 3 ? 1 : 0],
      color: this.playerNum >= 3 ? this.color[1] : this.color[0],
    };
  }

  private get vbCricketNumbers(): Partial<SiCricketNumbers> {
    return {
      numberStatus: this.numbers,
    };
  }

  private get vbThirdCricketMarks(): Partial<SiPlayerCricketMarks> {
    return {
      playerMarks:
        this.playerNum >= 2
          ? this.allPlayerMarks[this.playerNum >= 3 ? 2 : 1]
          : [],
      color: this.playerNum >= 3 ? this.color[2] : this.color[1],
    };
  }

  private get vbFourthCricketMarks(): Partial<SiPlayerCricketMarks> {
    return {
      playerMarks: this.playerNum === 4 ? this.allPlayerMarks[3] : [],
      color: this.color[3],
    };
  }
}
</script>
<style lang="scss" scoped>
.content {
  width: 70%;
  max-width: 850px;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  padding: 20px 0px;
}
</style>
