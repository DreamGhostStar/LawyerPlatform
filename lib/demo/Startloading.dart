import 'dart:async';
import '../main.dart';
import 'package:flutter/material.dart';

class LoadingPage extends StatefulWidget {
  @override
  _LoadingPageState createState() => _LoadingPageState();
}

class _LoadingPageState extends State<LoadingPage> {
  Timer _timer;
  int _countdownTime = 5; // 倒计时秒数
  @override
  void initState() {
    super.initState();
    startCountdownTimer();
  }

  // 每隔一秒执行一次这个函数，更新倒计时
  void startCountdownTimer() {
    const oneSec = const Duration(seconds: 1);

    var callback = (timer) => {
          setState(() {
            if (_countdownTime == 0) {
              entryHome();
            } else {
              _countdownTime = _countdownTime - 1;
            }
          })
        };

    _timer = Timer.periodic(oneSec, callback);
  }

  // 进入登录页面
  void entryHome() async {
    _timer.cancel();
    // 跳转到主页面，并且不允许其返回
    Navigator.of(context).pushAndRemoveUntil(
        new MaterialPageRoute(builder: (context) => new GeneralFramework()),
        (route) => route == null);
  }

  @override
  void dispose() {
    super.dispose();
    if (_timer != null) {
      _timer.cancel();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          decoration: new BoxDecoration(color: Colors.white),
          width: double.infinity, // 宽度撑满全屏
          child: Stack(
            children: <Widget>[
              Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Image.asset(
                    'images/logo.jpg',
                    fit: BoxFit.cover,
                  ),
                  Column(
                    children: <Widget>[
                      Text(
                        '律师平台',
                        style: TextStyle(fontSize: 40, fontFamily: 'title'),
                      ),
                      Padding(
                        padding: new EdgeInsets.only(top: 20),
                        child: Text(
                          '致力于专业的法律援助和咨询',
                          style: TextStyle(
                              color: Colors.grey, fontFamily: 'decoration'),
                        ),
                      )
                    ],
                  )
                ],
              ),
              Positioned(
                child: RaisedButton(
                  child: Text(
                    '跳过 $_countdownTime',
                    style: TextStyle(color: Colors.white, fontSize: 18),
                  ),
                  onPressed: entryHome,
                  color: Colors.grey,
                ),
                right: 10,
                top: 15,
              )
            ],
            alignment: Alignment.center,
          )),
    );
  }
}
