// 我的页面通用功能
import 'package:flutter/material.dart';

class MyFunctionItem {
  final IconData icon;
  final String text;

  MyFunctionItem({
    this.icon,
    this.text,
  });

  factory MyFunctionItem.init(Map<String, dynamic> json) {
    return MyFunctionItem(
      icon: json['icon'],
      text: json['text'],
    );
  }
}

List<MyFunctionItem> myFunctionStatic = [
  MyFunctionItem.init({'icon': Icons.account_circle, 'text': '关于我们'}),
  MyFunctionItem.init({'icon': Icons.error_outline, 'text': '错误中心'}),
  MyFunctionItem.init({'icon': Icons.exit_to_app, 'text': '退出登录'}),
];
