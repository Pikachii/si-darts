<template>
  <div class="wrapper" :style="vbStyle">{{ text }}</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiBlock extends Vue {
  @Prop({ default: '' })
  public readonly text!: string;

  @Prop({ default: 'skyblue' })
  public readonly color!: string;

  private get vbStyle(): { [key: string]: string } {
    return {
      backgroundColor: this.color,
    };
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  text-align: center;
  font-size: 2vw;
  height: 50px;
  line-height: 50px;
}
</style>
