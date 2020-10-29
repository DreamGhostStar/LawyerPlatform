import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/popmenu_button.dart';
import 'package:lawyerplatform/model/case_Info.dart';

class CaseInfo extends StatefulWidget {
  final num id;
  final String casename;

  CaseInfo({Key key, @required this.id, @required this.casename})
      : super(key: key);

  @override
  _CaseInfoState createState() => _CaseInfoState();
}

class _CaseInfoState extends State<CaseInfo> with TickerProviderStateMixin {
  TabController _tabController;
  bool _loading = false;
  CaseDetailItem _caseDetailItem;

  Future<Null> _init() async {
    setState(() {
      _loading = true;
    });
    _caseDetailItem = caseDetailItemModel;
    Future.delayed(Duration(milliseconds: 200), () {
      if (mounted) {
        setState(() {
          _loading = false;
        });
      }
    });

    return;
  }

  @override
  void initState() {
    super.initState();
    _tabController = new TabController(length: 2, vsync: this);
    _init();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Widget titleText(String text) {
    return Text(
      text,
      style: TextStyle(color: Colors.grey),
    );
  }

  Widget wordText(String text) {
    return Text(text);
  }

  Widget baseRow(String text1, String text2) {
    return Column(
      children: [
        Container(
            padding: EdgeInsets.only(top: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                titleText(text1),
                wordText(text2),
              ],
            )),
        Divider()
      ],
    );
  }

  _guestRow(List<String> list) {
    int number = list.length;
    print('~~~~~~~');
    print(number);
    if (number == 0)
      return Container();
    else if (number == 1)
      return Column(children: [
        baseRow('协办人', list[0]),
        baseRow('主协比例', _caseDetailItem.scale.toString())
      ]);
    else {
      return Column(
        children: [
          Column(
              children: list
                  .map((e) => baseRow('协办人' + list.indexOf(e).toString(), e))),
          baseRow('主协比例', _caseDetailItem.scale.toString())
        ],
      );
    }
  }

  Widget agencyRow(String agencyUrl, Function _function) {
    return Column(
      children: [
        Container(
            padding: EdgeInsets.only(top: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                titleText('代理词'),
                InkWell(
                    child:
                        Text(agencyUrl, style: TextStyle(color: Colors.blue)),
                    onTap: () {
                      _function();
                    })
              ],
            )),
        Divider()
      ],
    );
  }

  _agencyRow(bool have, String agencyUrl) {
    print(have);
    print(agencyUrl);
    if (have) {
      return agencyRow('点击查看', () {print('查看代理词');});
    } else {
      return agencyRow('还没有代理词,点击上传', () {print('上传代理词');});
    }
  }

  Widget _childLayout() {
    if (_loading) {
      return Center(child: Container(child: CircularProgressIndicator()));
    } else {
      return ListView(children: [
        Container(
          padding: EdgeInsets.only(top: 10, left: 10, right: 10),
          child: Text(
            '基本信息',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
        ),
        Card(
          margin: EdgeInsets.all(10),
          child: Container(
              padding: EdgeInsets.all(15),
              child: Column(children: [
                baseRow('原告姓名', _caseDetailItem.plaintiff),
                baseRow('被告姓名', _caseDetailItem.defendant),
                baseRow('案件类型', _caseDetailItem.type),
                baseRow('案件状态', _caseDetailItem.state),
                baseRow('案件审级', _caseDetailItem.audit),
                baseRow('案由', _caseDetailItem.baseInfo),
                baseRow('案件详情', '_caseDetailItem.detailInfo'),
              ])),
        ),
        Container(
          padding: EdgeInsets.only(top: 10, left: 10, right: 10),
          child: Text(
            '办案人员',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
        ),
        Card(
          margin: EdgeInsets.all(10),
          child: Container(
              padding: EdgeInsets.all(15),
              child: Column(children: [
                baseRow('主办人', _caseDetailItem.host),
//                _guestRow(_caseDetailItem.guest),

                _agencyRow(_caseDetailItem.agencyWord != '',
                    _caseDetailItem.agencyWord),
              ])),
        ),
        Align(
            alignment: Alignment.center,
            child: Container(
                child: Text(
              '到底啦~',
              style: TextStyle(color: Colors.grey),
            )))
      ]);
    }
  }

  Widget _childLayout2() {
    if (_loading) {
      return Center(child: Container(child: CircularProgressIndicator()));
    } else {
      return ListView(children: [
        Center(
          child: Text('案件日志'),
        )
      ]);
    }
  }

  List<Widget> _tabs = [
    Container(
        child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [Icon(Icons.info_outline), Text('案件信息')],
    )),
    Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [Icon(Icons.library_books), Text('案件日志')],
      ),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: PreferredSize(
          child: AppBar(
            title: Text(widget.casename),
            bottom: TabBar(
              tabs: _tabs,
              controller: _tabController,
            ),
            centerTitle: true,
            actions: [popMenuButton()],
          ),
          preferredSize: Size.fromHeight(85),
        ),
        body: TabBarView(controller: _tabController, children: [
          _childLayout(), //案件信息
          _childLayout2(), //案件日志
        ]));
  }
}
