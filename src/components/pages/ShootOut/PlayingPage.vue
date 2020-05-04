<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="4">
        <playing-left-content v-bind="vbPlayingLeftContent" />
      </el-col>
      <el-col :span="16">
        <div class="center-content">
          <div class="content">
            <div style="font-size: 0.25em;">Now ×{{ currentOpenAreas }}</div>
            <shoot-out-darts-board v-bind="vbShootOutDartsBoard" />
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
import ShootOutDartsBoard from '~/components/organism/ShootOutDartsBoard.vue';
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
    ShootOutDartsBoard,
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
  private hitNumbers: Set<number>[] = [];
  private currentNumbers: Set<number> = new Set<number>();
  private openAreas: number[] = [];
  private currentOpenAreas: number = 0;

  public created() {
    this.keyDownCallbacks = this.generateKeyDownCallbacks();

    this.points = [];
    for (let i = 1; i <= this.playerNum; i++) {
      this.openAreas.push(1);
      this.hitNumbers.push(new Set<number>());
      this.points.push(Array.from(Array(this.totalRound).fill(0)));
    }
    this.currentOpenAreas = this.openAreas[0];
    this.roundPoints = [...this.points[0]];
    this.currentNumbers = this.hitNumbers[0];
  }

  public mounted() {
    this.$nextTick(async () => {
      await this.showStartDialog(
        this.gameStartDialog.show,
        this.gameStartDialog.hide
      );
    });
  }

  private get vbShootOutDartsBoard(): Partial<ShootOutDartsBoard> {
    return {
      hitNumbers: this.currentNumbers,
      suggestNumber: this.suggestNumber,
    };
  }

  private get suggestNumber(): number {
    if (this.currentNumbers.size === 21) {
      return 21;
    }
    const dartsRest =
      this.totalRound * 3 -
      (this.currentRoundIndex * 3 + this.currentThrowIndex);
    const areaRest = Array.from(new Array(21))
      .map((_x, index) => index + 1)
      .filter(x => !this.currentNumbers.has(x));
    areaRest.sort(
      (a, b) =>
        (a === BULL_INDEX ? 50 : a * 3) - (b === BULL_INDEX ? 50 : b * 3)
    );
    const index = Math.max(0, areaRest.length - dartsRest);
    return areaRest[index];
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

  private generateKeyDownCallbacks(): KeyDownCallbacks {
    return {
      showDialog: () => {
        if (this.dialog) this.dialog.show();
      },
      hideDialog: () => {
        if (this.dialog) this.dialog.hide();
      },
      onChangeRound: (nextRound, nextPlayer) => {
        this.openAreas.splice(nextPlayer - 1, 1, this.currentOpenAreas);
        this.currentOpenAreas = this.openAreas[nextPlayer];

        this.hitNumbers.splice(nextPlayer - 1, 1, this.currentNumbers);
        this.currentNumbers = this.hitNumbers[nextPlayer];

        this.points.splice(nextPlayer - 1, 1, this.roundPoints);
        this.roundPoints = [...this.points[nextPlayer]];
      },
      onSingleBull: (key: string) => {
        if (
          this.currentNumbers.size !== 21 &&
          this.currentNumbers.has(BULL_INDEX)
        ) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

        const currentPoint =
          this.roundPoints[this.currentRoundIndex] + 50 * this.currentOpenAreas;
        this.currentNumbers.add(BULL_INDEX);
        this.currentNumbers = new Set(this.currentNumbers);
        if (this.currentOpenAreas !== 21) this.currentOpenAreas++;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundBullShot,
          result: key,
        };
      },
      onDoubleBull: (key: string) => {
        if (
          this.currentNumbers.size !== 21 &&
          this.currentNumbers.has(BULL_INDEX)
        ) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

        const currentPoint =
          this.roundPoints[this.currentRoundIndex] + 50 * this.currentOpenAreas;
        this.currentNumbers.add(BULL_INDEX);
        this.currentNumbers = new Set(this.currentNumbers);
        if (this.currentOpenAreas !== 21) this.currentOpenAreas++;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundInnerBullShot,
          result: key,
        };
      },
      onInnerSingle: (key: string, point: number) => {
        if (this.currentNumbers.has(point)) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

        const currentPoint =
          this.roundPoints[this.currentRoundIndex] +
          point * this.currentOpenAreas;
        this.currentNumbers.add(point);
        this.currentNumbers = new Set(this.currentNumbers);
        if (this.currentOpenAreas !== 21) this.currentOpenAreas++;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundNormalShot,
          result: key,
        };
      },
      onOuterSingle: (key: string, point: number) => {
        if (this.currentNumbers.has(point)) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

        const currentPoint =
          this.roundPoints[this.currentRoundIndex] +
          point * this.currentOpenAreas;
        this.currentNumbers.add(point);
        this.currentNumbers = new Set(this.currentNumbers);
        if (this.currentOpenAreas !== 21) this.currentOpenAreas++;
        this.roundPoints.splice(this.currentRoundIndex, 1, currentPoint);
        this.points.splice(this.currentPlayerIndex, 1, [...this.roundPoints]);
        return {
          sound: soundNormalShot,
          result: key,
        };
      },
      onDouble: (key: string, point: number) => {
        if (this.currentNumbers.has(point)) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

        const currentPoint =
          this.roundPoints[this.currentRoundIndex] +
          point * 2 * this.currentOpenAreas;
        this.currentNumbers.add(point);
        this.currentNumbers = new Set(this.currentNumbers);
        if (this.currentOpenAreas !== 21) this.currentOpenAreas++;
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
        if (this.currentNumbers.has(point)) {
          return {
            sound: soundMissShot,
            result: key,
          };
        }

        const currentPoint =
          this.roundPoints[this.currentRoundIndex] +
          point * 3 * this.currentOpenAreas;
        this.currentNumbers.add(point);
        this.currentNumbers = new Set(this.currentNumbers);
        if (this.currentOpenAreas !== 21) this.currentOpenAreas++;
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
