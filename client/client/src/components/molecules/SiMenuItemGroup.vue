<template>
  <el-menu-item-group v-bind="vbMenuItemGroup">
    <si-menu-item
      v-for="key in menuItemKeys"
      :key="key"
      v-bind="vbMenuItem(key)"
      @click="itemClicked"
    />
  </el-menu-item-group>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator';
import { MenuItemGroup } from 'element-ui';

import { SiMenuItem } from '~/components/atomsCatalog';
import { SiMenuItemOption } from '~/components/interfaceManager';

@Component({
  components: { SiMenuItem },
})
export default class SiMenuItemGroup extends Vue {
  @Emit('click') emClick(_index: string) {}

  @Prop({ default: '' })
  public readonly title!: string;
  @Prop({ default: () => ({}) })
  public readonly menuItems!: { [index: string]: SiMenuItemOption };

  private get vbMenuItemGroup(): Partial<MenuItemGroup> {
    return {
      title: this.title,
    };
  }

  private get menuItemKeys(): string[] {
    return Object.keys(this.menuItems);
  }

  private vbMenuItem(key: string): Partial<SiMenuItem> {
    return {
      ...this.menuItems[key],
      index: key,
    };
  }

  private itemClicked(key: string) {
    this.emClick(key);
  }
}
</script>
