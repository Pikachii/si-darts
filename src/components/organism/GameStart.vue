<template>
  <div>
    <si-game-description v-bind="vbGameDescription" />
    <div style="margin-top: 20px; height: 60px"></div>
    <div style="text-align: center; margin-top: 20px">
      <si-button style="width: 100px" v-bind="vbButton" @click="clicked" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator';

import { SiButton } from '~/components/atomsCatalog';
import { SiGameDescription } from '~/components/moleculesCatalog';

import { soundToGame } from '~/assets/soundCatalog';

@Component({
  components: {
    SiButton,
    SiGameDescription,
  },
})
export default class PlayerSelect extends Vue {
  @Emit('next') private emNext() {}

  @Prop({ default: '' })
  public readonly imgSrc!: string;

  @Prop({ default: '' })
  public readonly titleLabel!: string;

  private isLoading: boolean = false;

  private get vbGameDescription(): Partial<SiGameDescription> {
    return {
      imgSrc: this.imgSrc,
      titleLabel: this.titleLabel,
      description: 'ゲームを開始します。',
    };
  }

  private get vbButton(): Partial<SiButton> {
    return {
      type: 'primary',
      icon: 'right',
      soundUrl: soundToGame,
      loading: this.isLoading,
    };
  }

  private clicked() {
    this.isLoading = true;
    this.emNext();
  }
}
</script>
<style lang="scss" scoped>
.inline {
  display: inline-block;
  vertical-align: top;
}
</style>
