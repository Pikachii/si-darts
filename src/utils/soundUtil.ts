import { sleep } from '~/utils/commonUtil';

export default class SoundUtil {
  public static async playSound(
    src: string,
    onSoundEnded?: (e: Event) => void | Promise<void>,
    times: number = 1,
    spanMs: number = 100
  ) {
    const audio = new Audio(src);
    if (onSoundEnded) audio.addEventListener('ended', e => onSoundEnded(e));
    audio.play();
    for (let i = 0; i < times - 1; i++) {
      await sleep(spanMs);
      audio.currentTime = 0;
      audio.play();
    }
  }
}
