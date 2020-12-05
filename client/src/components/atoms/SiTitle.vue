<template>
  <h1>{{ label }}</h1>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiTitle extends Vue {
  @Prop({ default: '' })
  public readonly label!: string;
}
</script>
