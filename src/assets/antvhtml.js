import G6 from "@antv/g6";

function showBtn() {
    alert('22')
}
export function showHtml() {

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
                    <div id="btn" onClick="${showBtn}" style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${cfg
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
    const data = {
        nodes: [
            { id: 'node1', x: 50, y: 100 },
            { id: 'node2', x: 350, y: 100 },
        ],
        edges: [
            {
                source: 'node1',
                target: 'node2'
            }
        ]
    };

    const graph = new G6.Graph({
        renderer: 'svg',
        container: "mountNode",
        width: 500,
        height: 500,
        defaultNode: {
            type: "dom-node",
            size: [120, 40]
        }
    });
    graph.data(data);
    graph.render();

    var btn = document.getElementById("btn");
    console.log(btn)
    // showBtn() {
    //  alert('111')
    // }
    // var btn = document.getElementById("btn");
    // btn.addEventListener('click', function(){
    //     alert("这是第二中点击方式");
    // })
    // console.log(btn)
}
