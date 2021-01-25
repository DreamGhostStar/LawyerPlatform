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
            "type": "string",
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
    "type": "GET",
    "url": "/api/test",
    "title": "测试接口",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>文章名</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/home.js",
    "group": "E:\\project\\lawyer_platform\\app\\controller\\home.js",
    "groupTitle": "E:\\project\\lawyer_platform\\app\\controller\\home.js",
    "name": "GetApiTest"
  }
] });
