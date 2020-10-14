import 'package:lawyerplatform/model/lawyer_base_info.dart';

class CaseItem {
  final String name; //案件名
  final String baseInfo; //基本信息
  final String state; //案件状态
  final num scale; //主办协办比例
  final String agencyWord; //代理词url
  final String finishFile;
  final String type; //案件类型
  final String audit; //案件审级
  LawyerBaseInfo host; //主办人
  List<LawyerBaseInfo> guest;

  CaseItem(
      {this.baseInfo,
      this.state,
      this.scale,
      this.agencyWord,
      this.finishFile,
      this.audit,
      this.host,
      this.name,
      this.guest,
      this.type});

  factory CaseItem.init(Map<String, dynamic> json) {
    List<LawyerBaseInfo> getList(list) {
      List<LawyerBaseInfo> arr = [];
      print(list);
      list.forEach((dynamic item) {
        arr.add(LawyerBaseInfo.init(item));
      });
      return arr;
    }

    return CaseItem(
        baseInfo: json['base_info'],
        state: json['state'],
        scale: json['scale'],
        agencyWord: json['agency_word'],
        finishFile: json['finish_file'],
        name: json['name'],
        type: json['type'],
        audit: json['audit'],
        guest: getList(json['guest_list']),
        host: LawyerBaseInfo.init(json['host']));
  }
}
