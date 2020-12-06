import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { keyBind } from '~/components/constManager';
import {
  KeyDownCallbacks,
  DartResultProperty,
} from '~/components/interfaceManager';

import {
  soundStart,
  soundThrowStart,
  soundChange,
} from '~/assets/soundCatalog';

import { sleep } from '~/utils/commonUtil';
import SoundUtil from '~/utils/soundUtil';

@Component
export default class PlayingBaseComponent extends Vue {
  @Prop({ default: 1 })
  public readonly playerNum!: number;

  @Prop({ default: '' })
  public readonly gameTitle!: string;

  @Prop({ default: 8 })
  public readonly totalRound!: number;

  protected roundThrow: string[] = [...Array(3).fill('')];
  protected keyDownCallbacks: KeyDownCallbacks = {
    showDialog: () => {},
    hideDialog: () => {},
    onChangeRound: () => {},
    onSingleBull: _key => ({ result: '', sound: '' }),
    onDoubleBull: _key => ({ result: '', sound: '' }),
    onInnerSingle: (_key, _number) => ({ result: '', sound: '' }),
    onOuterSingle: (_key, _number) => ({ result: '', sound: '' }),
    onDouble: (_key, _number) => ({ result: '', sound: '' }),
    onTriple: (_key, _number) => ({ result: '', sound: '' }),
  };

  private roundIndex: number = 0;
  private throwIndex: number = 0;
  private playerIndex: number = 0;
  private readonly KEY_DOWN_INTERVAL_MS = 1000;

  public created() {
    if (this.playerNum === 0) this.$router.push('/');
  }

  public destroyed() {
    document.removeEventListener('keydown', this.keyDownEvent);
  }

  protected showStartDialog(showDialog: () => void, hideDialog: () => void) {
    showDialog();
    SoundUtil.playSound(soundStart, () => {
      hideDialog();
      document.addEventListener('keydown', this.keyDownEvent);
      SoundUtil.playSound(soundThrowStart);
    });
  }

  protected get currentRound(): number {
    return this.roundIndex + 1;
  }
  protected get currentPlayer(): number {
    return this.playerIndex + 1;
  }

  protected get currentRoundIndex(): number {
    return this.roundIndex;
  }
  protected get currentPlayerIndex(): number {
    return this.playerIndex;
  }
  protected get currentThrowIndex(): number {
    return this.throwIndex;
  }

  private get isFinalRound(): boolean {
    return (
      this.roundIndex + 1 === this.totalRound &&
      this.playerIndex + 1 === this.playerNum
    );
  }

  private async onPressEnter({
    showDialog,
    hideDialog,
    onChangeRound,
  }: KeyDownCallbacks) {
    // 最終ターンの場合はホームに戻る
    if (this.isFinalRound) {
      this.$router.push('/');
      return;
    }

    // Remove Dartsのメッセージを出し、次のプレイヤーに
    SoundUtil.playSound(soundChange);
    if (showDialog && hideDialog) {
      showDialog();
      await sleep(3000);
    }

    this.playerIndex = (this.playerIndex + 1) % this.playerNum;
    if (this.playerIndex === 0) this.roundIndex++;
    this.throwIndex = 0;
    this.roundThrow = [...Array(3).fill('')];

    // ターンチェンジ時の処理（チェンジ後の情報を渡す）
    onChangeRound(this.roundIndex, this.playerIndex);

    if (hideDialog) {
      hideDialog();
    }
    await SoundUtil.playSound(soundThrowStart);
  }

  private async keyDownEvent(e: KeyboardEvent) {
    document.removeEventListener('keydown', this.keyDownEvent);
    try {
      // Escapeが押された場合は、いかなる場合でもホームに戻る
      if (e.key === 'Escape') {
        this.$router.push('/');
        return;
      }

      const callbacks = this.keyDownCallbacks;

      // Enterが押された場合
      if (keyBind[e.key] === 'Enter') {
        await this.onPressEnter(callbacks);
        return;
      }

      // キーバインド外 or 3投後は何もしない
      if (this.throwIndex >= 3 || !Object.keys(keyBind).includes(e.key)) {
        return;
      }

      const [times, area, side] = keyBind[e.key].split(' ');
      const key = `${times} ${area}`;
      let result: DartResultProperty | null = null;

      if (area === 'Bull') {
        if (times === 'Single') {
          result = callbacks.onSingleBull(key);
        } else if (times === 'Double') {
          result = callbacks.onDoubleBull(key);
        }
      } else {
        const point = Number(area);
        if (times === 'Single') {
          if (side === 'Inner') {
            result = callbacks.onInnerSingle(key, point);
          } else if (side === 'Outer') {
            result = callbacks.onOuterSingle(key, point);
          }
        } else if (times === 'Double') {
          result = callbacks.onDouble(key, point);
        } else if (times === 'Triple') {
          result = callbacks.onTriple(key, point);
        }
      }

      if (!result) return;

      this.roundThrow.splice(this.throwIndex, 1, result.result);

      if (result.sound) {
        if (result.soundTimes && result.soundTimes >= 2) {
          await SoundUtil.playSound(
            result.sound,
            undefined,
            result.soundTimes,
            result.soundSpanMs
          );
        } else {
          await SoundUtil.playSound(result.sound);
        }
      }

      if (result.isEnd) {
        this.$router.push('/');
        return;
      }

      if (result.isNextTurn) {
        this.throwIndex = 3;
      } else {
        this.throwIndex++;
      }
    } finally {
      // 誤動作を防ぐため、キーイベントの復帰にインターバルを設ける
      await sleep(this.KEY_DOWN_INTERVAL_MS);
      document.addEventListener('keydown', this.keyDownEvent);
    }
  }
}
