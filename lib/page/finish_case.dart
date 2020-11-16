import 'package:flui/flui.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/text_field.dart';
import 'package:lawyerplatform/components/util.dart';
import '../model/case_Info.dart';

class FinishCase extends StatefulWidget {
  FinishCase({Key key}) : super(key: key);

  @override
  _FinishCaseState createState() => _FinishCaseState();
}

class _FinishCaseState extends State<FinishCase> {
  TextEditingController _agencyController = new TextEditingController(); //代理词
  TextEditingController _finishFileController = new TextEditingController();
  //结案文书
  TextEditingController _fileController = new TextEditingController(); //归档请求
  bool _loading = false;
  bool _haveagent = false; //用户是否上传了代理词
  bool _agencyIsNull = true;
  bool _finishFileIsNull = true;
  bool _fileIsNull = true;
  @override
  void initState() {
    super.initState();
    _loadData();
    _agencyController.addListener(() {
      if (_agencyController.text != '') {
        setState(() {
          _agencyIsNull = false;
        });
      }
    });
    _finishFileController.addListener(() {
      if (_finishFileController.text != '') {
        setState(() {
          _finishFileIsNull = false;
        });
      }
    });
    _fileController.addListener(() {
      if (_fileController.text != '') {
        setState(() {
          _fileIsNull = false;
        });
      }
    });
  }

  @override
  void dispose() {
    _fileController.dispose();
    _agencyController.dispose();
    _finishFileController.dispose();
    super.dispose();
  }

  Future<Null> _loadData() async {
    setState(() {
      _loading = true;
    });
    if (caseDetailItemModel.agencyWord != '') {
      setState(() {
        _haveagent = true;
        _agencyIsNull = false;
      });
    }
    await Future.delayed(Duration(seconds: 1), () {
      setState(() {
        _loading = false;
      });
    });
    return null;
  }

  _askForFinish() {
    if (_agencyIsNull || _fileIsNull || _finishFileIsNull) {
      print(_agencyIsNull);
      print(_fileIsNull);
      print(_finishFileIsNull);
      openAlertDialog(context, () {
        _uploadData();
      }, '还有资料未上传,确定要请求归档吗？可能被管理员退回');
    } else {
      _uploadData();
    }
  }

  _uploadData() {
    //TODO:传数据给后端
    openSimpleDialog(context, '归档请求已上传至管理员！');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(title: Text('申请结案')),
      body: _loading
          ? loadingWidget(_loading)
          : ListView(
              children: [
                !_haveagent
                    ? FLNoticeBar.notice(
                        text: '注意:您还未上传代理词.',
                        delay: Duration(seconds: 1),
                      )
                    : Container(),
                SingleChildScrollView(
                  child: Container(
                    padding: EdgeInsets.all(20),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          margin: EdgeInsets.only(bottom: 20),
                          child: RichText(
                            text: TextSpan(
                                style: TextStyle(
                                    color: Colors.black, fontSize: 16),
                                children: [
                                  _haveagent
                                      ? TextSpan(text: '您已上传过代理词,可重新')
                                      : TextSpan(text: '您还未上传过代理词，可'),
                                  TextSpan(
                                      text: '点此上传',
                                      style: TextStyle(
                                          letterSpacing: 2,
                                          color: Colors.blue,
                                          fontSize: 18),
                                      recognizer: TapGestureRecognizer()
                                        ..onTap = () {
                                          print('asdasdasd');
                                          //TODO:上传文件,上传完毕后，将_agencyIsNull置为false
                                        }),
                                  TextSpan(text: ',或在下方文本框内编辑')
                                ]),
                          ),
                        ),
                        MyTextField(
                          labelText: '代理词',
                          controller: _agencyController,
                        ),
                        Container(
                          margin: EdgeInsets.only(bottom: 20),
                          child: RichText(
                            text: TextSpan(
                                style: TextStyle(
                                    color: Colors.black, fontSize: 16),
                                children: [
                                  TextSpan(text: '您可'),
                                  TextSpan(
                                      text: '点此上传',
                                      style: TextStyle(
                                          letterSpacing: 2,
                                          color: Colors.blue,
                                          fontSize: 18),
                                      recognizer: TapGestureRecognizer()
                                        ..onTap = () {
                                          print('asdasdasd');
                                          //TODO:上传文件,上传完毕后，将_finishFileIsNull置为false
                                        }),
                                  TextSpan(text: ',或在下方文本框内编辑')
                                ]),
                          ),
                        ),
                        MyTextField(
                          labelText: '结案文书',
                          controller: _finishFileController,
                        ),
                        Container(
                          margin: EdgeInsets.only(top: 20, bottom: 20),
                          child: MyTextField(
                            labelText: '归档请求',
                            controller: _fileController,
                          ),
                        ),
                        Container(
                          width: double.infinity,
                          child: RaisedButton(
                              color: Colors.blue,
                              child: Text(
                                '确定',
                                style: TextStyle(color: Colors.white),
                              ),
                              onPressed: () {
                                _askForFinish();
                              }),
                        )
                      ],
                    ),
                  ),
                )
              ],
            ),
    );
  }
}
