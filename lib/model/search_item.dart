import 'package:lawyerplatform/model/lawyer_base_info.dart';

class SearchItem {
  final int id; //案件id
  final String name; //案件名称
  final String type; //案件类型
  final String audit; //案件审级
  final LawyerBaseInfo host; //主办人

  SearchItem({
    this.id,
    this.name,
    this.type,
    this.audit,
    this.host,
  });

  factory SearchItem.init(Map<String, dynamic> json) {
    return SearchItem(
        id: json['id'],
        name: json['name'],
        type: json['type'],
        audit: json['audit'],
        host: LawyerBaseInfo.init(json['host']));
  }
}

List<SearchItem> searchListModel = [
  SearchItem.init({
    'id': 1,
    'name': '武松打虎',
    'type': '民事',
    'audit': '一审',
    'host': {'name': '张三', 'phone': 3412312}
  }),
  SearchItem.init({
    'id': 2,
    'name': '李逵打虎',
    'type': '民事',
    'audit': '二审',
    'host': {'name': '李四', 'phone': 1313123132}
  }),
];
