<template>
  <si-card v-bind="vbCard">
    <i class="el-icon-user-solid"></i>
    {{ playerName }}
  </si-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiCard } from '~/components/atomsCatalog';

@Component({ components: { SiCard } })
export default class SiPlayerCard extends Vue {
  @Prop({ default: '' })
  public readonly playerName!: string;
  @Prop({ default: '' })
  public readonly color!: string;

  private get vbCard(): Partial<SiCard> {
    return {
      bodyStyle: {
        width: '150px',
        textAlign: 'center',
        height: '60px',
        backgroundColor: this.color,
      },
      shadow: 'always',
    };
  }
}
</script>
