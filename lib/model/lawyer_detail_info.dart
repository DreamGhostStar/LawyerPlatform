//律师详细信息
//用于用户详情页面
class LawyerDetailInfo {
  final String name; //律师姓名
  final String lawyerScanImage; //律师证扫描件
  final String phone; //律师电话
  final String sex;
  final String driverScanImage; //驾驶证扫描件
  String avator; //律师头像

  LawyerDetailInfo(
      {this.name,
      this.phone,
      this.lawyerScanImage,
      this.sex,
      this.driverScanImage,
      this.avator});

  factory LawyerDetailInfo.init(Map<String, dynamic> json) {
    return LawyerDetailInfo(
        name: json['name'],
        lawyerScanImage: json['lawyerScanImage'],
        phone: json['phone'],
        sex: json['sex'],
        driverScanImage: json['driverScanImage'],
        avator: json['avator']);
  }
}

LawyerDetailInfo userA = LawyerDetailInfo.init({
  'name': '朱元璋',
  'lawyerScanImage': 'http://p3.pstatp.com/large/59300000e1bb4d73d43e',
  'phone': '1231231231',
  'sex': '女',
  'driverScanImage': 'http://p3.pstatp.com/large/59300000e1bb4d73d43e',
  'avator': 'http://p3.pstatp.com/large/59300000e1bb4d73d43e'
});
