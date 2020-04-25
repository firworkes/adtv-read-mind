<template>
  <div>
    <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import carDragstart from "../assets/js/mindCard";
// import {showHtml } from "../assets/antvhtml"
export default {
  data() {
    return {
      data: {
        nodes: [
          { id: "node1", label: "111111111", x: 50, y: 100 },
          { id: "node2", label: "222222222", x: 350, y: 100 },
          { id: "node3", label: "222222222", x: 350, y: 200 },
          { id: "node4", label: "222222222", x: 350, y: 300 },
        ],
        edges: [{ source: "node1", target: "node2" }]
      }
    };
  },
  mounted() {
    this.showHtml();
  },
  methods: {
    // showBtn,
    showHtml() {
      // 拖拽事件绑定全局
      window.carDragstart = carDragstart;
      const container = this.$refs.mountNode;
      G6.registerNode(
        "dom-node",
        {
          draw: (cfg, group) => {
            return group.addShape("dom", {
              attrs: {
                width: cfg.size[0],
                height: cfg.size[1],
                // 传入 DOM 的 html，带有原生 onclick 事件
                html: `
        <div draggable="true" ondragstart="carDragstart(event)" style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${cfg
          .size[0] - 5}px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${
            cfg.label
          }</span>
        </div>
          `
              },
              draggable: true
            });
          }
        },
        "single-node"
      );

      const graph = new G6.Graph({
        renderer: "svg",
        container: "mountNode",
        width: 500,
        height: 500,
        defaultNode: {
          type: "dom-node",
          size: [120, 40]
        },
        modes: {}
      });
      graph.data(this.data);
      graph.render();

      graph.on("dom-node:dragstart", e => {
        const nodeItem = e;
        console.log(nodeItem)
        // 设置目标节点的 hover 状态 false
        // graph.setItemState(nodeItem, "hover", false);
      });

      // var btn = document.querySelectorAll(".btn")

      // for(let item of btn) {
      //   item.onclick = function(){
      //       alert("这是第一种点击方式");
      //   }
      //   // 监听鼠标进入节点
      //   graph.on("node:click", e => {
      //     const nodeItem = e.item;
      //     console.log(nodeItem)
      //     // 设置目标节点的 hover 状态 为 true
      //     graph.setItemState(nodeItem, "hover", true);
      //   });
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>