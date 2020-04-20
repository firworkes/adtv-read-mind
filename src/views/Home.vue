<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <navMenu></navMenu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <el-row class="readBook" :gutter="10">
            <el-col style="backgroundColor: red" :sm="12">
              <div class="grid-content bg-purple-light">2</div>
            </el-col>
            <el-col class="rightBook" :sm="12">
              <div class="grid-content bg-purple">
                <div class="topBookContent">
                  <el-tabs
                    style="lineHeight: 42px"
                    v-model="editableTabsValue"
                    type="card"
                    editable
                    @edit="handleTabsEdit"
                  >
                    <el-tab-pane
                      :key="item.name"
                      v-for="(item) in editableTabs"
                      :label="item.title"
                      :name="item.name"
                    >{{item.content}}</el-tab-pane>
                  </el-tabs>
                </div>
                <div style="backgroundColor: black" class="bottomBookContent">111</div>
              </div>
            </el-col>
          </el-row>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navMenu from "@/components/NavMenu";
// import draggable from "@/vuedraggable";
// import Epub from "epubjs";
// global.epub = Epub;
// const DOWNLOAD_URL = "/17XD.epub"
export default {
  data() {
    return {
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2
    };
  },
  components: {
    navMenu,
  },
  // mounted() {
  //   this.showEpub();
  // },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content"
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
    // showEpub() {
    //   this.book = new Epub(DOWNLOAD_URL)
    //   console.log(this.book)
    // }
  }
};
</script>

<style lang="scss">
.readBook,
.rightBook,
.grid-content {
  height: 100%;

  .topBookContent {
    height: 50%;
  }
  .bottomBookContent {
    height: 50%;
  }
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  height: 100vh;
}

.el-main {
  // background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
