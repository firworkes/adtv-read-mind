<template>
  <div>
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- <el-submenu index="1">
          <template slot="title">
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->

        <draggable
          class="dragArea list-group"
          :list="menuList"
          :clone="clone"
          :group="{ name: 'people', pull: pullFunction }"
          @start="start"
        >
          <el-submenu v-for="(item, index) in menuList" :key="index" index="index">
            <template slot="title">
              <span>{{ item.name}}</span>
            </template>
            <!-- <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group> -->
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <!-- <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu> -->
          </el-submenu>
        </draggable>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import draggable from "vuedraggable";
let idGlobal = 4;
export default {
  order: 4,
  components: {
    draggable
  },
  data() {
    return {
      menuList: [
        { id: "1", name: "导航一" },
        { id: "1", name: "导航二" },
        { id: "1", name: "导航三" },
        { id: "1", name: "导航四" }
      ]
    };
  },
  methods: {
    clone({ name }) {
      return { name, id: idGlobal++ };
    },
    pullFunction() {
      return this.controlOnStart ? "clone" : true;
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>