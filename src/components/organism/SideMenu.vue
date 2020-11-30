<template>
  <div>
    <div style="text-align: center; border-right: solid 1px #e6e6e6">
      <si-image-link v-bind="vbImage" v-on="voImage" />
    </div>
    <si-menu v-bind="vbMenu" v-on="voMenu" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import SiMenu from './SiMenu.vue';
import { SiImageLink } from '~/components/moleculesCatalog';
import { menu } from '~/components/constManager';

import { imgLogo } from '~/assets/imageCatalog';

@Component({
  components: { SiImageLink, SiMenu },
})
export default class SideMenu extends Vue {
  private get vbImage(): Partial<SiImageLink> {
    return {
      imgSrc: imgLogo,
    };
  }

  private get voImage() {
    return {
      click: this.logoClicked,
    };
  }

  private get vbMenu(): Partial<SiMenu> {
    return {
      mode: 'vertical',
      menuTrigger: 'hover',
      children: menu,
    };
  }

  private get voMenu() {
    return {
      click: this.itemClicked,
    };
  }

  private logoClicked() {
    this.$router.replace('/');
  }

  private itemClicked(index: string) {
    this.$router.push(`/${index}`);
  }
}
</script>
