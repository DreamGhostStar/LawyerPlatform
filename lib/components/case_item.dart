import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/util.dart';

class CaseItems extends StatefulWidget {
  final String name;
  final String type;
  final String hostname;
  final num hostphone;
  CaseItems(
      {Key key,
      @required this.name,
      @required this.type,
      @required this.hostname,
      @required this.hostphone})
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
              //TODO:
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
                            Container(
                              padding: EdgeInsets.only(top: 3),
                              child: Text(' ' + widget.type),
                            ),
                          ],
                        ),
                        IconButton(
                            icon: Icon(Icons.more_horiz),
                            onPressed: () {
                              showModalBottomSheet(
                                  context: context,
                                  builder: (context) {
                                    return Container(
                                        padding: EdgeInsets.all(10),
                                        height: 70,
                                        child: Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            children: [
                                              Container(
                                                width: double.infinity,
                                                child: RaisedButton(
                                                  color: Colors.blue,
                                                  child: Text(
                                                    '修改案件',
                                                    style: TextStyle(
                                                        color: Colors.white),
                                                  ),
                                                  onPressed: () {
                                                    Navigator.pop(context);
                                                    openAlertDialog(context,
                                                        () {
                                                      print('确定');
                                                      //TODO:
                                                    }, '确认修改吗？');
                                                  },
                                                ),
                                              )
                                            ]));
                                  });
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
