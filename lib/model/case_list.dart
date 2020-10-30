import 'package:lawyerplatform/model/lawyer_base_info.dart';

class CaseListItem {
  final num id; //案件id
  final String name; //案件名
  final String type; //案件类型
  final String audit; //案件审级
  LawyerBaseInfo host; //主办人

  CaseListItem({this.audit, this.host, this.id, this.name, this.type});

  factory CaseListItem.init(Map<String, dynamic> json) {
    return CaseListItem(
        id: json['id'],
        name: json['name'],
        type: json['type'],
        audit: json['audit'],
        host: LawyerBaseInfo.init(json['host']));
  }
}

List<CaseListItem> caseListModel = [
  new CaseListItem.init({
    'id': 00001,
    'name': '谢统开诉袁德方装修合同纠纷',
    'type': '民事',
    'audit': '一审',
    'host': {
      'name': '马奕辰',
      'id': 001,
      'phone': 13321312318,
      'lawyerNumber': '32133'
    }
  }),
  new CaseListItem.init({
    'id': 00001,
    'name': '拆迁安置补偿纠纷',
    'type': '民事',
    'audit': '二审',
    'host': {
      'name': '王小波',
      'id': 001,
      'phone': 13321312318,
      'lawyerNumber': '32133'
    }
  }),
  new CaseListItem.init({
    'id': 00001,
    'name': '抚养权争夺案',
    'type': '民事',
    'audit': '二审',
    'host': {
      'name': '李思维',
      'id': 001,
      'phone': 13321312318,
      'lawyerNumber': '32133'
    }
  }),
  new CaseListItem.init({
    'id': 00001,
    'name': '遗产分配案',
    'type': '民事',
    'audit': '一审',
    'host': {
      'name': '赵卫东',
      'id': 001,
      'phone': 13321312318,
      'lawyerNumber': '32133'
    }
  }),
  new CaseListItem.init({
    'id': 00001,
    'name': '张硕手机失窃案',
    'type': '民事',
    'audit': '二审',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 13321312318,
      'lawyerNumber': '32133'
    }
  }),
  new CaseListItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'audit': '二审',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
  new CaseListItem.init({
    'id': 00001,
    'name': '武松打虎',
    'type': '民事',
    'audit': '二审',
    'host': {
      'name': '张三',
      'id': 001,
      'phone': 1332131231,
      'lawyerNumber': '32133'
    }
  }),
];

// List<CaseListItem> newCaseList = [
//   new CaseListItem.init({
//     'id': 00002,
//     'name': '李逵打虎',
//     'type': '民事',
//     'audit': '二审',
//     'host': {
//       'name': '李四',
//       'id': 002,
//       'phone': 1332131231,
//       'lawyerNumber': '32133'
//     }
//   }),
//   new CaseListItem.init({
//     'id': 00002,
//     'name': '李逵打虎',
//     'type': '民事',
//     'audit': '二审',
//     'host': {
//       'name': '李四',
//       'id': 002,
//       'phone': 1332131231,
//       'lawyerNumber': '32133'
//     }
//   }),
//   new CaseListItem.init({
//     'id': 00002,
//     'name': '李逵打虎',
//     'type': '民事',
//     'audit': '二审',
//     'host': {
//       'name': '李四',
//       'id': 002,
//       'phone': 1332131231,
//       'lawyerNumber': '32133'
//     }
//   }),
//   new CaseListItem.init({
//     'id': 00002,
//     'name': '李逵打虎',
//     'type': '民事',
//     'audit': '二审',
//     'host': {
//       'name': '李四',
//       'id': 002,
//       'phone': 1332131231,
//       'lawyerNumber': '32133'
//     }
//   }),
//   new CaseListItem.init({
//     'id': 00002,
//     'name': '李逵打虎',
//     'type': '民事',
//     'audit': '二审',
//     'host': {
//       'name': '李四',
//       'id': 002,
//       'phone': 1332131231,
//       'lawyerNumber': '32133'
//     }
//   }),
//   new CaseListItem.init({
//     'id': 00002,
//     'name': '李逵打虎',
//     'type': '民事',
//     'audit': '二审',
//     'host': {
//       'name': '李四',
//       'id': 002,
//       'phone': 1332131231,
//       'lawyerNumber': '32133'
//     }
//   })
// ];
