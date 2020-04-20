<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="4">
        <div class="game-detail">Count Up</div>
        <div class="margin-top game-detail">
          Round {{ currentRound }} / {{ totalRound }}
        </div>
        <div v-for="item in displayRoundPoints" :key="item.round">
          <el-row>
            <el-col :span="6" class="round-num"> R{{ item.round }} </el-col>
            <el-col :span="18" class="round-detail"> {{ item.point }} </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="center-content">
          <div class="content">{{ totalPoint }}</div>
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
  soundBullShot,
  soundThrowStart,
  soundChange,
  soundInnerBullShot,
  soundNormalShot,
  soundStart,
  soundBust,
} from '~/assets/soundCatalog';

@Component({
  components: { PlayerCardListWithPoint, PlayerChangeDialog, GameStartDialog },
})
export default class PlayingPage extends Vue {
  @Prop({ default: 1 })
  public readonly playerNum!: number;
  @Prop({ default: 8 })
  public readonly totalRound!: number;
  @Prop({ default: 301 })
  public readonly initPoint!: number;
  @Prop({ default: '' })
  public readonly gameTitle!: string;

  @Ref('dialog')
  private readonly dialog!: PlayerChangeDialog;
  @Ref('gameStartDialog')
  private readonly gameStartDialog!: GameStartDialog;

  private currentRound: number = 1;
  private currentThrow: number = 1;
  private currentPlayer: number = 1;

  private points: number[][];
  private roundPoints: number[];
  private roundThrow: string[] = Array(3).fill('');

  constructor() {
    super();

    this.points = [];
    for (let i = 1; i <= this.playerNum; i++) {
      this.points.push(Array.from(Array(this.totalRound).fill(0)));
    }
    this.roundPoints = [...this.points[0]];
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

  private get displayRoundPoints() {
    if (this.totalRound <= 8) {
      return this.roundPoints.map((x, index) => ({
        round: index + 1,
        point: x,
      }));
    } else if (this.currentRound <= 8) {
      return this.roundPoints
        .map((x, index) => ({
          round: index + 1,
          point: x,
        }))
        .filter(x => x.round <= 8);
    } else {
      return this.roundPoints
        .map((x, index) => ({ round: index + 1, point: x }))
        .filter(
          x => x.round >= this.currentRound - 7 && x.round <= this.currentRound
        );
    }
  }

  private get totalPoint(): number {
    return (
      this.initPoint -
      this.roundPoints.reduce((prev, current) => prev + current)
    );
  }

  private get pointsSum(): number[] {
    return this.points.map(
      x => this.initPoint - x.reduce((prev, current) => prev + current)
    );
  }

  private get vbPlayerCardListWithPoint(): Partial<PlayerCardListWithPoint> {
    return { points: this.pointsSum, currentPlayer: this.currentPlayer };
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
          this.points[this.currentPlayer - 1] = [...this.roundPoints];
          this.points = [...this.points];
          if (this.currentPlayer === this.playerNum) {
            this.currentRound++;
            this.currentPlayer = 1;
          } else {
            this.currentPlayer++;
          }
          this.roundPoints = [...this.points[this.currentPlayer - 1]];
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
            if (area[0] === 'Single') {
              const sound = new Audio(soundBullShot);
              sound.play();
            } else if (area[0] === 'Double') {
              const sound = new Audio(soundInnerBullShot);
              sound.play();
            }
            this.roundPoints[this.currentRound - 1] += 50;
          } else {
            const point = Number(area[1]);
            if (area[0] === 'Single') {
              const sound = new Audio(soundNormalShot);
              sound.play();
              this.roundPoints[this.currentRound - 1] += point;
            } else if (area[0] === 'Double') {
              const sound = new Audio(soundNormalShot);
              sound.play();
              await sleep(100);
              sound.currentTime = 0;
              sound.play();
              this.roundPoints[this.currentRound - 1] += point * 2;
            } else if (area[0] === 'Triple') {
              const sound = new Audio(soundNormalShot);
              sound.play();
              await sleep(100);
              sound.currentTime = 0;
              sound.play();
              await sleep(100);
              sound.currentTime = 0;
              sound.play();
              this.roundPoints[this.currentRound - 1] += point * 3;
            }
          }

          this.roundPoints = [...this.roundPoints];
          if (this.totalPoint < 0) {
            const sound = new Audio(soundBust);
            sound.play();
            this.roundThrow[this.currentThrow - 1] = 'Bust';
            this.roundPoints[this.currentRound - 1] = 0;
            this.currentThrow = 4;
            return;
          } else if (this.totalPoint === 0) {
            this.$router.push('/');
            return;
          }
          this.currentThrow++;

          this.points[this.currentPlayer - 1] = [...this.roundPoints];
          this.points = [...this.points];
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
