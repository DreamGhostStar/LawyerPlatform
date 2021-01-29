define({ "api": [
  {
    "type": "GET",
    "url": "/api/public/verificationCode/image",
    "title": "获取图片验证码",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "platform",
            "description": "<p>前后台区分</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/home.js",
    "group": "E:\\project\\lawyer_platform\\app\\controller\\home.js",
    "groupTitle": "E:\\project\\lawyer_platform\\app\\controller\\home.js",
    "name": "GetApiPublicVerificationcodeImage"
  },
  {
    "type": "PUT",
    "url": "/api/test",
    "title": "测试接口",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "user",
            "description": "<p>用户</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "user.name",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/home.js",
    "group": "E:\\project\\lawyer_platform\\app\\controller\\home.js",
    "groupTitle": "E:\\project\\lawyer_platform\\app\\controller\\home.js",
    "name": "PutApiTest"
  },
  {
    "type": "GET",
    "url": "/api/case/getList",
    "title": "获取案件列表信息",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isAll",
            "description": "<p>是否选择全部</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "status",
            "description": "<p>案件处理状态</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "page",
            "description": "<p>页数</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/law.js",
    "group": "E:\\project\\lawyer_platform\\app\\controller\\law.js",
    "groupTitle": "E:\\project\\lawyer_platform\\app\\controller\\law.js",
    "name": "GetApiCaseGetlist"
  }
] });
