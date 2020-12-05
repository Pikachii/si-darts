<template>
  <el-submenu v-bind="vbSubMenu">
    <template slot="title">
      <i v-if="icon" :class="`el-icon-${icon}`" />
      {{ title }}
    </template>
    <template v-for="key in childrenKeys">
      <si-menu-item-group
        v-if="isMenuItemGroup(children[key])"
        :key="key"
        v-bind="vbMenuItemGroup(children[key])"
        @click="itemClicked"
      />
      <si-menu-item
        v-else
        :key="key"
        v-bind="vbMenuItem(key, children[key])"
        @click="itemClicked"
      />
    </template>
  </el-submenu>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator';
import { Submenu } from 'element-ui';

import { SiMenuItem } from '~/components/atomsCatalog';
import { SiMenuItemGroup } from '~/components/moleculesCatalog';
import {
  SiMenuItemOption,
  SiGroupMenuOption,
} from '~/components/interfaceManager';

@Component({
  components: {
    SiMenuItem,
    SiMenuItemGroup,
  },
})
export default class SiSubMenu extends Vue {
  @Emit('click') private emClick(_index: string) {}

  @Prop({ required: true })
  public readonly index!: string;

  @Prop({ default: '' })
  public readonly title!: string;

  @Prop({ default: '' })
  public readonly icon!: string;

  @Prop({ default: false })
  public readonly disabled!: boolean;

  @Prop({ default: () => ({}) })
  public readonly children!: {
    [index: string]: SiGroupMenuOption | SiMenuItemOption;
  };

  private get vbSubMenu(): Partial<Submenu> {
    return {
      index: this.index,
      disabled: this.disabled,
    };
  }

  private get childrenKeys(): string[] {
    return Object.keys(this.children);
  }

  private isMenuItemGroup(item: any): item is SiGroupMenuOption {
    return typeof item.menuItems === 'object';
  }

  private vbMenuItemGroup(item: SiGroupMenuOption): Partial<SiMenuItemGroup> {
    return {
      title: item.title,
      menuItems: item.menuItems,
    };
  }

  private vbMenuItem(
    index: string,
    item: SiMenuItemOption
  ): Partial<SiMenuItem> {
    return {
      index,
      title: item.title,
      disabled: item.disabled,
      icon: item.icon,
    };
  }

  private itemClicked(index: string) {
    this.emClick(index);
  }
}
</script>
