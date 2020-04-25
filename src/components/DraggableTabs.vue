<template>
  <div>
    <div class="my_tabs" style="marginRight: 30px">
      <ul class="tabs" :id="id" :style="{width: `${tabWidth}px`}">
        <li
          :class="{active: active == index}"
          @mousedown="tabsBtn(index)"
          @click="tabsBtn(index)"
          v-for="(item,index) in listTitle"
          :key="index"
        >{{ item.title }}</li>
      </ul>
      <div
        :style="{width: `${tabWidth}px`}"
        class="tabs-content"
        v-for="(item,index) in listData"
        :key="index"
        v-show="active == index"
      >
        <div class="tabs-content-box">{{ item }}</div>
        <!-- <slot name="tabsContent"></slot> -->
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  name: "draggableTabs",
  props: {
    listTitle: Array, // tabs标题
    listData: Array, // tabs内容
    tabWidth: Number, // 组件宽度
    id: String // 组件id
  },
  data() {
    return {
      active: "",
    }
  },
  mounted() {
    this.showTabs();
  },
  methods: {
    showTabs() {
      var el = document.getElementById(this.id);
      var sortable = Sortable.create(el, {
        // direction: "horizontal",
        group: "shared",
        animation: 150
      });
    },

    tabsBtn(index) {
      this.active = index;
    },
  }
};
</script>

<style lang="scss" scoped>
$color: #e4e7ed;
.my_tabs {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
  .tabs {
    padding: 0;
    margin: 0;
    border: 1px solid $color;
    list-style: none;
    display: flex;
    background-color: $color;
    li {
      font-size: 14px;
      text-align: center;
      line-height: 50px;
      width: 100px;
      border-bottom: none;
      color: #909399;
    }
    .active {
      color: #409eff;
      background-color: white;
      border-right: 1px solid #DCDFE6;
      border-left: 1px solid #DCDFE6;
    }
  }
  .tabs-content {
    .tabs-content-box {
      height: 400px;
    }
  }
</style>