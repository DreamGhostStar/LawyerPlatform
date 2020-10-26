//用于我的页面展示
class BaseUserInfo {
  String nickname;
  String avatar;
  String lawyerID;

  BaseUserInfo({this.nickname, this.avatar, this.lawyerID});

  factory BaseUserInfo.init(Map<String, dynamic> json) {
    return BaseUserInfo(
        nickname: json['nickname'],
        avatar: json['avatar'],
        lawyerID: json['lawyerID']);
  }
}

BaseUserInfo user;
// =
//     BaseUserInfo.init({"name": "方俊", "avator": "images/defaultAvator.jpg"});
