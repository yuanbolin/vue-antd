// 画布基本设置（这些例子上面都有）
export const configSetting = Shape => {
  return {
    grid: true, // 网格
    autoResize: true, // 自适应容器大小
    translating: { restrict: true }, // 平移节点
    mousewheel: {
      // 鼠标滚轮缩放画布
      enabled: true, // 开启
      zoomAtMousePosition: true, // 缩放点跟随鼠标位置
      modifiers: "ctrl", // 键盘按键, 触发方式变为:鼠标滚轮+键盘按键
      minScale: 0.5, // 最小缩放
      maxScale: 3 // 最大缩放
    },
    connecting: {
      // 连线规则
      router: {
        // 连线路径点规则
        name: "manhattan", // 自动避开路径上的其他节点
        args: {
          padding: 1 // 最小间隔1
        }
      },
      connector: {
        // 连接样式
        name: "rounded", // 圆角连线
        args: {
          radius: 8 // 圆角程度
        }
      },
      anchor: "center", // 没看懂文档,大概意思就是连接节点时锚点的位置
      connectionPoint: "anchor", // 使用锚点作为连接点
      allowBlank: false, // 是否可连接空白位置的点
      snap: {
        radius: 20 // 连线时距离连接桩20px触发吸附
      },
      createEdge() {
        // 连接过程中创建新的连线
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: "#768791", // 线颜色
              strokeWidth: 2, // 线宽
              targetMarker: {
                // 目标箭头属性
                name: "classic", // 箭头样式:经典箭头
                width: 12, // 箭头宽
                height: 8 // 箭头高
              }
            }
          },
          zIndex: 0 // 连线的z轴值
        });
      },
      validateConnection({ targetMagnet }) {
        // 连接线是否有效
        return !!targetMagnet; // 以是否有目标链接对象作为连接线的有效判断
      }
    },
    highlighting: {
      magnetAdsorbed: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#5F95FF",
            stroke: "#5F95FF"
          }
        }
      }
    },
    resizing: {
      // 节点缩放 最新宽度限制为20px
      enabled: true,
      minWidth: 20,
      minHeight: 20
    },
    rotating: true, // 节点选转
    selecting: {
      enabled: true, // 点选
      rubberband: true, // 框选
      showNodeSelectionBox: true // 展示选择框效果
    },
    snapline: true, // 辅助对齐线
    keyboard: true, // 键盘快捷键 开启后监听键盘事件
    history: false, // 历史操作记录 开启后可回退和前进历史操作
    clipboard: true, // 剪切板 开启后可复制黏贴
    embedding: {
      // 父子节点交互嵌套
      enabled: true,
      findParent({ node }) {
        const bbox = node.getBBox();
        return this.getNodes().filter(node => {
          // 只有 data.parent 为 true 的节点才是父节点
          const data = node.getData();
          if (data && data.parent) {
            const targetBBox = node.getBBox();
            return bbox.isIntersectWithRect(targetBBox);
          }
          return false;
        });
      }
    }
  };
};

/**
 * 节点预设类型
 * 0椭圆形: defaultOval,
 * 1方形: defaultSquare,
 * 2圆角矩形: defaultYSquare,
 * 3菱形: defaultRhombus,
 * 4平行四边形: defaultRhomboid,
 * 5圆形: defaultCircle,
 * 到时候通过传入的type===通过匹配 data里面设置的type获取到相应的节点设置内容
 * 编辑的时候也可以通过节点里面的data.type 获取到到底是什么节点进行响应设设置
 */
