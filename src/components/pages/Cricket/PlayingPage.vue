<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="4">
        <div class="game-detail two-line">{{ gameTitle }}</div>
        <div class="margin-top game-detail">
          Round {{ currentRound }} / {{ totalRound }}
        </div>
        <div v-for="item in displayRoundMarks" :key="item.round">
          <el-row>
            <el-col :span="6" class="round-num"> R{{ item.round }} </el-col>
            <el-col :span="18" class="round-detail"> {{ item.point }} </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="center-content">
          <div class="content">
            <div :class="playerNum >= 3 ? 'cell player1' : 'cell player1 none'">
              <template v-if="playerNum >= 3">
                <div
                  v-for="(mark, index) in cricketMarks[0]"
                  :key="index"
                  class="number"
                >
                  <span v-if="mark === 0"></span>
                  <span v-else-if="mark === 1">／</span>
                  <span v-else-if="mark === 2">×</span>
                  <span v-else-if="mark === 3">⊗</span>
                </div>
              </template>
            </div>
            <div :class="playerNum >= 3 ? 'cell player2' : 'cell player1'">
              <div
                v-for="(mark, index) in cricketMarks[playerNum >= 3 ? 1 : 0]"
                :key="index"
                class="number"
              >
                <span v-if="mark === 0"></span>
                <span v-else-if="mark === 1">／</span>
                <span v-else-if="mark === 2">×</span>
                <span v-else-if="mark === 3">⊗</span>
              </div>
            </div>
            <div class="cell center">
              <div
                v-for="(item, index) in displayCricketNumbers"
                :key="index"
                :class="item.isClose ? 'number close' : 'number'"
              >
                {{ item.number }}
              </div>
            </div>
            <div
              :class="
                playerNum === 1
                  ? 'cell none'
                  : playerNum >= 3
                  ? 'cell player3'
                  : 'cell player2'
              "
            >
              <template v-if="playerNum >= 2">
                <div
                  v-for="(mark, index) in cricketMarks[playerNum >= 3 ? 2 : 1]"
                  :key="index"
                  class="number"
                >
                  <span v-if="mark === 0"></span>
                  <span v-else-if="mark === 1">／</span>
                  <span v-else-if="mark === 2">×</span>
                  <span v-else-if="mark === 3">⊗</span>
                </div>
              </template>
            </div>
            <div :class="playerNum >= 4 ? 'cell player4' : 'cell none'">
              <template v-if="playerNum >= 4">
                <div
                  v-for="(mark, index) in cricketMarks[3]"
                  :key="index"
                  class="number"
                >
                  <span v-if="mark === 0"></span>
                  <span v-else-if="mark === 1">／</span>
                  <span v-else-if="mark === 2">×</span>
                  <span v-else-if="mark === 3">⊗</span>
                </div>
              </template>
            </div>
          </div>
          <player-card-list-with-point v-bind="vbPlayerCardListWithPoint" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="game-detail">Result</div>
        <div v-for="(item, index) in roundThrow" :key="index">
          <el-row>
            <el-col :span="4" class="round-num"> {{ index + 1 }} </el-col>
            <el-col :span="20" class="round-detail"> {{ item }} </el-col>
          </el-row>
        </div>
      </el-col>
      <player-change-dialog ref="dialog" />
      <game-start-dialog ref="gameStartDialog" :game-title="gameTitle" />
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref } from 'nuxt-property-decorator';

import PlayerCardListWithPoint from '~/components/organism/PlayerCardListWithPoint.vue';
import PlayerChangeDialog from '~/components/organism/PlayerChangeDialog.vue';
import GameStartDialog from '~/components/organism/GameStartDialog.vue';
import { keyBind } from '~/components/constManager';
import { sleep } from '~/utils/commonUtil';

import {
  soundStart,
  soundThrowStart,
  soundChange,
  soundBullShot,
  soundInnerBullShot,
  soundCricketHit,
  soundCricketClose,
  soundMissShot,
} from '~/assets/soundCatalog';

@Component({
  components: { PlayerCardListWithPoint, PlayerChangeDialog, GameStartDialog },
})
export default class PlayingPage extends Vue {
  @Prop({ default: 1 })
  public readonly playerNum!: number;

  @Prop({ default: () => [] })
  public readonly cricketNumbers!: number[];

  @Prop({ default: '' })
  public readonly gameTitle!: string;

  @Ref('dialog')
  private readonly dialog!: PlayerChangeDialog;
  @Ref('gameStartDialog')
  private readonly gameStartDialog!: GameStartDialog;

  private cricketNumberStatus = this.cricketNumbers
    .map(x => `${x}`)
    .concat(['Bull'])
    .map(x => ({ number: x, isClose: false }));

