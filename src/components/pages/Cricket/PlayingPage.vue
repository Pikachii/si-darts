<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="4">
        <playing-left-content v-bind="vbPlayingLeftContent" />
      </el-col>
      <el-col :span="16">
        <div class="center-content">
          <cricket-display v-bind="vbCricketDisplay" />
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
import CricketDisplay from '~/components/organism/CricketDisplay.vue';
import PlayerCardListWithPoint from '~/components/organism/PlayerCardListWithPoint.vue';
import PlayerChangeDialog from '~/components/organism/PlayerChangeDialog.vue';
import GameStartDialog from '~/components/organism/GameStartDialog.vue';
import {
  SiCricketNumberStatus,
  KeyDownCallbacks,
} from '~/components/interfaceManager';

import {
  soundBullShot,
  soundInnerBullShot,
  soundCricketHit,
  soundCricketClose,
  soundMissShot,
} from '~/assets/soundCatalog';

@Component({
  components: {
    SiRoundThrow,
    CricketDisplay,
    PlayerCardListWithPoint,
    PlayerChangeDialog,
    PlayingLeftContent,
    GameStartDialog,
  },
})
export default class PlayingPage extends mixins<BasePage>(BasePage) {
  @Prop({ default: () => [] })
  public readonly cricketNumbers!: number[];

  @Ref('dialog')
  private readonly dialog!: PlayerChangeDialog;
  @Ref('gameStartDialog')
  private readonly gameStartDialog!: GameStartDialog;

  /** クリケットナンバーのOpen/Close状況 */
  private cricketNumberStatus: SiCricketNumberStatus[] = [];

  /** 全プレイヤーの全ラウンドのマーク情報 */
  private allPlayerRoundMarks: string[][][] = [];
  /** 現在のプレイヤーの全ラウンドのマーク情報 */
  private currentPlayerRoundMarks: string[][] = [];

  /** 全プレイヤーのクリケットナンバーマーク情報 */
  private allPlayerCricketNumberMarks: number[][] = [];
  /** 現在のプレイヤーのクリケットナンバーマーク情報 */
  private currentPlayerCricketNumberMarks: number[] = [];

  /** 全プレイヤーの得点情報 */
  private allPlayerPoints: number[] = [];

