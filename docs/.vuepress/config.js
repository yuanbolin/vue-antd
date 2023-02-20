module.exports = {
  title: 'Vue Antd',
  description: 'Vue Antd',
  base: '/vue-antd-docs/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    repo: 'yuanbolin/vue-antd',
    docsDir: 'docs',
    nav: [
      {text: '指南', link: '/'},
      {text: '配置', link: '/develop/layout'},
      {text: '主题', link: '/advance/theme'},
    ],
    sidebar: [
      {
        title: '开始',
        collapsable: false,
        children: [
          '/start/use', '/start/faq'
        ]
      },
      {
        title: '开发',
        collapsable: false,
        children: [
          '/develop/layout', '/develop/router', '/develop/page', '/develop/theme', '/develop/service'
        ]
      },
      {
        title: '进阶',
        collapsable: false,
        children: [
          '/advance/i18n', '/advance/async', '/advance/authority', '/advance/login', '/advance/guard', '/advance/interceptors',
          '/advance/api', '/advance/icons'
        ]
      }
    ],
    nextLinks: true,
    prevLinks: true,
  },
  plugins: ['@vuepress/back-to-top', require('./plugins/alert')],
  markdown: {
    lineNumbers: true
  }
}
