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
  },
  {
    "type": "GET",
    "url": "/api/user/salaryList",
    "title": "获取收入列表",
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
            "type": "number",
            "optional": true,
            "field": "year",
            "description": "<p>年份</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/salary.js",
    "group": "E:\\project\\lawyer_platform\\app\\controller\\salary.js",
    "groupTitle": "E:\\project\\lawyer_platform\\app\\controller\\salary.js",
    "name": "GetApiUserSalarylist"
  },
  {
    "type": "POST",
    "url": "/api/user/alterInfo",
    "title": "修改用户信息",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sex",
            "description": "<p>性别</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>电话</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "lawyer_scan_Image",
            "description": "<p>律师证扫描件url</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "driver_scan_Image",
            "description": "<p>驾驶证扫描件url</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "group": "E:\\project\\lawyer_platform\\app\\controller\\user.js",
    "groupTitle": "E:\\project\\lawyer_platform\\app\\controller\\user.js",
    "name": "PostApiUserAlterinfo"
  }
] });
