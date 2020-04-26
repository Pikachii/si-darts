<template>
  <div class="mark">
    <span v-if="mark === 0"></span>
    <span v-else-if="mark === 1">／</span>
    <span v-else-if="mark === 2">×</span>
    <span v-else-if="mark === 3">⊗</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiCricketMark extends Vue {
  @Prop({ default: 0 })
  public readonly mark!: number;
}
</script>
<style lang="scss" scoped>
.mark {
  font-size: 2.4em;
  text-align: center;
  height: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