export const configNodeShape = type => {
  const nodeShapeList = [
    {
      /**
       *
       *  加入data里面的标识type是为了方便编辑的时候找到相对应的类型进行不同的编辑处理
       *  另外获取初始对应的设置
       */
      data: {
        type: "defaultOval"
      },
      shape: "rect",
      width: 100,
      height: 50,
      attrs: {
        body: {
          rx: 20,
          ry: 26,
          fill: "#fff",
          stroke: "#333"
        },
        label: {
          text: "椭圆形",
          fontSize: 16,
          fill: "#333"
        }
      }
    },
    {
      data: {
        type: "defaultSquare"
      },
      shape: "rect",
      width: 100,
      height: 50,
      attrs: {
        label: {
          text: "方形",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#fff",
          stroke: "#333"
        }
      }
    },
    {
      data: {
        type: "defaultYSquare"
      },
      shape: "rect",
      width: 100,
      height: 50,
      attrs: {
        body: {
          rx: 6,
          ry: 6,
          fill: "#fff",
          stroke: "#333"
        },
        label: {
          text: "圆角矩形",
          fontSize: 16,
          fill: "#333"
        }
      }
    },
    {
      data: {
        type: "defaultRhombus"
      },
      shape: "polygon",
      width: 120,
      height: 50,
      attrs: {
        body: {
          refPoints: "0,10 10,0 20,10 10,20",
          fill: "#fff",
          stroke: "#333"
        },
        label: {
          text: "菱形",
          fontSize: 16,
          fill: "#333"
        }
      }
    },
    {
      data: {
        type: "defaultRhomboid"
      },
      shape: "polygon",
      width: 120,
      height: 50,
      attrs: {
        body: {
          refPoints: "10,0 40,0 30,20 0,20",
          fill: "#fff",
          stroke: "#333"
        },
        label: {
          text: "平行四边形",
          fontSize: 16,
          fill: "#333"
        }
      }
    },
    {
      data: {
        type: "defaultCircle"
      },
      shape: "circle",
      width: 80,
      height: 80,
      attrs: {
        label: {
          text: "圆形",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#fff",
          stroke: "#333"
        }
      }
    },
    {
      data: {
        type: "defaultSuccess"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      // https://www.svgrepo.com/svg/13653/like
      attrs: {
        label: {
          text: "成功",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#fff",
          stroke: "#333",
          strokeWidth: 2,
          refD:
            "M511.998465 64.37517c-247.322875 0-447.819259 200.408379-447.819259 447.623807 0 247.216451 200.49536 447.625854 447.819259 447.625854 247.323898 0 447.820282-200.409402 447.820282-447.625854C959.818747 264.783549 759.322363 64.37517 511.998465 64.37517L511.998465 64.37517zM768.856507 395.891586 479.228107 685.394119l-0.00614 0.00921c-13.355169 13.351076-33.714869 15.433504-49.256844 6.257517-2.87856-1.702782-5.590322-3.790326-8.063653-6.257517-0.004093-0.004093-0.004093-0.004093-0.004093-0.004093L255.143493 518.718005c-15.827477-15.821337-15.827477-41.4746 0-57.300031 15.827477-15.821337 41.48995-15.821337 57.319473 0l138.102335 138.039913 260.97071-260.863263c15.833617-15.820314 41.498136-15.820314 57.325613 0C784.685008 354.416985 784.685008 380.070248 768.856507 395.891586L768.856507 395.891586zM768.856507 395.891586"
        }
      }
    },
    {
      data: {
        type: "defaultError"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      // https://www.svgrepo.com/svg/13653/like
      attrs: {
        label: {
          text: "失败",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#fff",
          stroke: "#333",
          strokeWidth: 2,
          refD:
            "M511.996418 64.266699c-246.859317 0-447.730231 200.842261-447.730231 447.728184 0 246.895133 200.843284 447.737394 447.730231 447.737394 246.864434 0 447.736371-200.842261 447.736371-447.737394C959.732789 265.10896 758.890528 64.266699 511.996418 64.266699L511.996418 64.266699zM694.642249 649.903813c12.472056 12.537548 12.438287 32.743752-0.064468 45.214784-6.237051 6.209422-14.390755 9.342786-22.578228 9.342786-8.219195 0-16.405645-3.133364-22.642696-9.403161L511.840876 557.124733 373.870548 693.617407c-6.237051 6.144954-14.355963 9.242502-22.482037 9.242502-8.251941 0-16.470113-3.166109-22.735817-9.495258-12.409634-12.56927-12.317537-32.783661 0.25378-45.220924l137.807622-136.301316L329.41915 374.096187c-12.472056-12.502755-12.437264-32.748868 0.064468-45.220924 12.503778-12.503778 32.715099-12.440333 45.221948 0.066515l137.486304 137.901767L650.157081 330.346777c12.536524-12.438287 32.813337-12.311397 45.220924 0.25378 12.438287 12.571317 12.31242 32.813337-0.257873 45.221948L557.31558 512.128937 694.642249 649.903813 694.642249 649.903813zM694.642249 649.903813"
        }
      }
    }
  ];
  if (type) {
    const obj = nodeShapeList.find(item => {
      return item.data.type === type;
    });
    return obj || nodeShapeList;
  }
  return nodeShapeList;
};

/**
 * 节点连接桩设置
 * 这里设置了上下左右四个
 * 并且给style设置了 visibility: 'hidden'，默认是隐藏的。
 * 如果设置了隐藏记得在画布里面设置鼠标经过显示。
 * graph.on('node:mouseenter', () => {
        const container = document.getElementById('wrapper')
        const ports = container.querySelectorAll('.x6-port-body')
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
          ports[i].style.visibility = val ? 'visible' : 'hidden'
        }
    })
 * 如果需要常显去掉每个链接桩里面的
 style: {
        visibility: 'hidden',
     },
 * 就可以了
 */
export const configNodePorts = () => {
  return {
    groups: {
      top: {
        position: "top",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden"
            }
          }
        }
      },
      right: {
        position: "right",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden"
            }
          }
        }
      },
      bottom: {
        position: "bottom",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden"
            }
          }
        }
      },
      left: {
        position: "left",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden"
            }
          }
        }
      }
    },
    items: [
      {
        group: "top"
      },
      {
        group: "right"
      },
      {
        group: "bottom"
      },
      {
        group: "left"
      }
    ]
  };
};

