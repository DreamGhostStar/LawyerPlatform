//用于我的页面展示
class BaseUserInfo {
  String name;
  String avatar;

  BaseUserInfo({this.name, this.avatar});

  factory BaseUserInfo.init(Map<String, dynamic> json) {
    return BaseUserInfo(name: json['nickname'], avatar: json['avatar']);
  }
}

BaseUserInfo user;
// =
//     BaseUserInfo.init({"name": "方俊", "avator": "images/defaultAvator.jpg"});
