<template>
  <div :class="vbClass">
    <si-cricket-number
      v-for="(status, index) in vmNumberStatus"
      :key="index"
      v-bind="vbCricketNumber(status)"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiCricketNumber } from '~/components/atomsCatalog';
import { SiCricketNumberStatus } from '~/components/interfaceManager';

@Component({ components: { SiCricketNumber } })
export default class SiCricketNumbers extends Vue {
  @Prop({ default: () => [] })
  public readonly numberStatus!: SiCricketNumberStatus[];

  private get vbClass(): string[] {
    const classes = ['wrapper'];
    return classes;
  }

  private get vmNumberStatus(): SiCricketNumberStatus[] {
    return this.numberStatus;
  }

  private vbCricketNumber(
    status: SiCricketNumberStatus
  ): Partial<SiCricketNumber> {
    return {
      number: status.number,
      isClose: status.isClose,
    };
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 20%;
  max-width: 150px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 3px solid black;
  border-radius: 10px;
}
</style>
