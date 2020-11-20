class CaseItem {
  final String caseId; //案件号
  final String identity; //身份，主办人还是协办人
  final int generalSalary; //总律师费
  final String ratio; //主协办比例
  final int salary; //分得的律师费

  CaseItem({
    this.caseId,
    this.identity,
    this.generalSalary,
    this.ratio,
    this.salary,
  });

  factory CaseItem.init(Map<String, dynamic> json) {
    return CaseItem(
      caseId: json['caseId'],
      identity: json['identity'],
      generalSalary: json['generalSalary'],
      ratio: json['ratio'],
      salary: json['salary'],
    );
  }
}

class IncomeItem {
  final int year; //年份
  final int yearSalary;
  final List<Map> cases;

  IncomeItem({this.year, this.yearSalary, this.cases});

  factory IncomeItem.init(Map<String, dynamic> json) {
    List<Map> getList(list) {
      List<Map> arr = [];
      list.forEach((item) {
        arr.add(item);
      });
      return arr;
    }

    return IncomeItem(
      year: json['year'],
      yearSalary: json['yearSalary'],
      cases: getList(json['cases']),
    );
  }
}

List<IncomeItem> incomeListModel = [
  IncomeItem.init({
    'year': 2010,
    'yearSalary': 160000,
    'cases': [
      {
        'caseId': '1231231',
        'identity': '主办人',
        'generalSalary': 20000,
        'ratio': '0.5',
        'salary': 10000,
      },
      {
        'caseId': '1231232',
        'identity': '协办人',
        'generalSalary': 40000,
        'ratio': '0.4',
        'salary': 16000,
      }
    ]
  }),
  IncomeItem.init({
    'year': 2011,
    'yearSalary': 340000,
    'cases': [
      {
        'caseId': '1231231',
        'identity': '主办人',
        'generalSalary': 20000,
        'ratio': '0.5',
        'salary': 10000,
      },
      {
        'caseId': '1231231',
        'identity': '主办人',
        'generalSalary': 20000,
        'ratio': '0.5',
        'salary': 10000,
      },
      {
        'caseId': '1231231',
        'identity': '主办人',
        'generalSalary': 20000,
        'ratio': '0.5',
        'salary': 10000,
      }
    ]
  })
];
