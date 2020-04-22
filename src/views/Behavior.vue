<template>
  <div>
    <!-- 左上方的下拉菜单 -->
    <select id="selector">
      <option value="default">默认</option>
      <option value="addNode">添加节点</option>
      <option value="addEdge">添加边</option>
    </select>
    <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import Shape from '@antv/g6/lib/shape';
export default {
  data() {
    return {
      addedCount: 0,
      data: {
        nodes: [
          {
            id: "node1",
            x: 100,
            y: 200,
            color: "red",
            img: require('../assets/logo.png'),
            text: "1111111111111111111111"
          },
          {
            id: "node2",
            x: 300,
            y: 100,
            text: "222"
          },
          {
            id: "node3",
            x: 300,
            y: 300,
            text: "444"
          }
        ],
        edges: [
          {
            id: "edge1",
            target: "node2",
            source: "node1"
          }
        ]
      }
    };
  },
  mounted() {
    this.showBehavior();
  },
  methods: {
    showBehavior() {
      G6.registerNode("customNode", {
        draw(cfg, group) {
          const keyShape = group.addShape('path', {
            attrs: {
              path: this.getPath(cfg), // 根据配置获取路径
              stroke: cfg.color, // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'path-shape',
            // 设置 draggable 以允许响应鼠标的图拽事件
            draggable: true
          });

          if(cfg.text) {
            group.addShape("text", {
              attrs: {
                x: 0,
                y: 0,
                fill: "#333",
                // text: "我是一个自定义节点",
                text: cfg.text,
                textAlign: "center"
              },
              draggable: true,
            });
          }

          if(cfg.img) {
            group.addShape("image", {
              attrs: {
                x: 0,
                y: 0,
                img: cfg.img,
                width: 100,
                height: 100,
              },
              draggable: true,
            });
          }
          return keyShape;
        },
        // 返回菱形的路径
        getPath(cfg) {
          const size = cfg.size || [100, 100]; // 如果没有 size 时的默认大小
          const width = size[0];
          const height = size[1];
          //  / 1 \
          // 4     2
          //  \ 3 /
          const path = [
            ['M', 0, 0 - height / 2], // 上部顶点
            ['L', width / 2, 0], // 右侧顶点
            ['L', 0, height / 2], // 下部顶点
            ['L', -width / 2, 0], // 左侧顶点
            ['Z'], // 封闭
          ];
          return path;
        },
      });

      // 封装点击添节点的交互
      G6.registerBehavior("click-add-node", {
        // 设定该自定义行为需要监听的事件及其响应函数
        getEvents() {
          // 监听的事件为 cnavas:click，响应函数时 onClick
          return {
            "canvas:click": "onClick"
          };
        },
        // 点击事件
        onClick(ev) {
          const graph = this.graph;
          // 在图上新增一个节点
          const node = graph.addItem("node", {
            x: ev.x,
            y: ev.y,
            id: `node-${this.addedCount}` // 生成唯一的 id
          });
          this.addedCount++;
        }
      });
      G6.registerBehavior("click-add-edge", {
        getEvents() {
          return {
            "node:click": "onClick", // 监听节点点击事件
            mousemove: "onMousemove", // 监听鼠标移入事件
            "edge:click": "onEdgeClick" // 点击空白处，取消边
          };
        },
        onClick(ev) {
          const node = ev.item;
          const graph = this.graph; //节点所有信息
          const point = {
            // 鼠标当前点击的坐标
            x: ev.x,
            y: ev.y
          };
          const model = node.getModel(); // 当前节点数据模型
          if (this.addingEdge && this.edge) {
            // 更新边 的信息
            graph.updateItem(this.edge, {
              target: model.id
            });
            // graph.setItemState(this.edge, 'selected', true);
            this.edge = null;
            this.addingEdge = false;
          } else {
            // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
            this.edge = graph.addItem("edge", {
              source: model.id, // 起始位置
              target: point // 终点位置
            });
            this.addingEdge = true;
          }
        },
        onMousemove(ev) {
          const point = {
            // 鼠标移动结束位置
            x: ev.x,
            y: ev.y
          };
          if (this.addingEdge && this.edge) {
            // 更新边的结束点位置为当前鼠标位置
            this.graph.updateItem(this.edge, {
              target: point
            });
          }
        },
        onEdgeClick(ev) {
          const currentEdge = ev.item;
          // 拖拽过程中，点击会点击到新增的边上
          if (this.addingEdge && this.edge == currentEdge) {
            graph.removeItem(this.edge); // 数据发生变化时，根据数据刷新视图
            this.edge = null;
            this.addingEdge = false;
          }
        }
      });

      const graph = new G6.Graph({
        container: "mountNode",
        width: 800,
        height: 800,
        defaultNode: {
          type: "customNode",
          height: 200,
          width: 200,
          style: {
            fill: 'steelblue',   // 节点填充色
            stroke: '#666',      // 节点描边色
            lineWidth: 5
          }
        },
        // 交互模式集合
        modes: {
          // 默认交互模式
          default: ["drag-node", "click-select"],
          // 增加节点交互模式
          addNode: ["click-add-node", "click-select"],
          // 增加边交互模式
          addEdge: ["click-add-edge", "click-select"]
        }
      });

      graph.data(this.data);
      graph.render();

      // 监听左上角下拉菜单的变化，根据其变化切换图的交互模式
      document.getElementById("selector").addEventListener("change", e => {
        const value = e.target.value;
        // 切换交互模式
        graph.setMode(value);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>