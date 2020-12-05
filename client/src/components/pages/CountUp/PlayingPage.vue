<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="4">
        <playing-left-content v-bind="vbPlayingLeftContent" />
      </el-col>
      <el-col :span="16">
        <div class="center-content">
          <si-point-prediction v-bind="vbPointPrediction" />
          <div class="content">{{ totalPoint }}</div>
          <player-card-list-with-point v-bind="vbPlayerCardListWithPoint" />
        </div>
      </el-col>
      <el-col :span="4">
        <si-round-throw v-bind="vbRoundThrow" />
      </el-col>
      <player-change-dialog ref="dialog" />
      <game-start-dialog ref="gameStartDialog" :game-title="gameTitle" />
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator';

import { SiPointPrediction, SiRoundThrow } from '~/components/moleculesCatalog';
import BasePage from '~/components/pages/ComponentBase/PlayingBaseComponent';
import PlayingLeftContent from '~/components/organism/PlayingLeftContent.vue';
import PlayerCardListWithPoint from '~/components/organism/PlayerCardListWithPoint.vue';
import PlayerChangeDialog from '~/components/organism/PlayerChangeDialog.vue';
import GameStartDialog from '~/components/organism/GameStartDialog.vue';
import { KeyDownCallbacks } from '~/components/interfaceManager';

import {
  soundBullShot,
  soundInnerBullShot,
  soundNormalShot,
} from '~/assets/soundCatalog';

@Component({
  components: {
    SiPointPrediction,
    SiRoundThrow,
    PlayerCardListWithPoint,
    PlayerChangeDialog,
    PlayingLeftContent,
    GameStartDialog,
  },
})
export default class PlayingPage extends mixins<BasePage>(BasePage) {
  @Ref('dialog')
  private readonly dialog!: PlayerChangeDialog;
  @Ref('gameStartDialog')
  private readonly gameStartDialog!: GameStartDialog;

  /**  */
  private points: number[][] = [];
  private roundPoints: number[] = [];

  public created() {
    this.keyDownCallbacks = this.generateKeyDownCallbacks();

    this.points = [];
    for (let i = 1; i <= this.playerNum; i++) {
      this.points.push(Array.from(Array(this.totalRound).fill(0)));
    }
    this.roundPoints = [...this.points[0]];
  }

  public mounted() {
    this.$nextTick(async () => {
      await this.showStartDialog(
        this.gameStartDialog.show,
        this.gameStartDialog.hide
      );
    });
  }

  private get vbPlayingLeftContent(): Partial<PlayingLeftContent> {
    return {
      gameTitle: this.gameTitle,
      currentRound: this.currentRound,
      totalRound: this.totalRound,
      roundItems: this.roundPoints.map((x, index) => ({
        round: index + 1,
        point: `${x}`,
      })),
    };
  }

  private get vbRoundThrow(): Partial<SiRoundThrow> {
    return {
      roundThrow: this.roundThrow,
    };
  }

  private get totalPoint(): number {
    return this.roundPoints.reduce((prev, current) => prev + current);
  }

  private get vbPlayerCardListWithPoint(): Partial<PlayerCardListWithPoint> {
    return {
      points: this.points.map(x => x.reduce((prev, current) => prev + current)),
      currentPlayer: this.currentPlayer,
    };
  }

  private get vbPointPrediction(): Partial<SiPointPrediction> {
    return {
      point: this.totalPoint,
      roundIndex: this.currentRoundIndex,
      throwIndex: this.currentThrowIndex,
      totalRound: this.totalRound,
    };
  }

  private generateKeyDownCallbacks(): KeyDownCallbacks {
    return {
      showDialog: () => {
        if (this.dialog) this.dialog.show();
      },
      hideDialog: () => {
        if (this.dialog) this.dialog.hide();
      },
      onChangeRound: (nextRound, nextPlayer) => {
        this.points.splice(nextPlayer - 1, 1, this.roundPoints);
        this.roundPoints = [...this.points[nextPlayer]];
      },
      onSingleBull: (key: string) => {
        const currentPoint = this.roundPoints[this.currentRoundIndex] + 50;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundBullShot,
          result: key,
        };
      },
      onDoubleBull: (key: string) => {
        const currentPoint = this.roundPoints[this.currentRoundIndex] + 50;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundInnerBullShot,
          result: key,
        };
      },
      onInnerSingle: (key: string, point: number) => {
        const currentPoint = this.roundPoints[this.currentRoundIndex] + point;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundNormalShot,
          result: key,
        };
      },
      onOuterSingle: (key: string, point: number) => {
        const currentPoint = this.roundPoints[this.currentRoundIndex] + point;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundNormalShot,
          result: key,
        };
      },
      onDouble: (key: string, point: number) => {
        const currentPoint =
          this.roundPoints[this.currentRoundIndex] + point * 2;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundNormalShot,
          result: key,
          soundTimes: 2,
          soundSpanMs: 100,
        };
      },
      onTriple: (key: string, point: number) => {
        const currentPoint =
          this.roundPoints[this.currentRoundIndex] + point * 3;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundNormalShot,
          result: key,
          soundTimes: 3,
          soundSpanMs: 100,
        };
      },
    };
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-image: url(~assets/img/background.jpg);
}
.center-content {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    font-size: 15em;
  }
}
</style>
