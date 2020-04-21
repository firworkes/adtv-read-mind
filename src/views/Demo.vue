<template>
  <div>
    <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  data() {
    return {
      data: {
        nodes: [
          { x: 50, y: 100, color: "red", shape: "diamond" }, // 最简单的
          { x: 150, y: 100, color: "red", shape: "diamond", size: [50, 100], img: require('../assets/logo.png') }, // 添加宽高
          { x: 250, y: 100, color: "red", shape: "diamond" }, // 添加颜色
          { x: 350, y: 100, color: "red", label: "菱形", shape: "diamond" } // 附加文本
        ],

        // edges: [
        //   { source: "node1", target: "node2" } //起始点 id  结束点 id
        // ]
      }
    };
  },
  mounted() {
    this.demoShow();
  },
  methods: {
    demoShow() {
      G6.registerNode("diamond", {
        draw(cfg, group) {
          // 添加图片
          // 如果 cfg 中定义了 style 需要同这里的属性进行融合
          const shape = group.addShape("path", {
            attrs: {
              path: this.getPath(cfg), // 根据配置获取路径
              stroke: cfg.color // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
            }
          });
          if (cfg.label) {
            // 如果有文本
            // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
            // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
            // style.text = cfg.label;
            group.addShape("text", {
              attrs: {
                x: 0,
                y: 0,
                textAlign: "center",
                textBaseline: "middle",
                text: cfg.label,
                fill: "#666"
              }
            });
          }
          if(cfg.img) {
             group.addShape('image', {
              attrs: {
                img: cfg.img,
                height: 50,
                width: 50
              }
            });
          }
          return shape;
        },
        // 返回菱形的路径
        getPath(cfg) {
          const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
          const width = size[0];
          const height = size[1];
          const path = [
            ["M", 0, 0 - height / 2], // 上部顶点
            ["L", width / 2, 0], // 右侧顶点
            ["L", 0, height / 2], // 下部顶点
            ["L", -width / 2, 0], // 左侧顶点
            ["Z"] // 封闭
          ];
          return path;
        },
        update(cfg, node) {
          const group = node.getContainer(); // 获取容器
          const shape = group.get('children')[0]; // 按照添加的顺序
          const style = {
            path: this.getPath(cfg),
            stroke: cfg.color
          };
          shape.attr(style); // 更新属性
          // 更新文本的逻辑类似，但是需要考虑 cfg.label 是否存在的问题
          // 通过 label.attr() 更新文本属性即可
        }
      });

      const graph = new G6.Graph({
        container: 'mountNode',
        width:700,
        height: 700
      });
      graph.data(this.data);
      graph.render();

      // const graph = new G6.Graph({
      //   container: "mountNode",
      //   width: 900,
      //   height: 900,
      //   defaultNode: {
      //     // shape: 'rect', // 在数据中已经指定了 shape，这里无需再次指定
      //     style: {
      //       height: 60,
      //       width: 100,
      //       fill: "#bae637",
      //       stroke: "#eaff8f",
      //       lineWidth: 5,
      //       radius: 10
      //     },
      //     linkPoints: {
      //       right: true, // 是否显示右侧的连接点
      //       size: 5, // 连接点的大小
      //       fill: '#fff' //连接点的填充色
      //     }
      //     // labelCfg: { // 配置标签文本
      //     //   style: {
      //     //     fill: '#ccc',
      //     //     fontSize: 18,
      //     //   },
      //     //   position: 'bottom'
      //     // }
      //   },
      //   defaultEdge: {
      //     type: 'line',
      //     style: {
      //       stroke: 'steelblue',
      //       lineWidth: 5
      //     },
      //   },
      //   modes: {
      //     default: ["drag-canvas", "zoom-canvas", "drag-node"] // 允许拖拽画布、放缩画布、拖拽节点
      //   },
      // });
      // graph.data(this.data);
      // graph.render();

      // 鼠标进入节点事件
      // graph.on('edge:mouseenter', ev => {
      //   // 获得鼠标当前目标边
      //   const edge = ev.item;
      //   // 该边的起始点
      //   const source = edge.getSource();
      //   console.log(source)
      //   // 该边的结束点
      //   const target = edge.getTarget();
      //   // 先将边提前，再将端点提前。这样该边两个端点还是在该边上层，较符合常规。
      //   edge.toFront();
      //   source.toFront();
      //   target.toFront();
      //   // 注意：必须调用以根据新的层级顺序重绘
      //   graph.paint();
      // });
      // graph.on('node:mouseenter', ev => {
      //   // 获得鼠标当前目标节点
      //   const node = ev.item;
      //   // 获取该节点的所有相关边
      //   const edges = node.getEdges();
      //   console.log(edges)
      //   // 遍历相关边，将所有相关边提前，再将相关边的两个端点提前，以保证相关边的端点在边的上方常规效果
      //   edges.forEach(edge => {
      //     edge.toFront();
      //     edge.getSource().toFront();
      //     edge.getTarget().toFront();
      //   });
      //   // 注意：必须调用以根据新的层级顺序重绘
      //   graph.paint();
      // });

      // 鼠标点击节点，隐藏该节点
      // graph.on('node:click', ev => {
      //   const node = ev.item;
      //   console.log('before hide(), the nodevisible = ', node.get('visible'));
      //   node.hide();
      //   graph.paint();
      //   console.log('after hide(), the node visible = ', node.get('visible'));
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>