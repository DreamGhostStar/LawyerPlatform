import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/case_info_raw.dart';
import 'package:lawyerplatform/components/case_info_skeleton.dart';
import 'package:lawyerplatform/components/popmenu_button.dart';
import 'package:lawyerplatform/model/case_Info.dart';
import 'package:lawyerplatform/page/upload_agency.dart';
import 'package:lawyerplatform/page/watch_html.dart';

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
    Future.delayed(Duration(seconds: 2), () {
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
    _tabController.addListener(() {
      if (_tabController.index == _tabController.animation.value) {
        _init();
      }
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  _guestRow(List<String> list) {
    int number = list.length;
    if (number == 0)
      return List<Container>();
    else {
      return list.map((e) => baseRow('协办人', e)).toList();
    }
  }

  _scaleRow(List<String> list) {
    int number = list.length;
    if (number == 0) {
      return Container();
    } else {
      return baseRow('主协比例', _caseDetailItem.scale.toString());
    }
  }

  Widget specialRow(String title, String agencyUrl, Function _function) {
    return Column(
      children: [
        Container(
            padding: EdgeInsets.only(top: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  title,
                  style: TextStyle(color: Colors.grey),
                ),
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
    if (have) {
      return specialRow('代理词', '点击查看', () {
        Navigator.of(context).push(MaterialPageRoute(
            builder: (context) => WatchHtml(
                  title: '代理词',
                )));
      });
    } else {
      return specialRow('代理词', '还没有代理词 点击上传', () {
        Navigator.of(context)
            .push(MaterialPageRoute(builder: (context) => UploadAgencyWord()));
      });
    }
  }

  _finishbookRow(bool isfinish, bool ishave) {
    if (isfinish) {
      //如果已经归档，判断是否上传了结案文书
      if (ishave) {
        return specialRow('结案文书', '点击查看', () {
          Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => WatchHtml(
                    title: '结案文书',
                  )));
        });
      } else {
        return specialRow('结案文书', '还没有结案文书 点击上传', () {
          //TODO:
        });
      }
    } else {
      //若还在办，则返回空盒子
      return Container();
    }
  }

  _buildProgressIndicator() {
    return CaseInfoSkeleton();
  }

  Widget _childLayout() {
    if (_loading) {
      return _buildProgressIndicator();
    } else {
      return ListView(children: [
        title('基本信息'),
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
              ])),
        ),
        title('办案人员'),
        Card(
          margin: EdgeInsets.all(10),
          child: Container(
              padding: EdgeInsets.all(15),
              child: Column(children: [
                baseRow('主办人', _caseDetailItem.host),
                Column(children: _guestRow(_caseDetailItem.guest)),
                _scaleRow(_caseDetailItem.guest),
              ])),
        ),
        title('详细信息'),
        Card(
          margin: EdgeInsets.all(10),
          child: Container(
              padding: EdgeInsets.all(15),
              child: Column(children: [
                baseRow('案由', _caseDetailItem.baseInfo),
                baseRow('案件详情', _caseDetailItem.detailInfo),
                _agencyRow(_caseDetailItem.agencyWord != '',
                    _caseDetailItem.agencyWord),
                _finishbookRow(_caseDetailItem.state == '归档',
                    _caseDetailItem.finishFile == '')
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
              actions: [
                popMenuButton(
                  id: widget.id,
                )
              ]),
          preferredSize: Size.fromHeight(85),
        ),
        body: TabBarView(controller: _tabController, children: [
          _childLayout(), //案件信息
          _childLayout2(), //案件日志
        ]));
  }
}