// 连线 label 设置
export const configEdgeLabel = (labelText, fontColor, fill, stroke) => {
  if (!labelText)
    return {
      attrs: { labelText: { text: "" }, labelBody: { fill: "", stroke: "" } }
    };
  return {
    markup: [
      {
        tagName: "rect",
        selector: "labelBody"
      },
      {
        tagName: "text",
        selector: "labelText"
      }
    ],
    attrs: {
      labelText: {
        text: labelText || "",
        fill: fontColor || "#333",
        textAnchor: "middle",
        textVerticalAnchor: "middle"
      },
      labelBody: {
        ref: "labelText",
        refX: -8,
        refY: -5,
        refWidth: "100%",
        refHeight: "100%",
        refWidth2: 16,
        refHeight2: 10,
        stroke: stroke || "#555",
        fill: fill || "#fff",
        strokeWidth: 2,
        rx: 5,
        ry: 5
      }
    }
  };
};

// 键盘事件
export const graphBindKey = graph => {
  graph.bindKey(["meta+c", "ctrl+c"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  });
  graph.bindKey(["meta+x", "ctrl+x"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  });
  graph.bindKey(["meta+v", "ctrl+v"], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  });
  // undo redo
  graph.bindKey(["meta+z", "ctrl+z"], () => {
    if (graph.history.canUndo()) {
      graph.history.undo();
    }
    return false;
  });
  graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
    if (graph.history.canRedo()) {
      graph.history.redo();
    }
    return false;
  });
  // select all
  graph.bindKey(["meta+a", "ctrl+a"], () => {
    const nodes = graph.getNodes();
    if (nodes) {
      graph.select(nodes);
    }
  });
  // delete
  /*
  graph.bindKey('delete', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
  })
  */
  // zoom
  graph.bindKey(["ctrl+1", "meta+1"], () => {
    const zoom = graph.zoom();
    if (zoom < 1.5) {
      graph.zoom(0.1);
    }
  });
  graph.bindKey(["ctrl+2", "meta+2"], () => {
    const zoom = graph.zoom();
    if (zoom > 0.5) {
      graph.zoom(-0.1);
    }
  });
  return graph;
};
