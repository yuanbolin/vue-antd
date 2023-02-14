// 画布基本设置（这些例子上面都有）
export const configSetting = Shape => {
  return {
    grid: true, // 网格
    autoResize: true, // 自带的自适应容器大小属性。
    translating: { restrict: true }, // 平移节点
    panning: {
      enabled: true
    },
    mousewheel: {
      // 鼠标滚轮缩放画布
      enabled: true, // 开启
      zoomAtMousePosition: true, // 缩放点跟随鼠标位置
      modifiers: "alt", // 键盘按键, 触发方式变为:鼠标滚轮+键盘按键
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
              strokeWidth: 1, // 线宽
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
      // 节点缩放 最小限制为40px，最大限制为400px
      enabled: true,
      preserveAspectRatio: false, //等比例缩放
      minWidth: 40,
      minHeight: 40
    },
    rotating: true, // 节点选转
    selecting: {
      enabled: true,
      multiple: false, // 关闭多选
      rubberband: true, // 框选
      modifiers: "ctrl",
      showNodeSelectionBox: true // 展示选择框效果
    },
    snapline: true, // 辅助对齐线
    keyboard: true, // 键盘快捷键 开启后监听键盘事件
    history: false, // 因目前为自动保存模式,顾关闭历史操作记录功能
    clipboard: false, // 剪切板 开启后可复制黏贴
    embedding: {
      enabled: true,
      findParent({ node }) {
        const bbox = node.getBBox()
        return this.getNodes().filter((node) => {
          // 只有 data.parent 为 true 的节点才是父节点
          const data = node.getData()
          if (data && data.parent) {
            const targetBBox = node.getBBox()
            return bbox.isIntersectWithRect(targetBBox)
          }
          return false
        })
      }
    },
    // scroller: {
    //   enabled: true,
    //   pannable: true,
    //   pageBreak: true,
    //   autoResize: true
    // }
  };
};

/**
 * svg背景
 */
