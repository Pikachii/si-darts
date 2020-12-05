<template>
  <div id="menu-main-content">
    <si-steps style="width: 100%" v-bind="vbSteps" />
    <div id="content">
      <game-menu v-if="index === 0" v-bind="vbGameMenu" @next="next" />
      <player-select
        v-else-if="index === 1"
        v-model="vmPlayerSelect"
        v-bind="vbPlayerSelect"
        @next="next"
      />
      <game-start v-else v-bind="vbGameStart" @next="toPlaying" />
    </div>
    <div style="height: 55px">
      <player-card-list v-bind="vbPlayerCardList" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Model, Emit, Prop } from 'nuxt-property-decorator';
import { SiSteps } from '~/components/atomsCatalog';
import PlayerCardList from '~/components/organism/PlayerCardList.vue';
import GameMenu from '~/components/organism/GameMenu.vue';
import GameStart from '~/components/organism/GameStart.vue';
import PlayerSelect from '~/components/organism/PlayerSelect.vue';

import { sleep } from '~/utils/commonUtil';

@Component({
  components: {
    GameMenu,
    GameStart,
    PlayerCardList,
    PlayerSelect,
    SiSteps,
  },
})
export default class MenuPage extends Vue {
  @Model('change') private readonly playerNum!: number;
  @Emit('change') emChangePlayerNum(_: number) {}
  @Prop({ default: '' })
  public readonly titleLabel!: string;
  @Prop({ default: '' })
  public readonly description!: string;
  @Prop({ default: '' })
  public readonly imgSrc!: string;

  private index: number = 0;

  private get vmPlayerSelect(): number {
    return this.playerNum;
  }
  private set vmPlayerSelect(playerNum: number) {
    this.emChangePlayerNum(playerNum);
  }

  private get vbSteps(): Partial<SiSteps> {
    return {
      space: '100%',
      active: this.index,
      alignCenter: true,
      steps: [
        { title: 'Game Select' },
        { title: 'Player Select' },
        { title: 'Option Select' },
      ],
      finishStatus: 'success',
    };
  }

  private get vbGameMenu(): Partial<GameMenu> {
    return {
      imgSrc: this.imgSrc,
      titleLabel: this.titleLabel,
      description: this.description,
    };
  }

  private get vbPlayerSelect(): Partial<PlayerSelect> {
    return {
      imgSrc: this.imgSrc,
      titleLabel: this.titleLabel,
    };
  }

  private get vbGameStart(): Partial<GameStart> {
    return {
      imgSrc: this.imgSrc,
      titleLabel: this.titleLabel,
    };
  }

  private get vbPlayerCardList(): Partial<PlayerCardList> {
    return {
      playerNum: this.playerNum,
    };
  }

  private next() {
    this.index++;
  }
  private async toPlaying() {
    this.next();
    await sleep(2000);
    this.$router.push(`${this.$route.path}/playing`);
  }
}
</script>
<style lang="scss" scoped>
#menu-main-content {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;

  #content {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }
}
</style>
