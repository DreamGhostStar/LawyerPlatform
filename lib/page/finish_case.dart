import 'package:flui/flui.dart';
import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/util.dart';
import '../model/case_Info.dart';

class FinishCase extends StatefulWidget {
  FinishCase({Key key}) : super(key: key);

  @override
  _FinishCaseState createState() => _FinishCaseState();
}

class _FinishCaseState extends State<FinishCase> {
  bool _loading = false;
  bool _haveagent = false; //用户是否上传了代理词
  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<Null> _loadData() async {
    setState(() {
      _loading = true;
    });
    if (caseDetailItemModel.agencyWord != '') {
      _haveagent = true;
    }
    await Future.delayed(Duration(seconds: 1), () {
      setState(() {
        _loading = false;
      });
    });
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[200],
        appBar: AppBar(title: Text('申请结案')),
        body: _loading
            ? loadingWidget(_loading)
            : !_haveagent
                ? FLNoticeBar.notice(
                    text: '注意:您还未上传代理词.',
                    delay: Duration(seconds: 1),
                  )
                : null);
  }
}
