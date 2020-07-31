class BaseUserInfo {
  final String name;
  final String avatar;

  BaseUserInfo({this.name, this.avatar});

  factory BaseUserInfo.init(Map<String, dynamic> json) {
    return BaseUserInfo(name: json['nickname'], avatar: json['avatar']);
  }
}

BaseUserInfo user;