  private totalRound: number = 15;
  private currentRound: number = 1;
  private currentThrow: number = 1;
  private currentPlayer: number = 1;

  private marks: string[][][];
  private cricketMarks: number[][];
  private roundMarks: string[][];
  private playerCricketMarks: number[];
  private playerPoints: number[];

  private roundThrow: string[] = Array(3).fill('');

  constructor() {
    super();

    this.marks = [];
    this.cricketMarks = [];
    this.playerPoints = [];
    for (let i = 1; i <= this.playerNum; i++) {
      this.marks.push(
        Array.from(Array(this.totalRound)).map(_x => ['-', '-', '-'])
      );
      this.cricketMarks.push(Array.from(Array(7).fill(0)));
      this.playerPoints.push(0);
    }
    this.roundMarks = [...this.marks[0]];
    this.playerCricketMarks = [...this.cricketMarks[0]];
  }

  public created() {
    if (this.playerNum === 0) this.$router.push('/');
  }

  public async mounted() {
    this.gameStartDialog.show();
    const sound = new Audio(soundStart);
    await sound.play();
    sound.addEventListener('ended', _e => {
      this.gameStartDialog.hide();
      document.addEventListener('keydown', this.keyDownEvent);
      const sound2 = new Audio(soundThrowStart);
      sound2.play();
    });
  }

  public destroyed() {
    document.removeEventListener('keydown', this.keyDownEvent);
  }

  private get displayRoundMarks() {
    if (this.totalRound <= 8) {
      return this.roundMarks.map((x, index) => ({
        round: index + 1,
        point: x.join(' '),
      }));
    } else if (this.currentRound <= 8) {
      return this.roundMarks
        .map((x, index) => ({
          round: index + 1,
          point: x.join(' '),
        }))
        .filter(x => x.round <= 8);
    } else {
      return this.roundMarks
        .map((x, index) => ({ round: index + 1, point: x.join(' ') }))
        .filter(
          x => x.round >= this.currentRound - 7 && x.round <= this.currentRound
        );
    }
  }

  private get displayCricketNumbers() {
    return this.cricketNumberStatus;
  }

  private get vbPlayerCardListWithPoint(): Partial<PlayerCardListWithPoint> {
    return {
      points: this.playerPoints,
      currentPlayer: this.currentPlayer,
      isTop: this.playerNum >= 3 ? 'min' : 'max',
    };
  }

