<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="4">
        <playing-left-content v-bind="vbPlayingLeftContent" />
      </el-col>
      <el-col :span="16">
        <div class="center-content">
          <div class="content">
            <div style="font-size: 0.25em;">
              Shoot At {{ shootCricketNumber }}
            </div>
            <cricket-count-up-darts-board v-bind="vbCricketCountUpDartsBoard" />
          </div>
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

import { SiRoundThrow } from '~/components/moleculesCatalog';
import BasePage from '~/components/pages/ComponentBase/PlayingBaseComponent';
import CricketCountUpDartsBoard from '~/components/organism/CricketCountUpDartsBoard.vue';
import PlayingLeftContent from '~/components/organism/PlayingLeftContent.vue';
import PlayerCardListWithPoint from '~/components/organism/PlayerCardListWithPoint.vue';
import PlayerChangeDialog from '~/components/organism/PlayerChangeDialog.vue';
import GameStartDialog from '~/components/organism/GameStartDialog.vue';
import { KeyDownCallbacks } from '~/components/interfaceManager';
import { BULL_INDEX } from '~/components/constManager';

import {
  soundBullShot,
  soundInnerBullShot,
  soundNormalShot,
  soundMissShot,
} from '~/assets/soundCatalog';

@Component({
  components: {
    SiRoundThrow,
    PlayerCardListWithPoint,
    PlayerChangeDialog,
    PlayingLeftContent,
    CricketCountUpDartsBoard,
    GameStartDialog,
  },
})
export default class PlayingPage extends mixins<BasePage>(BasePage) {
  @Ref('dialog')
  private readonly dialog!: PlayerChangeDialog;
  @Ref('gameStartDialog')
  private readonly gameStartDialog!: GameStartDialog;

  private points: number[][] = [];
  private roundPoints: number[] = [];

  private readonly cricketNumbers: number[] = [
    20,
    19,
    18,
    17,
    16,
    15,
    BULL_INDEX,
  ];
  private readonly displayCricketNumbers: string[] = [
    '20',
    '19',
    '18',
    '17',
    '16',
    '15',
    'Bull',
    'CR',
  ];

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

  private get shootCricketNumber(): string {
    if (this.currentRound === 8) {
      return 'Any Cricket Numbers';
    } else {
      return this.displayCricketNumbers[this.currentRoundIndex];
    }
  }

  private get vbCricketCountUpDartsBoard(): Partial<CricketCountUpDartsBoard> {
    return {
      targetNumbers: this.targetNumbers,
    };
  }

  private get targetNumbers(): Set<number> {
    if (this.currentRound === 8) {
      return new Set<number>(this.cricketNumbers);
    } else {
      return new Set<number>([this.cricketNumbers[this.currentRoundIndex]]);
    }
  }

  private get vbPlayingLeftContent(): Partial<PlayingLeftContent> {
    return {
      gameTitle: this.gameTitle,
      currentRound: this.currentRound,
      totalRound: this.totalRound,
      roundItems: this.roundPoints.map((x, index) => ({
        cricketNumber: this.displayCricketNumbers[index],
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
        if (!this.targetNumbers.has(BULL_INDEX)) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

        const currentPoint = this.roundPoints[this.currentRoundIndex] + 25;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundBullShot,
          result: key,
        };
      },
      onDoubleBull: (key: string) => {
        if (!this.targetNumbers.has(BULL_INDEX)) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

        const currentPoint = this.roundPoints[this.currentRoundIndex] + 50;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundInnerBullShot,
          result: key,
        };
      },
      onInnerSingle: (key: string, point: number) => {
        if (!this.targetNumbers.has(point)) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

        const currentPoint = this.roundPoints[this.currentRoundIndex] + point;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundNormalShot,
          result: key,
        };
      },
      onOuterSingle: (key: string, point: number) => {
        if (!this.targetNumbers.has(point)) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

        const currentPoint = this.roundPoints[this.currentRoundIndex] + point;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundNormalShot,
          result: key,
        };
      },
      onDouble: (key: string, point: number) => {
        if (!this.targetNumbers.has(point)) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

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
        if (!this.targetNumbers.has(point)) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

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
    width: 100%;
    height: 100%;
    padding: 10px;
  }
}
</style>
