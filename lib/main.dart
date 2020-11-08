import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:lawyerplatform/page/about.dart';
import 'package:lawyerplatform/page/alter_passward.dart';
import 'package:lawyerplatform/page/electri_card.dart';
import 'package:lawyerplatform/page/error_center.dart';
import 'package:lawyerplatform/page/log.dart';
import 'package:lawyerplatform/page/login_select.dart';
import 'package:lawyerplatform/page/schedule.dart';
import 'package:lawyerplatform/page/case_list.dart';
import 'package:lawyerplatform/page/my_page.dart';
import 'package:lawyerplatform/page/start_loading.dart';
import 'package:lawyerplatform/page/user_detail.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
          fontFamily: 'main', // 设置全局字体
          primaryColor: Colors.grey[100],
          primaryTextTheme:
              TextTheme(title: TextStyle(color: Colors.black, fontSize: 23)),
          highlightColor: Color.fromRGBO(255, 255, 255, 0.5),
          splashColor: Colors.white70 //设置点击按钮时的水波纹效果
          ),
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      supportedLocales: [
        const Locale('zh', 'CN'),
        const Locale('en', 'US'),
      ],
      initialRoute: '/start',
      // 开始路由
      routes: <String, WidgetBuilder>{
        '/start': (BuildContext context) => LoadingPage(),
        '/home': (BuildContext context) => GeneralFramework(),
        '/about': (BuildContext context) => About(),
        '/error': (BuildContext context) => ErrorCenter(),
        '/alter': (BuildContext context) => AlterPassword(),
        '/userDetail': (BuildContext context) => UserDetail(),
        '/loginSelect': (BuildContext context) => LoginSelect(),
        '/card': (BuildContext context) => ElectriCard()
      },
    );
  }
}

//以下是页面的基本架构，完成了由bottomNavigationBar触发的页面切换
class GeneralFramework extends StatefulWidget {
  int currentIndex;

  GeneralFramework({Key key, this.currentIndex = 0}) : super(key: key);
  @override
  _GeneralFrameworkState createState() => _GeneralFrameworkState();
}

class _GeneralFrameworkState extends State<GeneralFramework> {
  DateTime lastPopTime; //上次点击时间

  final List tabBodies = [
    Cases(),
    Log(),
    SchedulePage(),
    Mypage(),
  ];

  final List<BottomNavigationBarItem> bottomTabls = [
    BottomNavigationBarItem(
      icon: Icon(Icons.content_paste),
      title: Text('案件'),
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.local_activity),
      title: Text('日志'),
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.schedule),
      title: Text('日程'),
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.people),
      title: Text('我的'),
    ),
  ];

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
            currentIndex: widget.currentIndex,
            fixedColor: Colors.cyan[300],
            elevation: 20,
            onTap: (index) {
              setState(() {
                widget.currentIndex = index;
              });
            },
          )),
          body: tabBodies[widget.currentIndex],
        ));
  }
}