  private async keyDownEvent(e: KeyboardEvent) {
    document.removeEventListener('keydown', this.keyDownEvent);
    try {
      if (e.key === 'Enter') {
        if (
          this.currentRound === this.totalRound &&
          this.currentPlayer === this.playerNum
        ) {
          this.$router.push('/');
          return;
        } else {
          const sound = new Audio(soundChange);
          sound.play();
          if (this.dialog) {
            this.dialog.show();
            await sleep(3000);
            this.dialog.hide();
          }

          this.marks[this.currentPlayer - 1] = [...this.roundMarks];
          this.marks = [...this.marks];

          this.cricketMarks[this.currentPlayer - 1] = [
            ...this.playerCricketMarks,
          ];
          this.cricketMarks = [...this.cricketMarks];

          if (this.currentPlayer === this.playerNum) {
            this.currentRound++;
            this.currentPlayer = 1;
          } else {
            this.currentPlayer++;
          }

          this.roundMarks = [...this.marks[this.currentPlayer - 1]];
          this.playerCricketMarks = [
            ...this.cricketMarks[this.currentPlayer - 1],
          ];
          this.currentThrow = 1;
          this.roundThrow = Array(3).fill('');
        }
        const sound = new Audio(soundThrowStart);
        sound.play();
        return;
      } else if (e.key === 'Escape') {
        this.$router.push('/');
        return;
      }

      if (this.currentThrow <= 3) {
        if (Object.keys(keyBind).includes(e.key)) {
          this.roundThrow[this.currentThrow - 1] = keyBind[e.key];
          this.roundThrow = [...this.roundThrow];

          const area = keyBind[e.key].split(' ');
          if (area[1] === 'Bull') {
            if (
              this.playerNum !== 1 &&
              this.cricketMarks.every(
                x => x[this.playerCricketMarks.length - 1] === 3
              )
            ) {
              const sound = new Audio(soundMissShot);
              sound.play();
            } else {
              if (area[0] === 'Single') {
                this.playerCricketMarks[
                  this.playerCricketMarks.length - 1
                ] += 1;
                this.roundMarks[this.currentRound - 1][this.currentThrow - 1] =
                  '／';
                if (
                  this.playerNum !== 1 &&
                  this.cricketMarks
                    .filter((_x, index) => index !== this.currentPlayer - 1)
                    .every(x => x[this.playerCricketMarks.length - 1] >= 3) &&
                  this.playerCricketMarks[
                    this.playerCricketMarks.length - 1
                  ] === 3
                ) {
                  const sound = new Audio(soundCricketClose);
                  sound.play();
                  this.cricketNumberStatus[
                    this.playerCricketMarks.length - 1
                  ].isClose = true;
                } else {
                  const sound = new Audio(soundBullShot);
                  sound.play();
                }
              } else if (area[0] === 'Double') {
                this.playerCricketMarks[
                  this.playerCricketMarks.length - 1
                ] += 2;
                if (
                  this.playerNum !== 1 &&
                  this.cricketMarks
                    .filter((_x, index) => index !== this.currentPlayer - 1)
                    .every(x => x[this.playerCricketMarks.length - 1] >= 3) &&
                  this.playerCricketMarks[
                    this.playerCricketMarks.length - 1
                  ] === 4
                ) {
                  this.roundMarks[this.currentRound - 1][
                    this.currentThrow - 1
                  ] = '／';
                  const sound = new Audio(soundCricketClose);
                  sound.play();
                  this.cricketNumberStatus[
                    this.playerCricketMarks.length - 1
                  ].isClose = true;
                } else {
                  this.roundMarks[this.currentRound - 1][
                    this.currentThrow - 1
                  ] = '×';

                  if (
                    this.playerNum !== 1 &&
                    this.playerCricketMarks[
                      this.playerCricketMarks.length - 1
                    ] === 3
                  ) {
                    this.cricketNumberStatus[
                      this.playerCricketMarks.length - 1
                    ].isClose = true;
                    const sound = new Audio(soundCricketClose);
                    sound.play();
                  } else {
                    const sound = new Audio(soundInnerBullShot);
                    sound.play();
                  }
                }
              }

              if (
                this.playerCricketMarks[this.playerCricketMarks.length - 1] > 3
              ) {
                const overNum =
                  this.playerCricketMarks[this.playerCricketMarks.length - 1] -
                  3;
                this.playerCricketMarks[this.playerCricketMarks.length - 1] = 3;

                if (this.playerNum >= 3) {
                  this.cricketMarks.forEach((x, index) => {
                    if (index === this.currentPlayer - 1) return;
                    if (x[this.playerCricketMarks.length - 1] < 3) {
                      this.playerPoints[index] += 25 * overNum;
                    }
                  });
                } else {
                  this.playerPoints[this.currentPlayer - 1] += 25 * overNum;
                }
              }
            }
          } else {
            const point = Number(area[1]);
            const pointIndex = this.cricketNumbers.findIndex(x => x === point);
            if (pointIndex < 0) {
              const sound = new Audio(soundMissShot);
              sound.play();
            } else {
              if (
                this.playerNum !== 1 &&
                this.cricketMarks.every(x => x[pointIndex] === 3)
              ) {
                const sound = new Audio(soundMissShot);
                sound.play();
              } else if (area[0] === 'Single') {
                this.roundMarks[this.currentRound - 1][this.currentThrow - 1] =
                  '／';
                this.playerCricketMarks[pointIndex] += 1;
                if (
                  this.playerNum !== 1 &&
                  this.cricketMarks
                    .filter((_x, index) => index !== this.currentPlayer - 1)
                    .every(x => x[pointIndex] >= 3) &&
                  this.playerCricketMarks[pointIndex] === 3
                ) {
                  const sound = new Audio(soundCricketClose);
                  sound.play();
                  this.cricketNumberStatus[pointIndex].isClose = true;
                } else {
                  const sound = new Audio(soundCricketHit);
                  sound.play();
                }
              } else if (area[0] === 'Double') {
                this.playerCricketMarks[pointIndex] += 2;
                if (
                  this.playerNum !== 1 &&
                  this.cricketMarks
                    .filter((_x, index) => index !== this.currentPlayer - 1)
                    .every(x => x[pointIndex] >= 3) &&
                  this.playerCricketMarks[pointIndex] === 4
                ) {
                  this.roundMarks[this.currentRound - 1][
                    this.currentThrow - 1
                  ] = '／';
                  const sound = new Audio(soundCricketClose);
                  sound.play();
                  this.cricketNumberStatus[pointIndex].isClose = true;
                } else {
                  this.roundMarks[this.currentRound - 1][
                    this.currentThrow - 1
                  ] = '×';

                  if (
                    this.playerNum !== 1 &&
                    this.cricketMarks
                      .filter((_x, index) => index !== this.currentPlayer - 1)
                      .every(x => x[pointIndex] >= 3) &&
                    this.playerCricketMarks[pointIndex] === 3
                  ) {
                    this.cricketNumberStatus[pointIndex].isClose = true;
                    const sound = new Audio(soundCricketClose);
                    sound.play();
                  } else {
                    const sound = new Audio(soundCricketHit);
                    sound.play();
                    await sleep(300);
                    sound.currentTime = 0;
                    sound.play();
                  }
                }
              } else if (area[0] === 'Triple') {
                this.playerCricketMarks[pointIndex] += 3;
                if (
                  this.playerNum !== 1 &&
                  this.cricketMarks
                    .filter((_x, index) => index !== this.currentPlayer - 1)
                    .every(x => x[pointIndex] >= 3) &&
                  this.playerCricketMarks[pointIndex] === 4
                ) {
                  this.roundMarks[this.currentRound - 1][
                    this.currentThrow - 1
                  ] = '×';
                  const sound = new Audio(soundCricketClose);
                  sound.play();
                  this.cricketNumberStatus[pointIndex].isClose = true;
                } else if (
                  this.playerNum !== 1 &&
                  this.cricketMarks
                    .filter((_x, index) => index !== this.currentPlayer - 1)
                    .every(x => x[pointIndex] >= 3) &&
                  this.playerCricketMarks[pointIndex] === 5
                ) {
                  this.roundMarks[this.currentRound - 1][
                    this.currentThrow - 1
                  ] = '／';
                  const sound = new Audio(soundCricketClose);
                  sound.play();
                  this.cricketNumberStatus[pointIndex].isClose = true;
                } else {
                  this.roundMarks[this.currentRound - 1][
                    this.currentThrow - 1
                  ] = '⊗';

                  if (
                    this.playerNum !== 1 &&
                    this.cricketMarks
                      .filter((_x, index) => index !== this.currentPlayer - 1)
                      .every(x => x[pointIndex] >= 3) &&
                    this.playerCricketMarks[pointIndex] === 3
                  ) {
                    this.cricketNumberStatus[pointIndex].isClose = true;
                    const sound = new Audio(soundCricketClose);
                    sound.play();
                  } else {
                    const sound = new Audio(soundCricketHit);
                    sound.play();
                    await sleep(200);
                    sound.currentTime = 0;
                    sound.play();
                    await sleep(200);
                    sound.currentTime = 0;
                    sound.play();
                  }
                }
              }
              if (this.playerCricketMarks[pointIndex] > 3) {
                const overNum = this.playerCricketMarks[pointIndex] - 3;
                this.playerCricketMarks[pointIndex] = 3;
                if (this.playerNum >= 3) {
                  this.cricketMarks.forEach((x, index) => {
                    if (index === this.currentPlayer - 1) return;
                    if (x[pointIndex] < 3) {
                      this.playerPoints[index] += point * overNum;
                    }
                  });
                } else {
                  this.playerPoints[pointIndex] += point * overNum;
                }
              }
            }
          }

          if (this.playerCricketMarks.every(x => x === 3)) {
            if (
              this.playerNum >= 3 &&
              Math.min(...this.playerPoints) ===
                this.playerPoints[this.currentPlayer - 1]
            ) {
              this.$router.push('/');
            } else if (
              this.playerNum <= 2 &&
              Math.max(...this.playerPoints) ===
                this.playerPoints[this.currentPlayer - 1]
            ) {
              this.$router.push('/');
            }
          }

          this.currentThrow++;

          this.cricketNumberStatus = [...this.cricketNumberStatus];

          this.playerCricketMarks = [...this.playerCricketMarks];
          this.cricketMarks[this.currentPlayer - 1] = [
            ...this.playerCricketMarks,
          ];
          this.cricketMarks = [...this.cricketMarks];

          this.playerPoints = [...this.playerPoints];

          this.roundMarks[this.currentPlayer - 1] = [
            ...this.roundMarks[this.currentPlayer - 1],
          ];
          this.roundMarks = [...this.roundMarks];
          this.marks[this.currentPlayer - 1] = [...this.roundMarks];
          this.marks = [...this.marks];
        }
      }
    } finally {
      document.addEventListener('keydown', this.keyDownEvent);
    }
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
  height: 50px;

  &.two-line {
    font-size: 1em;
  }

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
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content {
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    padding: 20px 150px;

    .cell {
      height: 100%;
      width: 14%;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 3px solid black;
      border-radius: 10px;

      &.player1 {
        border-color: #ff6969;
        color: #ff6969;
      }

      &.player2 {
        border-color: #6ec4ff;
        color: #6ec4ff;
      }

      &.player3 {
        border-color: #f9bf4b;
        color: #f9bf4b;
      }

      &.player4 {
        border-color: #44d37e;
        color: #44d37e;
      }

      &.none {
        background-color: transparent;
        border: none;
      }

      &.center {
        width: 20%;
      }

      .number {
        font-size: 2.4em;
        text-align: center;
        height: 14%;

        &.close {
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
