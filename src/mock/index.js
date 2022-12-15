import Mock from 'mockjs'
import '@/mock/user/current'
import '@/mock/project'
import '@/mock/user/login'
import '@/mock/workplace'
import '@/mock/user/routes'
import '@/mock/goods'
import '@/mock/list'
import '@/mock/userList'

/**
 * name 为属性名, rule 为规则, value 为值，属性名和生成规则之间用|分隔，生成规则的格式有7种：

 字符串 String, 数字 Number, 布尔型 Boolean, 对象 Object, 数组 Array, 函数 Function ,占位符定义
 'name|rule': value
 'name|min-max': 'value' //通过重复 'value' 生成一个字符串，重复次数大于等于 min，小于等于 max
 'name|count': 'value' //通过重复 'value' 生成一个字符串，重复次数等于 count
 'name|+1': 100 //属性值自动加 1，初始值为 100
 'name|1-100': 100 //生成一个大于等于 1、小于等于 100 的整数，属性值 100 只用来确定类型
 'name|1-100.1-10': 100 //生成一个浮点数，整数部分大于等于 1、小于等于 100，小数部分保留 1 到 10 位
 'name|1': value //随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率是 1/2。
 'name|min-max': value //随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。
 'name|min-max': {} //从属性值 {} 中随机选取 min 到 max 个属性。
 'name|count': {} //从属性值 {} 中随机选取 count 个属性。
 'name|1': [{}, {} ...] //从属性值 [{}, {} ...] 中随机选取 1 个元素，作为最终值
 'name|min-max': [{}, {} ...] //通过重复属性值 [{}, {} ...] 生成一个新数组，重复次数大于等于 min，小于等于 max
 'name|count': [{}, {} ...] //通过重复属性值 [{}, {} ...] 生成一个新数组，重复次数为 count
 'name': function(){} //执行函数 function(){}，取其返回值作为最终的属性值，上下文为 'name' 所在的对象
 *
 * 生成省：@mock=@province()
 生成市：@mock=@city()
 生成县：@mock=@county()
 生成url：@mock=@url()
 生成姓名：@mock=@cname()
 生成汉字：@mock=@cword(2,5)
 生成句子：@mock=@csentence(2,5)
 生成段落：@mock=@cparagraph(3)
 生成图片：@mock=@img(100x100)
 生成颜色：@mock=@imgcolor()
 生成日期：@mock=@date(yy-mm-dd)
 生成时间：@mock=@time(hh-mm-ss)
 生成自增：@mock=@increment(1)
 生成自然数：@mock=@natural(1,100)
 生成整数：@mock=@integer(1,100)
 生成小数：@mock=@float(1,100,2,3)
 */

// 设置全局延时
Mock.setup({
  timeout: '200-400'
})
