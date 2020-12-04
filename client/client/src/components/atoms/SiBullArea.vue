<template>
  <svg viewBox="-500 -500 1000 1000" xmlns="http://www.w3.org/2000/svg">
    <circle dx="0" dy="0" r="44" :fill="outerColor" stroke="black" />
    <circle dx="0" dy="0" r="18" :fill="innerColor" stroke="black" />
  </svg>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiBullArea extends Vue {
  @Prop({ default: 'red' })
  public readonly outerColor!: string;
  @Prop({ default: 'black' })
  public readonly innerColor!: string;
}
</script>
