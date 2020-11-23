import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_app_badger/flutter_app_badger.dart';
import 'package:lawyerplatform/components/util.dart';

class Notice extends StatefulWidget {
  Notice({Key key}) : super(key: key);

  @override
  _NoticeState createState() => _NoticeState();
}

class _NoticeState extends State<Notice> {
  bool _loading = false;
  String _appBadgeSupported = 'Unknown';
  int count = 0;

  Future _load() async {
    setState(() {
      _loading = true;
    });
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
                Icon(
                  Icons.brightness_1,
                  size: 7,
                ), //通知用的红点
                Text('$_appBadgeSupported'),
                RaisedButton(
                    child: Text('增加通知'),
                    onPressed: () {
                      _addBadge();
                    }),
                RaisedButton(
                    child: Text('取消通知'),
                    onPressed: () {
                      _removeBadge();
                    })
              ],
            ),
    );
  }
}
