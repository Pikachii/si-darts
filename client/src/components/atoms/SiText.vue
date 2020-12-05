<template>
  <div>{{ text }}</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiSubTitle extends Vue {
  @Prop({ default: '' })
  public readonly text!: string;
}
</script>
