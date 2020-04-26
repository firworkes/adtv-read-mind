<template>
  <div>
    <div id="container"></div>
    <div><el-button value="addNode">按钮</el-button></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import {
  carDragstart,
  carOndragover,
  carOndragend,
  carOndragenter,
  carOndrop,
  graph
} from "../assets/js/mindCard";
export default {
  data() {
    return {
      // data: {
      //   id: "Modeling Methods",
      //   children: [
      //     {
      //       id: "Classification",
      //       children: [
      //         {
      //           id: "Logistic regression"
      //         },
      //         {
      //           id: "Linear discriminant analysis"
      //         },
      //         {
      //           id: "Rules"
      //         },
      //         {
      //           id: "Decision trees"
      //         },
      //         {
      //           id: "Naive Bayes"
      //         },
      //         {
      //           id: "K nearest neighbor"
      //         },
      //         {
      //           id: "Probabilistic neural network"
      //         },
      //         {
      //           id: "Support vector machine",
      //           children: [{ id: "新增节点111" }, { id: "新增节点222" }]
      //         }
      //       ]
      //     },
      //     {
      //       id: "Consensus",
      //       children: [
      //         {
      //           id: "Models diversity",
      //           children: [
      //             {
      //               id: "Different initializations"
      //             },
      //             {
      //               id: "Different parameter choices"
      //             },
      //             {
      //               id: "Different architectures"
      //             },
      //             {
      //               id: "Different modeling methods"
      //             },
      //             {
      //               id: "Different training sets"
      //             },
      //             {
      //               id: "Different feature sets"
      //             }
      //           ]
      //         },
      //         {
      //           id: "Methods",
      //           children: [
      //             {
      //               id: "Classifier selection"
      //             },
      //             {
      //               id: "Classifier fusion"
      //             }
      //           ]
      //         },
      //         {
      //           id: "Common",
      //           children: [
      //             {
      //               id: "Bagging"
      //             },
      //             {
      //               id: "Boosting"
      //             },
      //             {
      //               id: "AdaBoost"
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       id: "Regression",
      //       children: [
      //         {
      //           id: "Multiple linear regression"
      //         },
      //         {
      //           id: "Partial least squares"
      //         },
      //         {
      //           id: "Multi-layer feedforward neural network"
      //         },
      //         {
      //           id: "General regression neural network"
      //         },
      //         {
      //           id: "Support vector regression"
      //         }
      //       ]
      //     }
      //   ]
      // }
    };
  },
  mounted() {
    this.showDom();
  },
  computed: {
    listData() {
      return this.$store.state.data;
    }

  },
  methods: {
    // mindData(val) {
    //   let add = {x: 80, y: 650, depth: 1, id: "11111111111", children: []};
    //   this.$store.commit("mindData", add)
    //   this.showDom()
    //   // console.log(this.listData)
    // },

    showDom() {
      // 拖拽事件绑定全局
      window.carDragstart = carDragstart;
      window.carOndragover = carOndragover;
      window.carOndragend = carOndragend;
      window.carOndragenter = carOndragenter;
      window.carOndragenter = carOndragenter;
      window.carOndrop = carOndrop;

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
            <div 
              draggable="true" 
              ondrop="carOndrop(event, this)"
              ondragstart="carDragstart(event, this)" 
              ondragend="carOndragend(event)"
              ondragenter="carOndragenter(event)"
              ondragover="carOndragover(event)"
              style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${cfg
                .size[0] - 5}px; height: ${cfg.size[1] - 5}px; display: flex;"
            >
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
        }
        // "single-node"
      );

      const width = document.getElementById("container").scrollWidth || 900;
      const height = document.getElementById("container").scrollHeight || 800;
      const graph = new G6.TreeGraph({
        renderer: "svg",
        container: "container",
        width,
        height,
        pixelRatio: 2,
        modes: {
          default: ["zoom-canvas", "drag-node"]
        },
        defaultNode: {
          size: [200, 50],
          // type: "rect",
          type: "dom-node",

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
          getHeight: () => {
            return 80;
          },
          getWidth: () => {
            return 160;
          },
          getVGap: () => {
            return 10;
          },
          getHGap: () => {
            return 100;
          },
          getSide: () => {
            return "right";
          }
        }
      });

      let centerX = 0;
      // 以下重点
      graph.node(function(node) {
        // depth 类似节点标识
        if (node.depth == 0) {
          // console.log(node);
          return {
            size: [100, 60],
            style: {
              fill: "red"
              // stroke:''
            },
            label: node.id
          };
        }

        if (node.depth == 1) {
          // console.log(node);
          return {
            size: [100, 60],
            style: {
              fill: "blue"
            },
            label: node.id
          };
        }
        return {
          label: node.id, // 设置显示名称
          labelCfg: {
            // position: node.children && node.children.length > 0 ? 'left' : node.x > centerX ? 'right' : 'left', // 设置显示左右
            offset: 5
          }
        };
      });
      // graph.changeData(this.listData)
      // graph.refresh()
      graph.data(this.listData);
      graph.render();
      graph.fitView();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>