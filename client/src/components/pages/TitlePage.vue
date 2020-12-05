<template>
  <div id="menu-main-content">
    <div id="content">
      <si-image v-bind="vbImage" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import { SiImage } from '~/components/atomsCatalog';
import { imgLogo } from '~/assets/imageCatalog';

@Component({ components: { SiImage } })
export default class TitlePage extends Vue {
  private get vbImage(): Partial<SiImage> {
    return {
      imgSrc: imgLogo,
    };
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
