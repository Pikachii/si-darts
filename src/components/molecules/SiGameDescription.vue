<template>
  <div>
    <div class="inline">
      <si-image :img-src="imgSrc" :width="300" height="auto" />
    </div>
    <div class="inline" style="width: 300px;">
      <si-title :label="titleLabel" />
      <el-divider />
      <si-text :text="description" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiImage, SiTitle, SiText } from '~/components/atomsCatalog';

@Component({
  components: {
    SiImage,
    SiTitle,
    SiText,
  },
})
export default class SiGameDescription extends Vue {
  @Prop({ default: '' })
  public readonly imgSrc!: string;

  @Prop({ default: '' })
  public readonly titleLabel!: string;

  @Prop({ default: '' })
  public readonly description!: string;
}
</script>
<style lang="scss" scoped>
.inline {
  display: inline-block;
  vertical-align: top;
}
</style>
