import { Component, Vue, Getter, Mutation } from 'nuxt-property-decorator';

import MenuPage from '~/components/pages/MenuPage.vue';

@Component({
  components: { MenuPage },
})
export default class extends Vue {
  @Getter('playerNum')
  protected readonly playerNum!: number;

  @Mutation('setPlayerNum')
  protected setPlayerNum!: (playerNum: number) => void;

  protected get vmPlayerNum(): number {
    return this.playerNum;
  }
  protected set vmPlayerNum(playerNum: number) {
    this.setPlayerNum(playerNum);
  }

  public created() {
    this.setPlayerNum(0);
  }
}
