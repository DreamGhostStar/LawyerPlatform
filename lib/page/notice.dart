import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_app_badger/flutter_app_badger.dart';
import 'package:lawyerplatform/components/util.dart';
import 'package:lawyerplatform/model/notice_list.dart';
import 'package:left_scroll_actions/cupertinoLeftScroll.dart';
import 'package:left_scroll_actions/left_scroll_actions.dart';

class Notice extends StatefulWidget {
  Notice({Key key}) : super(key: key);

  @override
  _NoticeState createState() => _NoticeState();
}

class _NoticeState extends State<Notice> {
  bool _loading = false;
  List<NoticeItem> _noticeList = [];
  String _appBadgeSupported = 'Unknown';
  int count = 0;

  Future _load() async {
    setState(() {
      _loading = true;
    });
    _noticeList.addAll(noticeListModel);
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
    _load();
    initPlatformState();
  }

  initPlatformState() async {
    //判断设备是否支持
    String appBadgeSupported;
    try {
      bool res = await FlutterAppBadger.isAppBadgeSupported();
      if (res) {
        appBadgeSupported = 'Support';
      } else {
        appBadgeSupported = 'Not Support';
      }
    } on PlatformException {
      appBadgeSupported = 'Failed to get supported';
    }
    if (!mounted) return;

    setState(() {
      _appBadgeSupported = appBadgeSupported;
    });
  }

  //增加通知数量
  void _addBadge() {
    setState(() {
      count++;
    });
    FlutterAppBadger.updateBadgeCount(count);
  }

  void _removeBadge() {
    setState(() {
      if (count > 0) {
        count--;
        FlutterAppBadger.updateBadgeCount(count);
      } else {
        count = 0;
        FlutterAppBadger.removeBadge();
      }
    });
  }

  Widget _noticeContainer(String title, String detail, bool iswatched) {
    return Container(
      margin: EdgeInsets.only(top: 8, left: 20, right: 20),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: EdgeInsets.only(bottom: 5),
                    width: 270,
                    child: Text(
                      title,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(fontSize: 18),
                    ),
                  ),
                  Container(
                    child: Text(detail),
                  )
                ],
              ),
              iswatched
                  ? Container(
                      child: Icon(Icons.arrow_forward_ios),
                    )
                  : Stack(
                      children: [
                        Container(
                          child: Icon(Icons.arrow_forward_ios),
                        ),
                        Positioned(
                          left: 15,
                          child: Icon(
                            Icons.brightness_1,
                            size: 8,
                            color: Colors.red,
                          ),
                        )
                      ],
                    )
            ],
          ),
          Divider(),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('我的通知'),
      ),
      body: _loading
          ? loadingWidget(_loading)
          : ListView(
              children: [
                // Text('$_appBadgeSupported'),
                // RaisedButton(
                //     child: Text('增加通知'),
                //     onPressed: () {
                //       _addBadge();
                //     }),
                // RaisedButton(
                //     child: Text('取消通知'),
                //     onPressed: () {
                //       _removeBadge();
                //     }),
                Column(
                  children: _noticeList
                      .map(
                        (e) => CupertinoLeftScroll(
                          // important, each Row must have different key.
                          key: Key(e.title),
                          // 当另一个有相同closeTag的组件打开时，其他有着相同closeTag的组件会自动关闭.
                          closeTag: LeftScrollCloseTag('TODO: your tag'),
                          buttonWidth: 90,
                          child:
                              _noticeContainer(e.title, e.detail, e.iswatched),
                          buttons: <Widget>[
                            LeftScrollItem(
                              text: '删除',
                              color: Colors.red,
                              onTap: () {
                                setState(() {
                                  _noticeList.remove(e);
                                  // TODO:
                                });
                              },
                            ),
                            LeftScrollItem(
                              text: e.iswatched ? '标记为未读' : '标记为已读',
                              color: Colors.orange,
                              onTap: () {
                                setState(() {
                                  e.iswatched = !e.iswatched;
                                });
                                LeftScrollGlobalListener.instance
                                    .targetStatus(
                                        LeftScrollCloseTag('TODO: your tag'),
                                        Key(e.title))
                                    .value = false;
                                //TODO:把状态传给后端
                              },
                            ),
                          ],
                          onTap: () {
                            print('详情页');
                            // TODO:
                          },
                        ),
                      )
                      .toList(),
                )
              ],
            ),
    );
  }
}
