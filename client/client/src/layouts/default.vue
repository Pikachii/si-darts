<template>
  <el-container style="height: 100vh">
    <el-aside width="250px" style="height: 100vh">
      <side-menu />
    </el-aside>
    <el-container>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import SideMenu from '~/components/organism/SideMenu.vue';

@Component({ components: { SideMenu } })
export default class extends Vue {}
</script>
