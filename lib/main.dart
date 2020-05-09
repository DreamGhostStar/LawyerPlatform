import 'package:flutter/material.dart';
import './demo/Cases.dart';
import './demo/Log.dart';
import './demo/Mypage.dart';
import './demo/Schedule.dart';
import './model/BottomNavigationItem.dart';
import './demo/Login.dart';
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        highlightColor: Color.fromRGBO(255, 255, 255, 0.5),
        splashColor: Colors.white70          //设置点击按钮时的水波纹效果
      ),
      home: Login(),
    );
  }
}
//以下是页面的基本架构，完成了由bottomNavigationBar触发的页面切换
class GeneralFramework extends StatefulWidget{
  @override
  _GeneralFrameworkState createState()=>_GeneralFrameworkState();
}

class _GeneralFrameworkState extends State<GeneralFramework>{
  final List<BottomNavigationBarItem> bottomTabs=bottomTabls;
  
  final List tabBodies = [
    Cases(),
    Log(),
    Schedule(),
    Mypage(),
  ];
  int _currentIndex = 0;
  @override
  Widget build(BuildContext context){
    return Scaffold(
      bottomNavigationBar:(
        BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          items: bottomTabls,
          currentIndex: _currentIndex,
          fixedColor: Colors.orange,
          onTap: (index){
            setState(() {
              _currentIndex=index;
            });
          },
        )
      ),
      body: tabBodies[_currentIndex],
    );
  }
}


