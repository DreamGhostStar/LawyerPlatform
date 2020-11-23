import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_picker/Picker.dart';
import 'package:lawyerplatform/components/expansion_item.dart';
import 'package:lawyerplatform/components/util.dart';
import 'package:lawyerplatform/model/incom.dart';

class Income extends StatefulWidget {
  Income({Key key}) : super(key: key);

  @override
  _IncomeState createState() => _IncomeState();
}

class _IncomeState extends State<Income> {
  bool _loading = false;
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final int start = 2010;
  final int end = 2020;
  //TODO:后期需要改变
  List<int> _yearList = [];
  List<ExpansionPanelItem> _expansionList = [];

  _creatYearList() {
    for (var i = start; i <= end; i++) {
      _yearList.add(i);
    }
  }

  Future _load() async {
    setState(() {
      _loading = true;
      _expansionList.clear(); //防止重复添加
    });
    print(incomeListModel.length);

    //将后端传来的数据添加到expansionList中，构造收缩面板项
    //TODO:当年案件数量为0时单独处理
    incomeListModel.forEach((e) {
      _expansionList.add(ExpansionPanelItem(
          header: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                e.year.toString() + '年',
                style: TextStyle(fontSize: 20, fontFamily: 'main'),
              ),
              Text('总收入:￥' + e.yearSalary.toString())
            ],
          ),
          //TODO:foreach 和 map 的区别
          body: Container(
              margin: EdgeInsets.only(left: 20, right: 20),
              child: Column(
                children: e.cases
                    .map(
                      //TODO:普通函数和箭头函数的区别
                      (item) => Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('案件号:' + item['caseId']),
                                Text('身份:' + item['identity']),
                              ],
                            ),
                            Container(
                              margin: EdgeInsets.only(top: 15, bottom: 15),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text('总律师费:￥' +
                                      item['generalSalary'].toString()),
                                  Text('主协比例:' + item['ratio'])
                                ],
                              ),
                            ),
                            Text('该案件分得律师费:￥' + item['salary'].toString()),
                            Divider(height: 50)
                          ]),
                    )
                    .toList(),
              )),
          isExpanded: false));
    });
    await Future.delayed(Duration(seconds: 1), () {
      setState(() {
        _loading = false;
      });
    });
    return null;
  }

  @override
  void initState() {
    super.initState();
    _creatYearList();
    _load();
  }

  _pickyear(BuildContext context) {
    //年份选择器
    Picker(
      adapter: PickerDataAdapter(
        data: _yearList
            .map((e) => PickerItem(text: Text(e.toString()), value: e))
            .toList(),
      ),
      title: Text('选择年份'),
      selectedTextStyle: TextStyle(color: Colors.blue),
      onConfirm: (picker, selecteds) {
        print(selecteds.toString());
        // 索引值
        print(picker.getSelectedValues());
        // 选择值
        _load();
      },
    ).show(_scaffoldKey.currentState);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        backgroundColor: Colors.grey[200],
        title: Text('查看收入'),
        actions: [
          IconButton(
            icon: Icon(Icons.calendar_today),
            onPressed: (() {
              _pickyear(context);
            }),
          )
        ],
      ),
      body: _loading
          ? loadingWidget(_loading)
          : ListView(
              children: [
                ExpansionPanelList(
                    expansionCallback: (panelIndex, isExpanded) {
                      setState(() {
                        _expansionList[panelIndex].isExpanded = !isExpanded;
                      });
                    },
                    children: _expansionList.map((e) {
                      return ExpansionPanel(
                          headerBuilder:
                              (BuildContext context, bool isExpanded) {
                            return Container(
                                padding: EdgeInsets.only(
                                    left: 20, right: 20, top: 10, bottom: 10),
                                margin: EdgeInsets.only(top: 10, bottom: 10),
                                child: e.header);
                          },
                          body: e.body,
                          isExpanded: e.isExpanded);
                    }).toList())
              ],
            ),
    );
  }
}
