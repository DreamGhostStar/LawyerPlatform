import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:crypto/crypto.dart';
import 'package:convert/convert.dart';
import 'package:shared_preferences/shared_preferences.dart';

//工具类
VoidCallback openAlertDialog(
    BuildContext context, VoidCallback callback, String content) {
  showDialog(
      context: context,
      barrierDismissible: false, // 若设置为false用户不能点击空白部分来关闭对话框
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('提示', style: TextStyle(fontWeight: FontWeight.bold)),
          content: Text(content),
          actions: <Widget>[
            FlatButton(
              child: Text('确认'),
              onPressed: () {
                Navigator.pop(context);
                callback();
              },
            ),
            FlatButton(
              child: Text('取消'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        );
      });
}

// 加载中状态框
Widget loadingWidget(bool loading) {
  if (loading) {
    return new Padding(
      padding: const EdgeInsets.all(8.0),
      child: new Center(
        child: new Opacity(
          opacity: 1,
          child: new CircularProgressIndicator(),
        ),
      ),
    );
  }
  return Container();
}

// md5加密
String generateMd5(String data) {
  var content = new Utf8Encoder().convert(data);
  var digest = md5.convert(content);
  // 这里其实就是 digest.toString()
  return hex.encode(digest.bytes);
}

// 获取token
Future<String> getToken() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String token = prefs.getString('Authorization');
  return token;
}
