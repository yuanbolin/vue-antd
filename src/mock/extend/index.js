import Mock from 'mockjs'
import {logos, sayings, positions, avatars, admins} from '../common'

const Random = Mock.Random

const timeList = [
  {
    CN: '早上好',
    HK: '早晨啊',
    US: 'Good morning',
  },{
    CN: '上午好',
    HK: '上午好',
    US: 'Good morning',
  },{
    CN: '中午好',
    HK: '中午好',
    US: 'Good afternoon',
  },{
    CN: '下午好',
    HK: '下午好',
    US: 'Good afternoon',
  },{
    CN: '晚上好',
    HK: '晚上好',
    US: 'Good evening',
  }
]

const welcomeMessages = [
  {
    CN: '休息一会儿吧',
    HK: '休息一會兒吧',
    US: 'you may need a break',
  },
  {
    CN: '愿你有美好的一天！',
    HK: '願你有美好的一天！',
    US: 'Have a nice day！',
  },
  {
    CN: '做最好的自己。',
    HK: '做最好的自己。',
    US: 'Be the best you can be',
  },
  {
    CN: '我猜你可能累了',
    HK: '我猜你可能累了',
    US: 'i guess you might be tired',
  }
]

const goods = ['运动鞋', '短裤', 'T恤', '七分裤', '风衣', '寸衫']

Random.extend({
  admin () {
    return this.pick(admins)
  },
  welcome () {
    return this.pick(welcomeMessages)
  },
  timeFix () {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9
      ? timeList[0] : (hour <= 11 ? timeList[1] : (hour <= 13 ? timeList[2] : (hour <= 20 ? timeList[3] : timeList[4])))
  },
  avatar () {
    return this.pick(avatars)
  },
  position () {
    return this.pick(positions)
  },
  goods () {
    return this.pick(goods)
  },
  saying () {
    return this.pick(sayings)
  },
  logo () {
    return this.pick(logos)
  }
})
