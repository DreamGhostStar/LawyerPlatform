import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:lawyerplatform/components/util.dart';
import 'package:lawyerplatform/model/base_user_info.dart';
import 'package:lawyerplatform/page/case_info.dart';
import 'package:lawyerplatform/page/finish_case.dart';

class CaseItems extends StatefulWidget {
  final num caseid;
  final String name;
  final String type;
  final String hostname;
  final num hostphone;
  final String audit;
  CaseItems(
      {Key key,
      @required this.name,
      @required this.type,
      @required this.hostname,
      @required this.hostphone,
      @required this.audit,
      @required this.caseid})
      : super(key: key);

  @override
  _CaseItemsState createState() => _CaseItemsState();
}

class _CaseItemsState extends State<CaseItems> {
  @override
  Widget build(BuildContext context) {
    return Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(12),
        elevation: 0,
        child: InkWell(
            splashColor: Colors.yellow.withOpacity(0.3),
            highlightColor: Colors.yellow.withOpacity(0.1),
            onTap: () {
              if (user == null) {
                Fluttertoast.showToast(msg: '请先登录');
              } else {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => CaseInfo(
                          id: widget.caseid,
                          casename: widget.name,
                        )));
              }
            },
            child: Container(
                color: Colors.white,
                padding:
                    EdgeInsets.only(top: 5, left: 30, right: 10, bottom: 10),
                margin: EdgeInsets.only(top: 10),
                child: Column(children: [
                  Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              child: Text(widget.name,
                                  style: TextStyle(
                                      fontSize: 18,
                                      fontFamily: 'main',
                                      fontWeight: FontWeight.bold)),
                            ),
                            Row(
                              children: [
                                Container(
                                  padding: EdgeInsets.only(top: 3),
                                  child: Text(' ' + widget.type),
                                ),
                                Container(
                                  padding: EdgeInsets.only(top: 3),
                                  child: Text('·' + widget.audit),
                                )
                              ],
                            )
                          ],
                        ),
                        IconButton(
                            icon: Icon(Icons.more_horiz),
                            onPressed: () {
                              if (user == null) {
                                Fluttertoast.showToast(msg: '请先登录');
                              } else {
                                showModalBottomSheet(
                                    context: context,
                                    builder: (context) {
                                      return Container(
                                          height: 200,
                                          color: Colors.grey[200],
                                          child: Column(children: [
                                            Container(
                                              width: double.infinity,
                                              child: FlatButton(
                                                color: Colors.white,
                                                child: Text(
                                                  '修改案件',
                                                ),
                                                onPressed: () {
                                                  Navigator.pop(context);
                                                  openAlertDialog(context, () {
                                                    print('确定');
                                                    //TODO:
                                                  }, '确认修改吗？');
                                                },
                                              ),
                                            ),
                                            Container(
                                              width: double.infinity,
                                              child: FlatButton(
                                                color: Colors.white,
                                                child: Text(
                                                  '上传代理词',
                                                ),
                                                onPressed: () {
                                                  Navigator.pop(context);
                                                },
                                              ),
                                            ),
                                            Container(
                                              width: double.infinity,
                                              child: FlatButton(
                                                color: Colors.white,
                                                child: Text(
                                                  '申请结案',
                                                ),
                                                onPressed: () {
                                                  Navigator.pop(context);
                                                  Navigator.of(context).push(
                                                      MaterialPageRoute(
                                                          builder: (context) =>
                                                              FinishCase()));
                                                },
                                              ),
                                            ),
                                            Expanded(
                                              child: Container(
                                                color: Colors.white,
                                                width: double.infinity,
                                                child: FlatButton(
                                                  color: Colors.white,
                                                  child: Align(
                                                      alignment: Alignment
                                                          .bottomCenter,
                                                      child: Column(children: [
                                                        SizedBox(height: 10),
                                                        Text('取消',
                                                            style: TextStyle(
                                                                fontSize: 16))
                                                      ])),
                                                  onPressed: () {
                                                    Navigator.pop(context);
                                                  },
                                                ),
                                              ),
                                            )
                                          ]));
                                    });
                              }
                            })
                      ]),
                  Divider(
                    thickness: 1,
                  ),
                  Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.person_outline, size: 15),
                            Text(
                              ' 主办人: ' + widget.hostname,
                              style: TextStyle(
                                  fontSize: 10, color: Colors.grey[600]),
                            )
                          ],
                        ),
                        Row(children: [
                          Icon(Icons.phone_android, size: 15),
                          Text(' 电话: ' + widget.hostphone.toString(),
                              style: TextStyle(
                                  fontSize: 10, color: Colors.grey[600]))
                        ])
                      ])
                ]))));
  }
}
