<template>
  <a @click="imageClicked">
    <si-image v-bind="vbImage" />
  </a>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator';

import { SiImage } from '~/components/atomsCatalog';

@Component({
  components: { SiImage },
})
export default class SiImageLink extends Vue {
  @Emit('click') private emClicked() {}

  @Prop({ default: '' })
  public readonly imgSrc!: string;
  @Prop({ default: '' })
  public readonly width!: number;
  @Prop({ default: '' })
  public readonly height!: number;

  private get vbImage(): Partial<SiImage> {
    return {
      imgSrc: this.imgSrc,
      width: this.width,
      height: this.height,
    };
  }

  private imageClicked() {
    this.emClicked();
  }
}
</script>
<style lang="scss" scoped>
a:hover {
  cursor: pointer;
}
</style>
