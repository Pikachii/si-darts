<template>
  <si-card v-bind="vbCard">
    <template #header>
      <span class="title">Point Prediction</span>
    </template>
    <span class="point">{{ predictionPoint }}</span>
  </si-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { SiCard } from '~/components/atomsCatalog';

@Component({ components: { SiCard } })
export default class SiPointPrediction extends Vue {
  @Prop({ default: 0 })
  public readonly point!: number;
  @Prop({ default: 0 })
  public readonly roundIndex!: number;
  @Prop({ default: 0 })
  public readonly throwIndex!: number;
  @Prop({ default: 8 })
  public readonly totalRound!: number;
  @Prop({ default: 'skyblue' })
  public readonly color!: string;

  public get predictionPoint() {
    if (this.roundIndex === 0 && this.throwIndex === 0) return 0;
    return Math.floor(
      (this.point / (this.roundIndex * 3 + this.throwIndex)) *
        this.totalRound *
        3
    );
  }

  private get vbCard(): Partial<SiCard> {
    return {
      bodyStyle: {
        width: '160px',
        textAlign: 'center',
        backgroundColor: this.color,
      },
      shadow: 'never',
    };
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.5em;
}
.point {
  font-size: 3em;
}
</style>