  public created() {
    this.keyDownCallbacks = this.generateKeyDownCallbacks();

    this.cricketNumberStatus = this.cricketNumbers.map(x => ({
      number: x === 21 ? 'Bull' : `${x}`,
      isClose: false,
    }));

    for (let i = 1; i <= this.playerNum; i++) {
      this.allPlayerRoundMarks.push(
        Array.from(Array(this.totalRound)).map(_x => ['-', '-', '-'])
      );
      this.allPlayerCricketNumberMarks.push(Array.from(Array(7).fill(0)));
      this.allPlayerPoints.push(0);
    }
    this.currentPlayerRoundMarks = [...this.allPlayerRoundMarks[0]];
    this.currentPlayerCricketNumberMarks = [
      ...this.allPlayerCricketNumberMarks[0],
    ];
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
      roundItems: this.currentPlayerRoundMarks.map((x, index) => ({
        round: index + 1,
        points: [...x],
      })),
    };
  }

  private get vbRoundThrow(): Partial<SiRoundThrow> {
    return {
      roundThrow: this.roundThrow,
    };
  }

  private get vbCricketDisplay(): Partial<CricketDisplay> {
    return {
      numbers: this.cricketNumberStatus,
      allPlayerMarks: this.allPlayerCricketNumberMarks,
      playerNum: this.playerNum,
    };
  }

  private get vbPlayerCardListWithPoint(): Partial<PlayerCardListWithPoint> {
    return {
      points: this.allPlayerPoints,
      currentPlayer: this.currentPlayer,
      isTop: this.playerNum >= 3 ? 'min' : 'max',
    };
  }

  /** 対象のクリケットナンバーがクローズしているかどうかの判定 */
  private isClosed(targetCricketNumberIndex: number): boolean {
    return (
      this.playerNum !== 1 &&
      this.allPlayerCricketNumberMarks.every(
        x => x[targetCricketNumberIndex] === 3
      )
    );
  }

  /** 対象のクリケットナンバーをクローズしようとしているかどうかの判定 */
  private isClosing(targetIndex: number, targetMarkNumber: number): boolean {
    return (
      this.playerNum !== 1 &&
      this.allPlayerCricketNumberMarks
        .filter((_x, index) => index !== this.currentPlayer - 1)
        .every(x => x[targetIndex] === 3) &&
      this.currentPlayerCricketNumberMarks[targetIndex] === targetMarkNumber
    );
  }

  /** 点数加算処理 */
  private addPoint(
    targetPlayer: number,
    targetIndex: number,
    cricketNumber: number
  ) {
    const targetMarks = this.currentPlayerCricketNumberMarks[targetIndex];
    if (this.currentPlayerCricketNumberMarks[targetIndex] <= 3) return;

    this.currentPlayerCricketNumberMarks.splice(targetIndex, 1, 3);
    const point = cricketNumber * (targetMarks - 3);

    if (this.playerNum < 3) {
      this.allPlayerPoints[targetPlayer] += point;
      return;
    }

    this.allPlayerCricketNumberMarks.forEach((x, index) => {
      if (index !== targetPlayer && x[targetIndex] < 3) {
        this.allPlayerPoints[index] += point;
      }
    });
  }

  private onFinally() {
    const index = this.currentPlayerIndex;

    this.allPlayerCricketNumberMarks.splice(index, 1, [
      ...this.currentPlayerCricketNumberMarks,
    ]);

    this.allPlayerPoints = [...this.allPlayerPoints];

    this.allPlayerRoundMarks.splice(index, 1, [
      ...this.currentPlayerRoundMarks,
    ]);
  }

  private get isEnd(): boolean {
    const myPoint = this.allPlayerPoints[this.currentPlayerIndex];
    if (!this.currentPlayerCricketNumberMarks.every(x => x === 3)) {
      return false;
    } else if (this.playerNum >= 3) {
      return Math.min(...this.allPlayerPoints) === myPoint;
    } else if (this.playerNum <= 2) {
      return Math.max(...this.allPlayerPoints) === myPoint;
    } else {
      return false;
    }
  }

  private setRoundMarks(mark: string) {
    const roundMarks = this.currentPlayerRoundMarks[this.currentRoundIndex];
    roundMarks.splice(this.currentThrowIndex, 1, mark);
    this.currentPlayerRoundMarks.splice(this.currentRoundIndex, 1, roundMarks);
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
        this.allPlayerRoundMarks.splice(
          nextPlayer - 1,
          1,
          this.currentPlayerRoundMarks
        );

        this.allPlayerCricketNumberMarks.splice(
          nextPlayer - 1,
          1,
          this.currentPlayerCricketNumberMarks
        );

        this.currentPlayerRoundMarks = [
          ...this.allPlayerRoundMarks[nextPlayer],
        ];
        this.currentPlayerCricketNumberMarks = [
          ...this.allPlayerCricketNumberMarks[nextPlayer],
        ];
      },
      onSingleBull: (key: string) => {
        try {
          const index = this.currentPlayerCricketNumberMarks.length - 1;
          if (this.isClosed(index)) {
            return {
              sound: soundMissShot,
              result: key,
            };
          }

          const count = this.currentPlayerCricketNumberMarks[index];
          this.currentPlayerCricketNumberMarks.splice(index, 1, count + 1);
          this.addPoint(this.currentPlayerIndex, index, 25);

          if (this.isClosing(index, 3)) {
            this.setRoundMarks('／');

            this.cricketNumberStatus[index].isClose = true;
            return {
              sound: soundCricketClose,
              result: key,
              isEnd: this.isEnd,
            };
          } else {
            this.setRoundMarks('／');

            return {
              sound: soundBullShot,
              result: key,
              isEnd: this.isEnd,
            };
          }
        } finally {
          this.onFinally();
        }
      },
      onDoubleBull: (key: string) => {
        try {
          const index = this.currentPlayerCricketNumberMarks.length - 1;
          if (this.isClosed(index)) {
            return {
              sound: soundMissShot,
              result: key,
            };
          }

          const count = this.currentPlayerCricketNumberMarks[index];
          this.currentPlayerCricketNumberMarks.splice(index, 1, count + 2);
          this.addPoint(this.currentPlayerIndex, index, 25);

          if (this.isClosing(index, 4)) {
            this.setRoundMarks('／');

            this.cricketNumberStatus[index].isClose = true;
            return {
              sound: soundCricketClose,
              result: key,
              isEnd: this.isEnd,
            };
          } else if (this.isClosing(index, 3)) {
            this.setRoundMarks('×');

            this.cricketNumberStatus[index].isClose = true;
            return {
              sound: soundCricketClose,
              result: key,
              isEnd: this.isEnd,
            };
          } else {
            this.setRoundMarks('×');

            return {
              sound: soundInnerBullShot,
              result: key,
              isEnd: this.isEnd,
            };
          }
        } finally {
          this.onFinally();
        }
      },
      onInnerSingle: (key: string, point: number) => {
        try {
          const index = this.cricketNumbers.findIndex(x => x === point);
          if (index < 0 || this.isClosed(index)) {
            return {
              sound: soundMissShot,
              result: key,
            };
          }

          const count = this.currentPlayerCricketNumberMarks[index];
          this.currentPlayerCricketNumberMarks.splice(index, 1, count + 1);
          this.addPoint(this.currentPlayerIndex, index, point);

          if (this.isClosing(index, 3)) {
            this.setRoundMarks('／');

            this.cricketNumberStatus[index].isClose = true;
            return {
              sound: soundCricketClose,
              result: key,
              isEnd: this.isEnd,
            };
          } else {
            this.setRoundMarks('／');

            return {
              sound: soundCricketHit,
              result: key,
              isEnd: this.isEnd,
            };
          }
        } finally {
          this.onFinally();
        }
      },
      onOuterSingle: (key: string, point: number) => {
        try {
          const index = this.cricketNumbers.findIndex(x => x === point);
          if (index < 0 || this.isClosed(index)) {
            return {
              sound: soundMissShot,
              result: key,
            };
          }

          const count = this.currentPlayerCricketNumberMarks[index];
          this.currentPlayerCricketNumberMarks.splice(index, 1, count + 1);
          this.addPoint(this.currentPlayerIndex, index, point);

          if (this.isClosing(index, 3)) {
            this.setRoundMarks('／');

            this.cricketNumberStatus[index].isClose = true;
            return {
              sound: soundCricketClose,
              result: key,
              isEnd: this.isEnd,
            };
          } else {
            this.setRoundMarks('／');

            return {
              sound: soundCricketHit,
              result: key,
              isEnd: this.isEnd,
            };
          }
        } finally {
          this.onFinally();
        }
      },
      onDouble: (key: string, point: number) => {
        try {
          const index = this.cricketNumbers.findIndex(x => x === point);
          if (index < 0 || this.isClosed(index)) {
            return {
              sound: soundMissShot,
              result: key,
            };
          }

          const count = this.currentPlayerCricketNumberMarks[index];
          this.currentPlayerCricketNumberMarks.splice(index, 1, count + 2);
          this.addPoint(this.currentPlayerIndex, index, point);

          if (this.isClosing(index, 4)) {
            this.setRoundMarks('／');

            this.cricketNumberStatus[index].isClose = true;
            return {
              sound: soundCricketClose,
              result: key,
              isEnd: this.isEnd,
            };
          } else if (this.isClosing(index, 3)) {
            this.setRoundMarks('×');

            this.cricketNumberStatus[index].isClose = true;
            return {
              sound: soundCricketClose,
              result: key,
              isEnd: this.isEnd,
            };
          } else {
            this.setRoundMarks('×');

            return {
              sound: soundCricketHit,
              soundTimes: 2,
              soundSpanMs: 300,
              result: key,
              isEnd: this.isEnd,
            };
          }
        } finally {
          this.onFinally();
        }
      },
      onTriple: (key: string, point: number) => {
        try {
          const index = this.cricketNumbers.findIndex(x => x === point);
          if (index < 0 || this.isClosed(index)) {
            return {
              sound: soundMissShot,
              result: key,
              isEnd: this.isEnd,
            };
          }

          const count = this.currentPlayerCricketNumberMarks[index];
          this.currentPlayerCricketNumberMarks.splice(index, 1, count + 3);
          this.addPoint(this.currentPlayerIndex, index, point);

          if (this.isClosing(index, 5)) {
            this.setRoundMarks('／');

            this.cricketNumberStatus[index].isClose = true;
            return {
              sound: soundCricketClose,
              result: key,
              isEnd: this.isEnd,
            };
          } else if (this.isClosing(index, 4)) {
            this.setRoundMarks('×');

            this.cricketNumberStatus[index].isClose = true;
            return {
              sound: soundCricketClose,
              result: key,
              isEnd: this.isEnd,
            };
          } else if (this.isClosing(index, 3)) {
            this.setRoundMarks('⊗');

            this.cricketNumberStatus[index].isClose = true;
            return {
              sound: soundCricketClose,
              result: key,
              isEnd: this.isEnd,
            };
          } else {
            this.setRoundMarks('⊗');

            return {
              sound: soundCricketHit,
              soundTimes: 3,
              soundSpanMs: 200,
              result: key,
              isEnd: this.isEnd,
            };
          }
        } finally {
          this.onFinally();
        }
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
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
