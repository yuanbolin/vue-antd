/**
 * @Author 若维-苑博林
 * @create 2022/11/1 17:09
 */
import { Endpoint } from 'butterfly-dag'

class MyEndpoint extends Endpoint {
  /**
   * endpoint的渲染方法
   * @param {obj} data - 节点基本信息
   * @return {dom} - 返回渲染dom的根节点
   */
  draw(obj) {
    const path = super.draw(obj)
    path.style.opacity = 0
    return path
  }
}
export default MyEndpoint
