import 'package:lawyerplatform/model/lawyer_base_info.dart';

class CaseItem {
  final num id;
  final String name; //案件名
  final String type; //案件类型
  LawyerBaseInfo host; //主办人

  CaseItem({this.host, this.id, this.name, this.type});

  factory CaseItem.init(Map<String, dynamic> json) {
    return CaseItem(
        id: json['id'],
        name: json['name'],
        type: json['type'],
        host: LawyerBaseInfo.init(json['host']));
  }
}

List<CaseItem> caseListModel = [
  new CaseItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
];
List<CaseItem> newCaseList = [
  new CaseItem.init({
    'id': 00002,
    'name': '李逵打虎',
    'type': '民事',
    'host': {
      'name': '李四',
      'id': 002,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00002,
    'name': '李逵打虎',
    'type': '民事',
    'host': {
      'name': '李四',
      'id': 002,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00002,
    'name': '李逵打虎',
    'type': '民事',
    'host': {
      'name': '李四',
      'id': 002,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00002,
    'name': '李逵打虎',
    'type': '民事',
    'host': {
      'name': '李四',
      'id': 002,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00002,
    'name': '李逵打虎',
    'type': '民事',
    'host': {
      'name': '李四',
      'id': 002,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00002,
    'name': '李逵打虎',
    'type': '民事',
    'host': {
      'name': '李四',
      'id': 002,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00002,
    'name': '李逵打虎',
    'type': '民事',
    'host': {
      'name': '李四',
      'id': 002,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseItem.init({
    'id': 00002,
    'name': '李逵打虎',
    'type': '民事',
    'host': {
      'name': '李四',
      'id': 002,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
];
