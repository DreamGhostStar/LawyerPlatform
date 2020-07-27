import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import './demo/Cases.dart';
import './demo/Log.dart';
import './demo/Mypage.dart';
import './demo/Schedule.dart';
import './model/BottomNavigationItem.dart';
import './demo/Login.dart';
import './demo/Startloading.dart';
import './demo/Login_select.dart';
import './demo/User_detail.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
          //fontFamily: 'main', // 设置全局字体
          primarySwatch: Colors.blue,
          highlightColor: Color.fromRGBO(255, 255, 255, 0.5),
          splashColor: Colors.white70 //设置点击按钮时的水波纹效果
          ),
      initialRoute: '/start',
      // 开始路由
      routes: <String, WidgetBuilder>{
        '/start': (BuildContext context) => LoadingPage(),
        '/home': (BuildContext context) => GeneralFramework(),
        '/login': (BuildContext context) => Login(),
        '/userDetail': (BuildContext context) => UserDetail(),
        '/loginSelect': (BuildContext context)=>LoginSelect(),  
      },
    );
  }
}

//以下是页面的基本架构，完成了由bottomNavigationBar触发的页面切换
class GeneralFramework extends StatefulWidget {
  @override
  _GeneralFrameworkState createState() => _GeneralFrameworkState();
}

class _GeneralFrameworkState extends State<GeneralFramework> {
  final List<BottomNavigationBarItem> bottomTabs = bottomTabls;

  DateTime lastPopTime; //上次点击时间

  final List tabBodies = [
    Cases(),
    Log(),
    Schedule(),
    Mypage(),
  ];
  int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: () async {
          if (lastPopTime == null ||
              DateTime.now().difference(lastPopTime) > Duration(seconds: 1)) {
            //两次点击间隔超过1秒则重新计时
            lastPopTime = DateTime.now();
            Fluttertoast.showToast(
                msg: '再按一次退出',
                backgroundColor: Colors.black,
                textColor: Colors.white);
            return new Future.value(false);
          }
          return new Future.value(true);
        },
        child: Scaffold(
          bottomNavigationBar: (BottomNavigationBar(
            type: BottomNavigationBarType.fixed,
            items: bottomTabls,
            currentIndex: _currentIndex,
            fixedColor: Colors.orange,
            elevation: 20,
            onTap: (index) {
              setState(() {
                _currentIndex = index;
              });
            },
          )),
          body: tabBodies[_currentIndex],
        ));
  }
}
