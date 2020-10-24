class SearchItem {
  final int id;
  final String content;

  SearchItem({
    this.id,
    this.content,
  });

  factory SearchItem.init(Map<String, dynamic> json) {
    return SearchItem(
      id: json['id'],
      content: json['content'],
    );
  }
}

List<SearchItem> searchListModel = [
  SearchItem.init({'id': 1, 'content': 'asdasd'}),
  SearchItem.init({'id': 2, 'content': '345435'}),
  SearchItem.init({'id': 3, 'content': '余共一个环境'}),
  SearchItem.init({'id': 4, 'content': '都是反复'}),
  SearchItem.init({'id': 5, 'content': '下次VG热热的风格电饭锅'}),
];
