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

@Component({
  components: {
    SiButton,
    SiGameDescription,
  },
})
export default class GameMenu extends Vue {
  @Emit('next') private emNext() {}

  @Prop({ default: '' })
  public readonly imgSrc!: string;

  @Prop({ default: '' })
  public readonly titleLabel!: string;

  @Prop({ default: '' })
  public readonly description!: string;

  private get vbGameDescription(): Partial<SiGameDescription> {
    return {
      imgSrc: this.imgSrc,
      titleLabel: this.titleLabel,
      description: this.description,
    };
  }

  private get vbButton(): Partial<SiButton> {
    return {
      type: 'primary',
      icon: 'right',
    };
  }

  private clicked() {
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
