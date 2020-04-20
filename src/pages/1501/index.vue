<template>
  <menu-page v-model="vmPlayerNum" v-bind="vbMenuPage" />
</template>

<script lang="ts">
import { Component, Vue, Getter, Mutation } from 'nuxt-property-decorator';

import { img1501 } from '~/assets/imageCatalog';

import MenuPage from '~/components/pages/MenuPage.vue';
@Component({
  components: { MenuPage },
})
export default class extends Vue {
  @Getter('playerNum')
  private readonly playerNum!: number;

  @Mutation('setPlayerNum')
  private setPlayerNum!: (playerNum: number) => void;

  private get vmPlayerNum(): number {
    return this.playerNum;
  }
  private set vmPlayerNum(playerNum: number) {
    this.setPlayerNum(playerNum);
  }

  private get vbMenuPage(): Partial<MenuPage> {
    return {
      titleLabel: '1501',
      description: '持ち点を0にしろ',
      imgSrc: img1501,
    };
  }
}
</script>
