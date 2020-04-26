import { Component, Vue, Getter, Mutation } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';

@Component
export default class extends Vue {
  public fetch({ store, redirect }: Context) {
    const playerNum = store.getters['playerNum'];
    if (playerNum === 0) {
      redirect(200, '/');
    }
  }

  @Getter('playerNum')
  protected readonly playerNum!: number;

  @Mutation('setPlayerNum')
  protected setPlayerNum!: (playerNum: number) => void;

  public destroyed() {
    this.setPlayerNum(0);
  }
}
