class Contack {
  final String name; //联系人姓名
  final String phone; //联系人电话

  Contack({this.name, this.phone});

  factory Contack.init(Map<String, dynamic> json) {
    return Contack(name: json['name'], phone: json['phone']);
  }
}

// 单位电话数据模型
class WorkPhoneItem {
  final String name; //单位名称
  final List<Map> contacks; //联系人

  WorkPhoneItem({this.name, this.contacks});

  factory WorkPhoneItem.init(Map<String, dynamic> json) {
    List<Map> getList(list) {
      List<Map> arr = [];
      list.forEach((item) {
        arr.add(item);
      });
      return arr;
    }

    return WorkPhoneItem(
      name: json['name'],
      contacks: getList(json['contacks']),
    );
  }
}

List<WorkPhoneItem> workPhoneListmodel = [
  new WorkPhoneItem.init({
    'name': '君上杰律师事务所',
    'contacks': [
      {'name': '张硕', 'phone': '15701624628'},
      {'name': '王冕', 'phone': '23423423324'}
    ]
  }),
  new WorkPhoneItem.init({
    'name': '君吓人律师事务所',
    'contacks': [
      {'name': '张三', 'phone': '15701624628'},
      {'name': '李四', 'phone': '23423423324'}
    ]
  }),
  new WorkPhoneItem.init({
    'name': '一二三律师事务所',
    'contacks': [
      {'name': '王五', 'phone': '15701624628'},
      {'name': '赵柳', 'phone': '23423423324'}
    ]
  }),
  new WorkPhoneItem.init({
    'name': '不知道律师事务所',
    'contacks': [
      {'name': '阿达', 'phone': '15701624628'},
      {'name': '切切', 'phone': '23423423324'}
    ]
  }),
];
