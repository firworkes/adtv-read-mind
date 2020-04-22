<template>
  <div style="display: flex">
    <div class="my_tabs" style="marginRight: 30px">
      <ul class="tabs" id="items" :style="{width: `${tabWidth}px`}">
        <li
          :class="{active: active == index}"
          @mousedown="tabsBtn(index)"
          @click="tabsBtn(index)"
          v-for="(item,index) in list"
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
      </div>
    </div>
    <div>
      <ul class="tabs" id="newItems" :style="{width: `${tabWidth}px`}">
        <li
          :class="{newActive: newActive == index}"
          @mousedown="newTabsBtn(index)"
          @click="newTabsBtn(index)"
          v-for="(item,index) in newList"
          :key="index"
        >{{ item.title }}</li>
      </ul>
      <div
        :style="{width: `${tabWidth}px`}"
        class="tabs-content"
        v-for="(item,index) in newListData"
        :key="index"
        v-show="newActive == index"
      >
        <div>{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  data() {
    return {
      tabWidth: 600,
      active: "",
      list: [
        { id: "1", title: "导航一" },
        { id: "2", title: "导航二" },
        { id: "3", title: "导航三" },
        { id: "4", title: "导航四" }
      ],
      listData: ["content1", "content2", "content3", "content4"],
      newActive: "",
      newList: [
        { id: "1", title: "一" },
        { id: "2", title: "二" },
        { id: "3", title: "三" },
        { id: "4", title: "四" }
      ],
      newListData: ["内容1", "内容2", "内容3", "内容4"]
    };
  },
  mounted() {
    this.showList();
    this.newShowList();
  },
  methods: {
    showList() {
      var el = document.getElementById("items");
      var sortable = Sortable.create(el, {
        // direction: "horizontal",
        group: "shared",
        animation: 150
      });
    },
    newShowList() {
      var el = document.getElementById("newItems");
      var sortable = Sortable.create(el, {
        // direction: "horizontal",
        group: "shared",
        animation: 150
      });
    },

    tabsBtn(index) {
      this.active = index;
    },
    newTabsBtn(index) {
      this.newActive = index;
    }
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
    .newActive {
      background-color: white;
      border-right: 1px solid black;
      border-left: 1px solid black;
    }
  }
  .tabs-content {
    .tabs-content-box {
      height: 400px;
    }
  }
</style>