<template>
  <menu-page v-model="vmPlayerNum" v-bind="vbMenuPage" />
</template>

<script lang="ts">
import { mixins } from 'nuxt-property-decorator';

import { imgRandomNumberCricket } from '~/assets/imageCatalog';

import BasePage from '~/components/pages/ContainerBase/MenuBasePage';
import MenuPage from '~/components/pages/MenuPage.vue';

export default class extends mixins<BasePage>(BasePage) {
  private get vbMenuPage(): Partial<MenuPage> {
    return {
      titleLabel: 'Random Number Cricket',
      description: '陣地を取って、相手よりも多く得点しよう',
      imgSrc: imgRandomNumberCricket,
    };
  }
}
</script>
