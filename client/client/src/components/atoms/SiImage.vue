<template>
  <img :src="imgSrc" :width="`${width}px`" :height="`${height}px`" />
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiImage extends Vue {
  @Prop({ default: '' })
  public readonly imgSrc!: string;
  @Prop({ default: '' })
  public readonly width!: number;
  @Prop({ default: '' })
  public readonly height!: number;
}
</script>
