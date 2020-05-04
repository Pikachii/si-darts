<template>
  <si-card v-bind="vbCard">
    <template #header>
      <i class="el-icon-user-solid"></i>
      <span class="player-name">{{ playerName }}</span>
      <i
        v-if="isTop"
        class="el-icon-star-on"
        style="margin-left: 10px; color: orange;"
      ></i>
    </template>
    <span class="point">{{ point }}</span>
  </si-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiCard } from '~/components/atomsCatalog';

@Component({ components: { SiCard } })
export default class SiPlayerCardWithPoint extends Vue {
  @Prop({ default: '' })
  public readonly playerName!: string;
  @Prop({ default: '' })
  public readonly color!: string;
  @Prop({ default: '' })
  public readonly point!: number;
  @Prop({ default: false })
  public readonly isTop!: boolean;

  private get vbCard(): Partial<SiCard> {
    return {
      bodyStyle: {
        width: '150px',
        textAlign: 'center',
        backgroundColor: this.color,
      },
      shadow: 'never',
    };
  }
}
</script>
<style lang="scss" scoped>
.player-name {
  font-size: 1.5em;
}
.point {
  font-size: 3em;
}
</style>
