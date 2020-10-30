import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:lawyerplatform/components/case_info_raw.dart';
import 'package:lawyerplatform/components/util.dart';
import 'package:lawyerplatform/model/case_Info.dart';

class AlterCase extends StatefulWidget {
  final num id; //案件号
  AlterCase({Key key, @required this.id}) : super(key: key);

  @override
  _AlterCaseState createState() => _AlterCaseState();
}

class _AlterCaseState extends State<AlterCase> {
  TextEditingController _plaintiffController = new TextEditingController();
  TextEditingController _defendantController = new TextEditingController();
  TextEditingController _baseInfoController = new TextEditingController();
  TextEditingController _detailInfoController = new TextEditingController();
  List<TextEditingController> _oldguestControllerList = [];
  List<TextEditingController> _guestControllerList = []; //动态申请协办人控制器
  List<String> _auditList = ['侦查', '起诉', '一审', '二审', '再审', '仲裁'];
  List<String> _typeList = ['民事', '刑事', '行政', '非诉讼业务'];
  int selectValue1 = 0;
  int selectValue2 = 0;
  int guestNumber = 0;
  bool _loading = false;
  CaseDetailItem _caseDetailItem;

  @override
  void initState() {
    super.initState();
    _init();
  }

  @override
  void dispose() {
    _plaintiffController.dispose();
    _defendantController.dispose();
    _detailInfoController.dispose();
    _baseInfoController.dispose();
    _oldguestControllerList.map((e) => e.dispose());
    _guestControllerList.map((e) => e.dispose());
    super.dispose();
  }

  Future<Null> _init() async {
    setState(() {
      _loading = true;
    });
    _caseDetailItem = caseDetailItemModel;
    _plaintiffController.text = _caseDetailItem.plaintiff;
    _defendantController.text = _caseDetailItem.defendant;
    _baseInfoController.text = _caseDetailItem.baseInfo;
    _detailInfoController.text = _caseDetailItem.detailInfo;
    guestNumber = _caseDetailItem.guest.length; //用于构建原有的协办人
    if (guestNumber != 0) {
      for (int i = 0; i < guestNumber; i++) {
        _oldguestControllerList.add(new TextEditingController());
      }
      print(_caseDetailItem.guest[0]);
      _oldguestControllerList.map((e) => e.text = _caseDetailItem.guest[
          _oldguestControllerList
              .indexOf(e)]); //遍历协办人控制器数组，令控制器的文字等于原来协办人数组中的文字
      print('!!!!!');
      print(_oldguestControllerList[0].text);
    }

    Future.delayed(Duration(milliseconds: 200), () {
      if (mounted) {
        setState(() {
          _loading = false;
        });
      }
    });

    return;
  }

  _auditRow() {
    return Column(
      children: [
        Container(
            padding: EdgeInsets.only(top: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '审级',
                  style: TextStyle(color: Colors.grey),
                ),
                DropdownButton(
                    icon: Icon(Icons.keyboard_arrow_down),
                    value: selectValue1,
                    items: _auditList
                        .map((e) => DropdownMenuItem(
                              child: Text(e),
                              value: _auditList.indexOf(e),
                            ))
                        .toList(),
                    onChanged: (value) {
                      setState(() {
                        selectValue1 = value;
                      });
                    })
              ],
            )),
        Divider()
      ],
    );
  }

  _typeRow() {
    return Column(
      children: [
        Container(
            padding: EdgeInsets.only(top: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '案件类别',
                  style: TextStyle(color: Colors.grey),
                ),
                DropdownButton(
                    icon: Icon(Icons.keyboard_arrow_down),
                    value: selectValue2,
                    items: _typeList
                        .map((e) => DropdownMenuItem(
                              child: Text(e),
                              value: _typeList.indexOf(e),
                            ))
                        .toList(),
                    onChanged: (value) {
                      setState(() {
                        selectValue2 = value;
                      });
                    })
              ],
            )),
        Divider()
      ],
    );
  }

  _childLayout() {
    return ListView(children: [
      Card(
        margin: EdgeInsets.all(10),
        child: Container(
            padding: EdgeInsets.only(left: 15, right: 15),
            child: Column(children: [
              editRow('原告', _plaintiffController, 1),
              editRow('被告', _defendantController, 1),
              _auditRow(),
              _typeRow(),
              _guestList(), //原本有的协办人
              _guestAddList(), //后添加的协办人
              editRow('案由', _baseInfoController, 1),
              editRow('案件详情', _detailInfoController, 5),
              SizedBox(height: 50)
            ])),
      ),
    ]);
  }

  _guestList() {
    if (guestNumber == 0) {
      return List<Container>();
    } else {
      return Column(
        children: _caseDetailItem.guest
            .map((e) => Slidable(
                  child: editRow(
                      '协办人',
                      _oldguestControllerList[_caseDetailItem.guest.indexOf(e)],
                      1),
                  actionPane: SlidableDrawerActionPane(),
                  actionExtentRatio: 0.25,
                  actions: <Widget>[
                    IconSlideAction(
                      caption: '删除',
                      color: Colors.red,
                      onTap: () {
                        //TODO:
                      },
                      icon: Icons.delete,
                    )
                  ],
                ))
            .toList(),
      );
    }
  }

  _guestAddList() {
    return Column(
      children: _guestControllerList
          .map((e) => Slidable(
                child: editRow('协办人', e, 1),
                actionPane: SlidableDrawerActionPane(),
                actionExtentRatio: 0.25,
                actions: <Widget>[
                  IconSlideAction(
                    caption: '删除',
                    color: Colors.red,
                    onTap: () {
                      //TODO:
                    },
                    icon: Icons.delete,
                  )
                ],
              ))
          .toList(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        title: Text('修改案件'),
      ),
      body: _loading ? loadingWidget(_loading) : _childLayout(),
      floatingActionButton: Align(
        alignment: Alignment.bottomCenter,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            ActionChip(
              backgroundColor: Colors.blue,
              label: Text(
                '添加协办人',
                style: TextStyle(color: Colors.white),
              ),
              onPressed: () {
                setState(() {
                  _guestControllerList.add(new TextEditingController());
                });
              },
            ),
            ActionChip(
              backgroundColor: Colors.blue,
              label: Text(
                '提交',
                style: TextStyle(color: Colors.white),
              ),
              onPressed: () {
                //TODO:
                print('**********');
                _oldguestControllerList.map((e) => print(e.text));
                _guestControllerList.map((e) => print(e.text));
              },
            ),
          ],
        ),
      ),
    );
  }
}
