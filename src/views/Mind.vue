<template>
  <div>
    <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
// const main = async () => {
//   const response = await fetch(
//     "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
//   );
// };
// const remoteData = await response.json();
export default {
  data() {
    return {
      data: {
        // 点集
        nodes: [
          {
            id: "node1", // String，该节点存在则必须，节点的唯一标识
            x: 100, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
            label: "起始点" // 节点文本
          },
          {
            id: "node2", // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
            label: "目标点" // 节点文本
          }
        ],
        // 边集
        edges: [
          {
            source: "node1", // String，必须，起始点 id
            target: "node2", // 边的文本// String，必须，目标点 id
            label: "我是连线"
          }
        ]
      }
    };
  },
  mounted() {
    this.mindShow();
  },
  methods: {
    mindShow() {
      const graph = new G6.Graph({
        container: "mountNode", // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 800,
        height: 500,
        // fitView: true,
        // fitViewPadding: [20, 40, 50, 20],
        // 全局样式
        defaultNode: {
          type: "circle",
          size: 30, // 节点大小
          style: {
            fill: "steelblue", // 节点填充色
            stroke: "#666", // 节点描边色
            lineWidth: 1 // 节点描边粗细
          },
          // 节点上的标签文本配置
          labelCfg: {
            // 节点上的标签文本样式配置
            style: {
              fill: "#fff" // 节点标签文字颜色
            }
          }
        },
        layout: {
          // Object，可选，布局的方法及其配置项，默认为 random 布局。
          type: "force", // 指定为力导向布局
          preventOverlap: true, // 防止节点重叠
          linkDistance: 100 // 设置边长为 100
          // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
        },
        modes: {
          default: ["drag-canvas", "zoom-canvas", "drag-node"] // 允许拖拽画布、放缩画布、拖拽节点
        },
        // 节点不同状态下的样式集合
        nodeStateStyles: {
          // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: "lightsteelblue"
          },
          // 鼠标点击节点，即 click 状态为 true 时的样式
          click: {
            stroke: "#000",
            lineWidth: 3
          }
        },
        // 边不同状态下的样式集合
        edgeStateStyles: {
          // 鼠标点击边，即 click 状态为 true 时的样式
          click: {
            stroke: "steelblue"
          }
        }
      });
      //获取数据
      const main = async () => {
        const response = await fetch(
          "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
        );
        const remoteData = await response.json();
        graph.data(remoteData);
        graph.render();
      };
      main();

      // 监听鼠标进入节点
      graph.on("node:mouseenter", e => {
        const nodeItem = e.item;
        // 设置目标节点的 hover 状态 为 true
        graph.setItemState(nodeItem, "hover", true);
      });
      // 监听鼠标离开节点
      graph.on("node:mouseleave", e => {
        const nodeItem = e.item;
        // 设置目标节点的 hover 状态 false
        graph.setItemState(nodeItem, "hover", false);
      });
      // 监听鼠标点击节点
      graph.on("node:click", e => {
        // 先将所有当前有 click 状态的节点的 click 状态置为 false
        const clickNodes = graph.findAllByState("node", "click");
        clickNodes.forEach(cn => {
          graph.setItemState(cn, "click", false);
        });
        const nodeItem = e.item;
        // 设置目标节点的 click 状态 为 true
        graph.setItemState(nodeItem, "click", true);
      });
      // 监听鼠标点击节点
      graph.on("edge:click", e => {
        // 先将所有当前有 click 状态的边的 click 状态置为 false
        const clickEdges = graph.findAllByState("edge", "click");
        clickEdges.forEach(ce => {
          graph.setItemState(ce, "click", false);
        });
        const edgeItem = e.item;
        // 设置目标边的 click 状态 为 true
        graph.setItemState(edgeItem, "click", true);
      });
      //   // 读取数据
      //   graph.data(this.data);
      //   // 渲染图
      //   graph.render();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>