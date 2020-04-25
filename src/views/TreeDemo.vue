<template>
  <div>
      <div id="container"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  mounted() {
    fetch(
      "https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json"
    )
      .then(res => res.json())
      .then(data => {
        G6.registerNode(
            "dom-node",
            {
            draw: (cfg, group) => {
                return group.addShape("dom", {
                attrs: {
                    width: cfg.size[0],
                    height: cfg.size[1],
                    // 传入 DOM 的 html，带有原生 onclick 事件
                    html: `<div style="width: 50; height: 50;backgroundColor: red">3333</div>`
                },
                draggable: true
                });
            }
            },
            "single-node"
        );

        const width = document.getElementById("container").scrollWidth;
        const height = document.getElementById("container").scrollHeight || 500;
        const graph = new G6.TreeGraph({
          renderer: "svg",
          container: "container",
          width,
          height,
          modes: {
            default: [
            //   {
            //     type: "collapse-expand",
            //     onChange: function onChange(item, collapsed) {  // 重新布局刷新视图前的事件
            //       const data = item.get("model").data;
            //       data.collapsed = collapsed;
            //       return true;
            //     }
            //   },
              "drag-canvas",
              "zoom-canvas"
            ]
          },
          defaultNode: {
            // type: "dom-node",
            size: 26,
            anchorPoints: [
              [0, 0.5],
              [1, 0.5]
            ],
            style: {
              fill: "#C6E5FF",
              stroke: "#5B8FF9"
            }
          },
          defaultEdge: {
            type: "cubic-horizontal",
            style: {
              stroke: "#A3B1BF"
            }
          },
          layout: {
            type: "mindmap",
            direction: "H",
            getHeight: () => {  // 指定当前节点高度
              return 16;
            },
            getWidth: () => {  // 指定当前节点宽度
              return 16;
            },
            getVGap: () => {  // 指定当前节点的垂直间距
              return 10;
            },
            getHGap: () => {  // 指定当前节点的水平间距
              return 100;
            },
            getSide: () => {  // 指定当前节点在主题的左边 (left) 还是右边 (right)
              return "right";
            }
          }
        });

        let centerX = 0;
        // 所有节点的数据
        graph.node(function(node) {
          if (node.id === "Modeling Methods") {
            centerX = node.x;
          }

          return {
            label: node.id,
            labelCfg: {
              position:
                node.children && node.children.length > 0
                  ? "right"
                  : node.x > centerX
                  ? "right"
                  : "left",
              offset: 5
            }
          };
        });

        graph.data(data);
        graph.render();
        graph.fitView();
      });
  }
};
</script>

<style lang="scss" scoped>
</style>