const filter = {
  tagName: "defs",
  selector: "defs",
  children: [
    {
      tagName: "filter",
      attrs: {
        id: "f4",
        x: 0,
        y: 0,
        width: "200%",
        height: "200%"
      },
      children: [
        {
          tagName: "feOffset",
          attrs: {
            result: "offOut",
            in: "SourceGraphic",
            dx: 2,
            dy: 2
          }
        },
        {
          tagName: "feColorMatrix",
          attrs: {
            result: "matrixOut",
            in: "offOut",
            type: "matrix",
            values: "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
          }
        },
        {
          tagName: "feGaussianBlur",
          attrs: {
            result: "blurOut",
            in: "matrixOut",
            stdDeviation: "10"
          }
        },
        {
          tagName: "feBlend",
          attrs: {
            in: "SourceGraphic",
            in2: "blurOut",
            mode: "normal"
          }
        }
      ]
    }
  ]
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
      zIndex: 10,attrs: {
        body: {
          rx: 20,
          ry: 26,
          fill: "#fff",
          stroke: "#333"
        },
        label: {
          textAnchor: "middle",
          textVerticalAnchor: "middle",
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
      zIndex: 10,attrs: {
        label: {
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
      zIndex: 10,attrs: {
        body: {
          rx: 6,
          ry: 6,
          fill: "#fff",
          stroke: "#333"
        },
        label: {
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
      zIndex: 10,attrs: {
        body: {
          refPoints: "0,10 10,0 20,10 10,20",
          fill: "#fff",
          stroke: "#333"
        },
        label: {
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
      zIndex: 10,attrs: {
        body: {
          refPoints: "10,0 40,0 30,20 0,20",
          fill: "#fff",
          stroke: "#333"
        },
        label: {
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
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
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
        type: "defaultGroup",
        parent: true
      },
      shape: "rect",
      width: 400,
      height: 100,
      zIndex: 1,
      attrs: {
        label: {
          refX: 0.5,
          refY: -4,
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          textWrap: {
            text: "群组",
            width: -10, // 宽度减少 10px
            height: "50%", // 高度为参照元素高度的一半
            ellipsis: true, // 文本超出显示范围时，自动添加省略号
            breakWord: true // 是否截断单词
          },
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
        { ...filter },
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
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          filter: "url(#f4)",
          fill: "#37dc13",
          stroke: null,
          strokeWidth: 1,
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
        { ...filter },
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
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#e11313",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M511.996418 64.266699c-246.859317 0-447.730231 200.842261-447.730231 447.728184 0 246.895133 200.843284 447.737394 447.730231 447.737394 246.864434 0 447.736371-200.842261 447.736371-447.737394C959.732789 265.10896 758.890528 64.266699 511.996418 64.266699L511.996418 64.266699zM694.642249 649.903813c12.472056 12.537548 12.438287 32.743752-0.064468 45.214784-6.237051 6.209422-14.390755 9.342786-22.578228 9.342786-8.219195 0-16.405645-3.133364-22.642696-9.403161L511.840876 557.124733 373.870548 693.617407c-6.237051 6.144954-14.355963 9.242502-22.482037 9.242502-8.251941 0-16.470113-3.166109-22.735817-9.495258-12.409634-12.56927-12.317537-32.783661 0.25378-45.220924l137.807622-136.301316L329.41915 374.096187c-12.472056-12.502755-12.437264-32.748868 0.064468-45.220924 12.503778-12.503778 32.715099-12.440333 45.221948 0.066515l137.486304 137.901767L650.157081 330.346777c12.536524-12.438287 32.813337-12.311397 45.220924 0.25378 12.438287 12.571317 12.31242 32.813337-0.257873 45.221948L557.31558 512.128937 694.642249 649.903813 694.642249 649.903813zM694.642249 649.903813"
        }
      }
    },
    {
      data: {
        type: "defaultNote"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
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
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#13e199",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M823.296 60.416q65.536 0 99.328 38.4t33.792 93.696l0 543.744q0 25.6-21.504 46.08l-171.008 163.84q-13.312 11.264-22.528 14.336t-23.552 3.072l-459.776 0q-23.552 0-47.104-9.728t-41.984-27.648-30.208-43.008-11.776-55.808l0-634.88q0-60.416 33.28-96.256t94.72-35.84l568.32 0zM608.256 702.464q13.312 0 22.528-9.216t9.216-22.528q0-14.336-9.216-23.04t-22.528-8.704l-320.512 0q-13.312 0-22.528 8.704t-9.216 23.04q0 13.312 9.216 22.528t22.528 9.216l320.512 0zM736.256 509.952q13.312 0 22.528-9.216t9.216-22.528-9.216-22.528-22.528-9.216l-448.512 0q-13.312 0-22.528 9.216t-9.216 22.528 9.216 22.528 22.528 9.216l448.512 0zM799.744 318.464q13.312 0 22.528-9.216t9.216-23.552q0-13.312-9.216-22.528t-22.528-9.216l-512 0q-13.312 0-22.528 9.216t-9.216 22.528q0 14.336 9.216 23.552t22.528 9.216l512 0z"
        }
      }
    },
    {
      data: {
        type: "defaultMoney"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
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
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#dcb713",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M505.78944 28.118016c-261.41696 0-473.341952 211.919872-473.341952 473.339904 0 261.42208 211.924992 473.344 473.341952 473.344 261.419008 0 473.344-211.922944 473.344-473.344C979.13344 240.037888 767.208448 28.118016 505.78944 28.118016zM628.349952 325.368832l122.771456-122.791936c7.230464-7.230464 18.95936-7.230464 26.1888 0 7.230464 7.230464 7.230464 18.95936 0 26.1888L654.538752 351.557632c-3.61472 3.61472-8.354816 5.423104-13.094912 5.423104s-9.479168-1.80736-13.094912-5.423104C621.119488 344.327168 621.119488 332.598272 628.349952 325.368832zM237.902848 202.576896c7.230464-7.230464 18.95936-7.230464 26.1888 0l122.771456 122.791936c7.230464 7.230464 7.230464 18.95936 0 26.1888-3.61472 3.61472-8.354816 5.423104-13.094912 5.423104-4.740096 0-9.479168-1.80736-13.094912-5.423104L237.902848 228.765696C230.673408 221.536256 230.673408 209.80736 237.902848 202.576896zM793.698304 593.565696c10.222592 0 18.516992 8.31488 18.516992 18.516992s-8.2944 18.516992-18.516992 18.516992l-269.824 0 0 218.631168c0 10.202112-8.2944 18.516992-18.516992 18.516992s-18.516992-8.31488-18.516992-18.516992L486.84032 630.59968 217.879552 630.59968c-10.222592 0-18.516992-8.31488-18.516992-18.516992s8.2944-18.516992 18.516992-18.516992L486.84032 593.565696 486.84032 422.372352 217.879552 422.372352c-10.222592 0-18.516992-8.31488-18.516992-18.516992s8.2944-18.516992 18.516992-18.516992l575.818752 0c10.222592 0 18.516992 8.31488 18.516992 18.516992s-8.2944 18.516992-18.516992 18.516992l-269.824 0 0 171.193344L793.698304 593.565696z"
        }
      }
    },
    {
      data: {
        type: "defaultWuliu"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      style: {
        position: "relative"
      },
      // https://www.svgrepo.com/svg/13653/like
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#13addc",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M960 768 928 768C928 838.72 870.72 896 800 896 729.28 896 672 838.72 672 768L352 768C352 838.72 294.72 896 224 896 153.28 896 96 838.72 96 768L64 768C46.336 768 32 753.664 32 736L32 256C32 185.28 89.28 128 160 128L480 128C550.72 128 608 185.28 608 256L766.016 256C775.488 255.232 785.088 257.984 792.32 265.216L980.672 453.632C981.632 454.528 981.312 456 982.144 457.024 988.16 462.848 992 470.912 992 480L992 736C992 753.664 977.664 768 960 768ZM224 704C188.672 704 160 732.672 160 768 160 803.328 188.672 832 224 832 259.328 832 288 803.328 288 768 288 732.672 259.328 704 224 704ZM800 832C835.328 832 864 803.328 864 768 864 732.672 835.328 704 800 704 764.672 704 736 732.672 736 768 736 803.328 764.672 832 800 832ZM736 320 608 320 608 512 928 512 736 320Z"
        }
      }
    },
    {
      data: {
        type: "defaultYuanZhuTi"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      style: {
        position: "relative"
      },
      // https://www.svgrepo.com/svg/13653/like
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#333",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M916.48 335.552C910.592 11.648 113.408 11.52 107.52 335.552v352c0 324.16 809.344 325.376 809.472 0zM264.448 213.44C572.736 35.008 1063.68 287.104 759.552 463.424 448.448 643.776-38.4 389.248 264.448 213.44z m588.288 474.432c0 105.344-165.44 182.464-340.736 183.744-175.296-1.28-340.672-78.4-340.736-183.744V473.6c158.208 150.72 521.536 152.384 681.472 0z"
        }
      }
    },
    {
      data: {
        type: "defaultLiuCheng"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      style: {
        position: "relative"
      },
      // https://www.svgrepo.com/svg/13653/like
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#333",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M412 124c-5.523 0-10 4.477-10 10v200c0 5.523 4.477 10 10 10h200c5.523 0 10-4.477 10-10V134c0-5.523-4.477-10-10-10H412z m200-60c38.66 0 70 31.34 70 70v200c0 38.66-31.34 70-70 70h-70v99h270c27.614 0 50 22.386 50 50v147h48c27.614 0 50 22.386 50 50v160c0 27.614-22.386 50-50 50H750c-27.614 0-50-22.386-50-50V750c0-27.614 22.386-50 50-50h52V563H542v137h50c27.614 0 50 22.386 50 50v160c0 27.614-22.386 50-50 50H432c-27.614 0-50-22.386-50-50V750c0-27.614 22.386-50 50-50h50V563H222v137h52c27.614 0 50 22.386 50 50v160c0 27.614-22.386 50-50 50H114c-27.614 0-50-22.386-50-50V750c0-27.614 22.386-50 50-50h48V553c0-27.614 22.386-50 50-50h270v-99h-70c-38.66 0-70-31.34-70-70V134c0-38.66 31.34-70 70-70h200zM264 760H124v140h140V760z m318 0H442v140h140V760z m318 0H760v140h140V760z"
        }
      }
    },
    {
      data: {
        type: "defaultShuJuKu"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      style: {
        position: "relative"
      },
      // https://www.svgrepo.com/svg/13653/like
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#333",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M959.718832 123.963683C872.444401 50.185297 704.593576 0.299912 511.850044 0.299912S151.255687 50.185297 63.981255 123.963683C23.193205 158.453578 0 198.04198 0 240.22962v543.840672c0 132.461193 229.132871 239.929708 511.850044 239.929708s511.850044-107.468515 511.850044-239.929708v-543.840672c0-42.18764-23.193205-81.776042-63.981256-116.265937zM87.774285 189.64444c19.794201-21.893586 50.685151-43.087377 89.373816-61.182075 42.287611-19.794201 92.073025-35.489603 147.956653-46.586352C384.087474 70.17944 446.869081 64.281168 511.850044 64.281168s127.76257 5.898272 186.745289 17.594845c55.883628 11.096749 105.669042 26.792151 147.956654 46.586352 38.688665 18.094699 69.579615 39.28849 89.373816 61.182075 15.795372 17.494875 23.793029 34.489896 23.793029 50.48521 0 16.095285-7.997657 33.090306-23.793029 50.485209-19.794201 21.893586-50.685151 43.087377-89.373816 61.182075-42.287611 19.894172-92.073025 35.489603-147.956654 46.586352-58.98272 11.696573-121.864298 17.594845-186.745289 17.594845s-127.76257-5.898272-186.74529-17.594845c-55.883628-11.096749-105.669042-26.792151-147.956653-46.586352-38.688665-18.094699-69.579615-39.28849-89.373816-61.182075C71.978912 273.319926 63.981255 256.324905 63.981255 240.22962s7.997657-33.090306 23.79303-50.58518zM63.981255 356.495558c87.274431 73.778385 255.125256 123.66377 447.868789 123.66377s360.594357-49.885385 447.868788-123.66377v155.254515c0 16.095285-7.997657 33.090306-23.793029 50.48521-19.794201 21.893586-50.685151 43.087377-89.373816 61.182075-42.287611 19.794201-92.073025 35.489603-147.956654 46.586352-58.98272 11.696573-121.864298 17.594845-186.745289 17.594845s-127.76257-5.898272-186.74529-17.594845c-55.883628-11.096749-105.669042-26.792151-147.956653-46.586352-38.688665-18.094699-69.579615-39.28849-89.373816-61.182075C71.978912 544.740408 63.981255 527.745387 63.981255 511.750073V356.495558z m895.737577 427.574734c0 16.095285-7.997657 33.090306-23.793029 50.485209-19.794201 21.893586-50.685151 43.087377-89.373816 61.182076-42.287611 19.894172-92.073025 35.489603-147.956654 46.586352-58.98272 11.696573-121.864298 17.594845-186.745289 17.594845s-127.76257-5.898272-186.74529-17.594845c-55.883628-11.096749-105.669042-26.792151-147.956653-46.586352-38.688665-18.094699-69.579615-39.28849-89.373816-61.182076C71.978912 817.160597 63.981255 800.165576 63.981255 784.070292V627.91604c87.274431 73.778385 255.125256 123.66377 447.868789 123.663771s360.594357-49.885385 447.868788-123.663771v156.154252z,M167.950796 519.847701m-39.988285 0a39.988285 39.988285 0 1 0 79.976569 0 39.988285 39.988285 0 1 0-79.976569 0Z,M167.950796 791.768037m-39.988285 0a39.988285 39.988285 0 1 0 79.976569 0 39.988285 39.988285 0 1 0-79.976569 0Z"
        }
      }
    },
    {
      data: {
        type: "defaultYongHu"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      style: {
        position: "relative"
      },
      // https://www.svgrepo.com/svg/13653/like
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#333",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M617.216 696.192v-94.08C650.24 578.56 670.464 512 670.464 512c0-31.36 31.36-41.472 31.36-41.472 43.136-41.472 0-115.2 0-115.2V222.08C662.528 100.608 513.408 84.864 513.408 84.864s-150.016 15.616-189.44 137.088V355.2s-43.392 73.856 0 115.2c0 0 31.488 10.112 31.488 41.472 0 0 20.352 66.56 53.632 90.112v94.08S20.48 813.568 32.256 939.008h959.488c11.776-125.312-374.528-242.816-374.528-242.816z"
        }
      }
    },
    {
      data: {
        type: "defaultVideo"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      style: {
        position: "relative"
      },
      // https://www.svgrepo.com/svg/13653/like
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#5134bb",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M256.006827 42.669796a42.666382 42.666382 0 1 1 85.332764 0v938.660408a42.666382 42.666382 0 1 1-85.332764 0zM554.671502 383.147526c0-23.039846 16.213225-33.279778 37.546417-23.039847l227.838481 114.345905c41.813055 21.333191 40.959727 55.466297 0 75.94616l-33.279778 17.066553-193.705376 96.426024c-21.333191 10.239932-38.399744 0-38.399744-23.039847z,M0.008533 384.000853A41.813055 41.813055 0 0 1 41.821588 341.334471h255.998293a42.666382 42.666382 0 0 1 43.51971 42.666382 41.813055 41.813055 0 0 1-41.813054 42.666383h-255.998294A42.666382 42.666382 0 0 1 0.008533 384.000853zM0.008533 639.999147A41.813055 41.813055 0 0 1 41.821588 597.332764h255.998293a42.666382 42.666382 0 0 1 43.51971 42.666383 41.813055 41.813055 0 0 1-41.813054 42.666382h-255.998294A42.666382 42.666382 0 0 1 0.008533 639.999147zM1024.001707 384.000853a41.813055 41.813055 0 0 1 41.813054-42.666382h255.998294a42.666382 42.666382 0 0 1 41.813054 42.666382 41.813055 41.813055 0 0 1-41.813054 42.666383h-255.998294a42.666382 42.666382 0 0 1-41.813054-42.666383zM1024.001707 639.999147a41.813055 41.813055 0 0 1 41.813054-42.666383h255.998294a42.666382 42.666382 0 0 1 41.813054 42.666383 41.813055 41.813055 0 0 1-41.813054 42.666382h-255.998294a42.666382 42.666382 0 0 1-41.813054-42.666382z,M1024.001707 42.669796a42.666382 42.666382 0 1 1 85.332764 0v938.660408a42.666382 42.666382 0 1 1-85.332764 0z,M1262.933447 0.003413H102.407851A101.54599 101.54599 0 0 0 0.008533 101.549403v820.047866A103.252645 103.252645 0 0 0 102.407851 1023.996587h1160.525596a101.54599 101.54599 0 0 0 102.399318-101.54599V101.549403A103.252645 103.252645 0 0 0 1262.933447 0.003413z m17.066553 870.394198a68.266212 68.266212 0 0 1-67.412884 68.266211H152.754182a68.266212 68.266212 0 0 1-67.412884-68.266211V153.602389a68.266212 68.266212 0 0 1 67.412884-68.266211h1059.832934a68.266212 68.266212 0 0 1 67.412884 68.266211z"
        }
      }
    },
    {
      data: {
        type: "defaultMusic"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      style: {
        position: "relative"
      },
      // https://www.svgrepo.com/svg/13653/like
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#ff28eb",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M849.408 6.656L411.648 140.8c-53.248 15.36-95.744 70.656-95.744 123.392v461.312S284.16 704 213.504 714.24C109.568 729.088 25.6 808.448 25.6 891.904s83.968 134.656 187.904 119.808c103.936-14.848 179.712-91.648 179.712-175.104v-445.44c0-36.864 44.544-52.736 44.544-52.736l387.072-121.344s43.008-14.336 43.008 25.088v367.616s-39.424-22.528-110.08-14.336c-103.936 12.8-187.904 90.624-187.904 174.08S653.824 905.728 757.76 893.44c103.936-12.8 187.904-90.624 187.904-174.08V74.752c-0.512-52.224-43.52-82.944-96.256-68.096z"
        }
      }
    },
    {
      data: {
        type: "defaultImage"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      style: {
        position: "relative"
      },
      // https://www.svgrepo.com/svg/13653/like
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#333",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M810.666667 640V341.333333H213.333333v277.333334l59.733334-55.466667 115.2 98.133333 226.133333-196.266666L810.666667 640z m85.333333-384v512H128V256h768z"
        }
      }
    },
    {
      data: {
        type: "defaultFengXian"
      },
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      markup: [
        { ...filter },
        {
          tagName: "path",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      style: {
        position: "relative"
      },
      // https://www.svgrepo.com/svg/13653/like
      zIndex: 10,attrs: {
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: 4,
          textAnchor: "middle",
          textVerticalAnchor: "top",
          fontSize: 16,
          fill: "#333"
        },
        body: {
          fill: "#ff0101",
          stroke: null,
          strokeWidth: 1,
          filter: "url(#f4)",
          refD:
            "M112.8 917.9c-40.8 0-60.6-44.9-42.7-79.3 24.5-47 379.8-666 401.7-705.6 19.7-35.5 66.7-36.1 86.4 0 30 55.1 377.3 671.6 394.6 703.9 21.8 40.2-5.8 81-42.9 81H112.8z m380.1-261.2h42L563.1 381h-98.2l28 275.7z m-28 39.5V775h98.2v-78.7l-98.2-0.1z"
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
export const configNodePorts = (visibility = "hidden") => {
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
              visibility: visibility
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
              visibility: visibility
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
              visibility: visibility
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
              visibility: visibility
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
        strokeWidth: 1,
        rx: 5,
        ry: 5
      }
    }
  };
};

// 键盘事件
export const graphBindKey = graph => {
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
