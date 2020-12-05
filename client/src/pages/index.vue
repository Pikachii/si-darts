<template>
  <title-page />
</template>

<script lang="ts">
import { Component, Vue, Mutation } from 'nuxt-property-decorator';

import TitlePage from '~/components/pages/TitlePage.vue';
@Component({
  components: { TitlePage },
})
export default class extends Vue {
  @Mutation('setPlayerNum')
  private setPlayerNum!: (playerNum: number) => void;

  public created() {
    this.setPlayerNum(0);
  }
}
</script>
