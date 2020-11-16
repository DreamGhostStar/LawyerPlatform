class CaseDetailItem {
  final String name; //案件名
  final String baseInfo; //案由
  final String detailInfo; //案件详情
  final String state; //案件状态
  final num scale; //主办协办比例
  final String agencyWord; //代理词url
  final String finishFile; //结案文书url 可能为null
  final String type; //案件类型
  final String audit; //案件审级
  final String plaintiff; //原告
  final String defendant; //被告
  final String host; //主办人
  final List<String> guest;

  CaseDetailItem(
      {this.baseInfo,
      this.detailInfo,
      this.plaintiff,
      this.defendant,
      this.state,
      this.scale,
      this.agencyWord,
      this.finishFile,
      this.audit,
      this.host,
      this.name,
      this.guest,
      this.type});

  factory CaseDetailItem.init(Map<String, dynamic> json) {
    List<String> getList(list) {
      List<String> arr = [];
      list.forEach((item) {
        arr.add(item);
      });
      return arr;
    }

    return CaseDetailItem(
        baseInfo: json['base_info'],
        detailInfo: json['detail_info'],
        plaintiff: json['plaintiff'],
        defendant: json['defendant'],
        state: json['state'],
        scale: json['scale'],
        agencyWord: json['agency_word'],
        finishFile: json['finish_file'],
        name: json['name'],
        type: json['type'],
        audit: json['audit'],
        guest: getList(json['guest_list']),
        host: json['host']);
  }
}

CaseDetailItem caseDetailItemModel = CaseDetailItem.init({
  'base_info': '案件基本信息',
  'detail_info':
      '案件详细信息ssf sdfl;k sl;fk sl;adfk sl;adfk asl;dfj skldjf klashd ',
  'plaintiff': '老虎',
  'defendant': '李逵',
  'state': '归档',
  'scale': 0.6,
  'agency_word': '', ////若为空，用空字符串表示
  'finishFile': '', //若为空，用空字符串表示
  'name': '李逵打虎',
  'type': '民事',
  'audit': '一审',
  'guest_list': ['李四', '王五'],
  'host': '张三'
});
