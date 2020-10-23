//用于我的页面展示
class BaseUserInfo {
  String nickname;
  String avatar;

  BaseUserInfo({this.nickname, this.avatar});

  factory BaseUserInfo.init(Map<String, dynamic> json) {
    return BaseUserInfo(nickname: json['nickname'], avatar: json['avatar']);
  }
}

// BaseUserInfo user;
// =
//     BaseUserInfo.init({"name": "方俊", "avator": "images/defaultAvator.jpg"});
