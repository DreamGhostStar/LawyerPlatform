class NoticeItem {
  final String title;
  final String detail;
  bool iswatched;

  NoticeItem({this.iswatched, this.detail, this.title});

  factory NoticeItem.init(Map<dynamic, dynamic> json) {
    return NoticeItem(
        title: json['title'],
        detail: json['detail'],
        iswatched: json['iswatched']);
  }
}

List<NoticeItem> noticeListModel = [
  NoticeItem.init(
      {'title': '抚养权争夺案', 'detail': '您的结案申请已通过！', 'iswatched': false}),
  NoticeItem.init(
      {'title': '遗产分配案', 'detail': '您的结案申请被驳回，查看具体原因', 'iswatched': true})
];
