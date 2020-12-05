<template>
  <menu-page v-model="vmPlayerNum" v-bind="vbMenuPage" />
</template>

<script lang="ts">
import { mixins } from 'nuxt-property-decorator';

import { img1101 } from '~/assets/imageCatalog';

import BasePage from '~/components/pages/ContainerBase/MenuBasePage';
import MenuPage from '~/components/pages/MenuPage.vue';

export default class extends mixins<BasePage>(BasePage) {
  private get vbMenuPage(): Partial<MenuPage> {
    return {
      titleLabel: '1101',
      description: '持ち点を0にしろ',
      imgSrc: img1101,
    };
  }
}
</script>
