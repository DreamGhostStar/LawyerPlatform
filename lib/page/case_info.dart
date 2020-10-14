import 'package:flutter/material.dart';

class CaseInfo extends StatefulWidget {
  final num id;
  final String casename;
  CaseInfo({Key key, @required this.id, @required this.casename})
      : super(key: key);

  @override
  _CaseInfoState createState() => _CaseInfoState();
}

class _CaseInfoState extends State<CaseInfo> {
  bool _loading = false;

  Future<Null> _init() async {
    setState(() {
      _loading = true;
    });
    Future.delayed(Duration(milliseconds: 2000), () {
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
    _init();
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
    return Container(
        padding: EdgeInsets.only(top: 8),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            titleText(text1),
            wordText(text2),
          ],
        ));
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
              padding: EdgeInsets.all(10),
              child: Column(children: [
                baseRow('案件类型', '案件类型'),
                Divider(),
                baseRow('案件审级', '案件审级'),
                Divider(),
                baseRow('主协比例', '主协比例'),
                Divider(),
                baseRow('代理词', '代理词'),
                Divider(),
                baseRow('结案文书', '结案文书'),
                Divider(),
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
              padding: EdgeInsets.all(10),
              child: Column(children: [
                baseRow('主办人', '主办人'),
                Divider(),
                baseRow('协办人', '协办人'),
                Divider(),
                baseRow('主协比例', '主协比例'),
                Divider(),
                baseRow('代理词', '代理词'),
                Divider(),
                baseRow('结案文书', '结案文书'),
                Divider(),
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.casename,
        ),
        centerTitle: true,
      ),
      body: _childLayout(),
    );
  }
}
