import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/expansion_item.dart';
import 'package:lawyerplatform/components/util.dart';
import 'package:lawyerplatform/model/work_phone_list.dart';
import 'package:url_launcher/url_launcher.dart';

class DayTimePhone extends StatefulWidget {
  DayTimePhone({Key key}) : super(key: key);

  @override
  _DayTimePhoneState createState() => _DayTimePhoneState();
}

class _DayTimePhoneState extends State<DayTimePhone> {
  bool _loading = false;
  List<WorkPhoneItem> _list = [];
  List<ExpansionPanelItem> _expansionPanelItems = [];

  Future _load() async {
    setState(() {
      _loading = true;
    });
    _list.addAll(workPhoneListmodel);
    print(_list.length);
    _list.forEach((e) {
      //日常电话列表中的每一项构建一个收缩面板项
      _expansionPanelItems.add(ExpansionPanelItem(
        headerText: e.name,
        body: Container(
          padding: EdgeInsets.all(20),
          width: double.infinity,
          child: Column(
            children: e.contacks
                .map((item) => Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                                child: Text(
                              item['name'],
                              style: TextStyle(fontSize: 20),
                            )),
                            Row(
                              children: [
                                Container(
                                    child: Text(
                                  item['phone'],
                                  style: TextStyle(fontSize: 16),
                                )),
                                IconButton(
                                    icon: Icon(Icons.phone),
                                    color: Colors.blue,
                                    onPressed: () {
                                      _launchPhone(item['phone']);
                                    })
                              ],
                            )
                          ],
                        ),
                        Divider()
                      ],
                    ))
                .toList(),
          ),
        ),
        isExpanded: false,
      ));
    });
    print(_list.length);
    print(_expansionPanelItems.length);
    Future.delayed(Duration(seconds: 1), () {
      setState(() {
        _loading = false;
      });
    });
    return null;
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _load();
  }

  _launchPhone(String phoneNumber) async {
    var url = 'tel:$phoneNumber';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      Scaffold.of(context).showSnackBar(SnackBar(content: Text('出错了...')));
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[200],
        appBar: AppBar(
          title: Text('日常电话'),
        ),
        body: _loading
            ? loadingWidget(_loading)
            : ListView(
                children: [
                  ExpansionPanelList(
                    // expandedHeaderPadding: ,
                    expansionCallback: (panelIndex, isExpanded) {
                      setState(() {
                        _expansionPanelItems[panelIndex].isExpanded =
                            !isExpanded;
                      });
                    },
                    children: _expansionPanelItems.map((e) {
                      return ExpansionPanel(
                          headerBuilder:
                              (BuildContext context, bool isExpanded) {
                            return Container(
                              padding: EdgeInsets.only(
                                  left: 20, right: 20, top: 10, bottom: 10),
                              margin: EdgeInsets.only(top: 10, bottom: 10),
                              child: Text(
                                e.headerText,
                                style:
                                    TextStyle(fontFamily: 'main', fontSize: 23),
                              ),
                            );
                          },
                          body: e.body,
                          isExpanded: e.isExpanded);
                    }).toList(),
                  )
                ],
              ));
  }
}
