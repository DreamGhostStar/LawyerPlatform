import 'package:flutter/material.dart';

loginButton(Function function) {
  return Container(
    margin: EdgeInsets.only(left: 20, right: 20, top: 30),
    width: double.infinity,
    height: 40,
    decoration: BoxDecoration(
        gradient:
            LinearGradient(colors: [Colors.lightBlueAccent, Colors.blueAccent]),
        // 渐变色
        borderRadius: BorderRadius.circular(20)),
    child: RaisedButton(
      onPressed: () {
        function();
      },
      child: Text(
        '登录',
        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w100),
      ),
      color: Colors.transparent,
      elevation: 0,
      highlightElevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
    ),
  );
}
