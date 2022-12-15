import Mock from "mockjs";
import "@/mock/extend";
import { parseUrlParams } from "@/utils/request";

const current = new Date().getTime();

const source = Mock.mock({
  "list|100": [
    {
      "id|+1": 0,
      username: `${current}-@integer(1,100)`,
      name: "@cname()",
      "phone|10000000000-19999999999": 13296314652,
      address: "这是一个地址@province()-@city()-@county()",
      "department": "这是一个部门@csentence(2,5)",
      job: "这是一个工作岗位@csentence(2,5)",
      email: "@integer(100000,99999999)@qq.com",
      "status|0-1": 0
    }
  ]
});

Mock.mock(
  RegExp(`${process.env.VUE_APP_API_BASE_URL}/userList` + ".*"),
  "get",
  ({ url }) => {
    const params = parseUrlParams(decodeURI(url));
    let { page, pageSize } = params;
    page = eval(page) - 1 || 0;
    pageSize = eval(pageSize) || 10;

    delete params.page;
    delete params.pageSize;

    let result = source.list.filter(item => {
      for (let [key, value] of Object.entries(params)) {
        if (item[key] !== value) {
          return false;
        }
      }
      return true;
    });
    const total = result.length;
    if (page * pageSize > total) {
      result = [];
    } else {
      result = result.slice(page * pageSize, (page + 1) * pageSize);
    }

    return {
      code: 0,
      message: "success",
      data: {
        page: page + 1,
        pageSize,
        total: 100,
        list: result
      }
    };
  }
);
