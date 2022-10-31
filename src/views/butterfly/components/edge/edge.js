/**
 * @Author 若维-苑博林
 * @create 2022/10/31 9:56
 */
import { Edge } from 'butterfly-dag'
import $ from 'jquery'

class BaseEdge extends Edge {
  draw(obj) {
    const path = super.draw(obj)
    console.log(this)
    $(path).addClass('edge_black')
    console.log(path)
    this.draggable = true
    return path
  }
  drawLabel(text) {
    const dom = super.drawLabel(text)
    $(dom).addClass('edge_black')
    console.log(dom)
    return dom
  }

  // 重绘label
  redrawLabel() {
    super.redrawLabel()
  }
}

export default BaseEdge
