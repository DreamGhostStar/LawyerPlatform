class ElectriCardInfo {
  final String name; //律师姓名
  final String picture;
  final String lawyerHouseName;
  final String phone; //律师电话
  final String lawyerNumber; //律师证号
  final String winxinCode;
  final String lawyerHouseAddress;

  ElectriCardInfo(
      {this.picture,
      this.lawyerHouseName,
      this.winxinCode,
      this.lawyerHouseAddress,
      this.lawyerNumber,
      this.name,
      this.phone});

  factory ElectriCardInfo.init(Map<String, dynamic> json) {
    return ElectriCardInfo(
        name: json['name'],
        picture: json['picture'],
        lawyerHouseName: json['lawyerHouseName'],
        winxinCode: json['winxinCode'],
        lawyerHouseAddress: json['lawyerHouseAddress'],
        phone: json['phone'],
        lawyerNumber: json['lawyerNumber']);
  }
}

ElectriCardInfo electriCardInfoModel = ElectriCardInfo.init({
  'name': '马奕辰',
  'picture':
      'http://b-ssl.duitang.com/uploads/item/201809/14/20180914011823_mldib.jpg',
  'lawyerHouseName': '君上杰律师事务所',
  'winxinCode':
      'http://src.house.sina.com.cn/imp/imp/deal/77/11/f/c256f0bc1914944b69557e1b371_p1_mk1.jpg',
  'lawyerHouseAddress': '江苏省镇江市京口区学府路202号精神病院',
  'phone': '15712345678',
  'lawyerNumber': '8008208820'
});
