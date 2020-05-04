<template>
  <menu-page v-model="vmPlayerNum" v-bind="vbMenuPage" />
</template>

<script lang="ts">
import { mixins } from 'nuxt-property-decorator';

import { imgShootOut } from '~/assets/imageCatalog';

import BasePage from '~/components/pages/ContainerBase/MenuBasePage';
import MenuPage from '~/components/pages/MenuPage.vue';

export default class extends mixins<BasePage>(BasePage) {
  private get vbMenuPage(): Partial<MenuPage> {
    return {
      titleLabel: 'Shoot Out',
      description: '後に当てるほど点数が高くなるぞ！！',
      imgSrc: imgShootOut,
    };
  }
}
</script>
