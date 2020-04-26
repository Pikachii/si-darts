<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="4">
        <playing-left-content v-bind="vbPlayingLeftContent" />
      </el-col>
      <el-col :span="16">
        <div class="center-content">
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
import { Component, mixins, Prop, Ref } from 'nuxt-property-decorator';

import { SiRoundThrow } from '~/components/moleculesCatalog';
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
  soundBust,
} from '~/assets/soundCatalog';

@Component({
  components: {
    SiRoundThrow,
    PlayerCardListWithPoint,
    PlayerChangeDialog,
    PlayingLeftContent,
    GameStartDialog,
  },
})
export default class PlayingPage extends mixins<BasePage>(BasePage) {
  @Prop({ default: 301 })
  public readonly initPoint!: number;

  @Ref('dialog')
  private readonly dialog!: PlayerChangeDialog;
  @Ref('gameStartDialog')
  private readonly gameStartDialog!: GameStartDialog;

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
    return (
      this.initPoint -
      this.roundPoints.reduce((prev, current) => prev + current)
    );
  }

  private get vbPlayerCardListWithPoint(): Partial<PlayerCardListWithPoint> {
    return {
      points: this.points.map(
        x => this.initPoint - x.reduce((prev, current) => prev + current)
      ),
      currentPlayer: this.currentPlayer,
      isTop: 'min',
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
        if (this.totalPoint < 0) {
          this.roundPoints.splice(this.currentRoundIndex, 1, 0);
          this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
          return {
            sound: soundBust,
            result: 'Bust',
            isNextTurn: true,
          };
        }
        return {
          sound: soundBullShot,
          result: key,
          isEnd: this.totalPoint === 0,
        };
      },
      onDoubleBull: (key: string) => {
        const currentPoint = this.roundPoints[this.currentRoundIndex] + 50;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        if (this.totalPoint < 0) {
          this.roundPoints.splice(this.currentRoundIndex, 1, 0);
          this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
          return {
            sound: soundBust,
            result: 'Bust',
            isNextTurn: true,
          };
        }
        return {
          sound: soundInnerBullShot,
          result: key,
          isEnd: this.totalPoint === 0,
        };
      },
      onInnerSingle: (key: string, point: number) => {
        const currentPoint = this.roundPoints[this.currentRoundIndex] + point;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        if (this.totalPoint < 0) {
          this.roundPoints.splice(this.currentRoundIndex, 1, 0);
          this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
          return {
            sound: soundBust,
            result: 'Bust',
            isNextTurn: true,
          };
        }
        return {
          sound: soundNormalShot,
          result: key,
          isEnd: this.totalPoint === 0,
        };
      },
      onOuterSingle: (key: string, point: number) => {
        const currentPoint = this.roundPoints[this.currentRoundIndex] + point;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        if (this.totalPoint < 0) {
          this.roundPoints.splice(this.currentRoundIndex, 1, 0);
          this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
          return {
            sound: soundBust,
            result: 'Bust',
            isNextTurn: true,
          };
        }
        return {
          sound: soundNormalShot,
          result: key,
          isEnd: this.totalPoint === 0,
        };
      },
      onDouble: (key: string, point: number) => {
        const currentPoint =
          this.roundPoints[this.currentRoundIndex] + point * 2;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        if (this.totalPoint < 0) {
          this.roundPoints.splice(this.currentRoundIndex, 1, 0);
          this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
          return {
            sound: soundBust,
            result: 'Bust',
            isNextTurn: true,
          };
        }
        return {
          sound: soundNormalShot,
          result: key,
          soundTimes: 2,
          soundSpanMs: 100,
          isEnd: this.totalPoint === 0,
        };
      },
      onTriple: (key: string, point: number) => {
        const currentPoint =
          this.roundPoints[this.currentRoundIndex] + point * 3;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        if (this.totalPoint < 0) {
          this.roundPoints.splice(this.currentRoundIndex, 1, 0);
          this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
          return {
            sound: soundBust,
            result: 'Bust',
            isNextTurn: true,
          };
        }
        return {
          sound: soundNormalShot,
          result: key,
          soundTimes: 3,
          soundSpanMs: 100,
          isEnd: this.totalPoint === 0,
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

.game-detail {
  text-align: center;
  background-color: skyblue;
  font-size: 2em;

  &.margin-top {
    margin-top: 5px;
  }
}

.round-num {
  text-align: center;
  background-color: skyblue;
  font-size: 1em;
  height: 50px;
}

.round-detail {
  text-align: center;
  background-color: skyblue;
  font-size: 2em;
  height: 50px;
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
