<template>
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <si-darts-area
      v-for="areaInfo in areaInfoList"
      :key="areaInfo.number"
      v-bind="vbDartsArea(areaInfo)"
    />
    <si-bull-area v-bind="vbBullArea" />
  </svg>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiBullArea, SiDartsArea } from '~/components/atomsCatalog';
import { AreaInfo, AreaColorInfo } from '~/components/interfaceManager';

@Component({ components: { SiBullArea, SiDartsArea } })
export default class SiDartsBoard extends Vue {
  @Prop({ default: 'black' })
  public readonly innerBullColor!: string;
  @Prop({ default: 'red' })
  public readonly outerBullColor!: string;
  @Prop({ default: () => [] })
  public readonly numberColorInfo!: AreaColorInfo[];

  private areaInfoBaseList(): AreaInfo[] {
    return [
      this.createAreaInfo(6, 0, 'white', 'blue'),
      this.createAreaInfo(10, 18, 'black', 'red'),
      this.createAreaInfo(15, 36, 'white', 'blue'),
      this.createAreaInfo(2, 54, 'black', 'red'),
      this.createAreaInfo(17, 72, 'white', 'blue'),
      this.createAreaInfo(3, 90, 'black', 'red'),
      this.createAreaInfo(19, 108, 'white', 'blue'),
      this.createAreaInfo(7, 126, 'black', 'red'),
      this.createAreaInfo(16, 144, 'white', 'blue'),
      this.createAreaInfo(8, 162, 'black', 'red'),
      this.createAreaInfo(11, 180, 'white', 'blue'),
      this.createAreaInfo(14, 198, 'black', 'red'),
      this.createAreaInfo(9, 216, 'white', 'blue'),
      this.createAreaInfo(12, 234, 'black', 'red'),
      this.createAreaInfo(5, 252, 'white', 'blue'),
      this.createAreaInfo(20, 270, 'black', 'red'),
      this.createAreaInfo(1, 288, 'white', 'blue'),
      this.createAreaInfo(18, 306, 'black', 'red'),
      this.createAreaInfo(4, 324, 'white', 'blue'),
      this.createAreaInfo(13, 342, 'black', 'red'),
    ];
  }

  private get areaInfoList(): AreaInfo[] {
    const array = this.areaInfoBaseList();
    array.forEach(item => {
      const colorInfo = this.numberColorInfo.find(
        x => x.number === item.number
      );
      if (!colorInfo) return;
      if (colorInfo.doubleColor) item.doubleColor = colorInfo.doubleColor;
      if (colorInfo.outerColor) item.outerColor = colorInfo.outerColor;
      if (colorInfo.tripleColor) item.tripleColor = colorInfo.tripleColor;
      if (colorInfo.innerColor) item.innerColor = colorInfo.innerColor;
    });
    return array;
  }

  private get vbBullArea(): Partial<SiBullArea> {
    return {
      outerColor: this.outerBullColor,
      innerColor: this.innerBullColor,
    };
  }

  private createAreaInfo(
    number: number,
    startRadian: number,
    singleColor: string,
    multipleColor: string
  ): AreaInfo {
    return {
      number,
      startRadian,
      doubleColor: multipleColor,
      tripleColor: multipleColor,
      outerColor: singleColor,
      innerColor: singleColor,
    };
  }

  private vbDartsArea(areaInfo: AreaInfo): Partial<SiDartsArea> {
    return {
      number: areaInfo.number,
      startRadian: areaInfo.startRadian,
      doubleColor: areaInfo.doubleColor,
      outerColor: areaInfo.outerColor,
      tripleColor: areaInfo.tripleColor,
      innerColor: areaInfo.innerColor,
    };
  }
}
</script>
