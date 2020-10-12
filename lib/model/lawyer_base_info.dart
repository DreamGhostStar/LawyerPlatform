class LawyerBaseInfo {
  final num id; //律师id
  final String name; //律师姓名
  final num phone; //律师电话
  final String lawyerNumber; //律师证号

  LawyerBaseInfo({this.id, this.lawyerNumber, this.name, this.phone});

  factory LawyerBaseInfo.init(Map<String, dynamic> json) {
    return LawyerBaseInfo(
        name: json['name'],
        id: json['id'],
        phone: json['phone'],
        lawyerNumber: json['lawyerNumber']);
  }
}
