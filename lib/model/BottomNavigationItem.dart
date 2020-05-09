import 'package:flutter/material.dart';
//这是首页bottomNavigation的数据模型
final List<BottomNavigationBarItem> bottomTabls=[
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