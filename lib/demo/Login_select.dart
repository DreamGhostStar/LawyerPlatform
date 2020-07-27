import 'package:flutter/material.dart';
import 'package:lawyerplatform/demo/Register.dart';
import 'Login.dart';

class LoginSelect extends StatefulWidget {
  @override
  _LoginSelectState createState() => _LoginSelectState();
}

class _LoginSelectState extends State<LoginSelect> {
  void entryLogin(String title) {
    Navigator.of(context)
        .push(new MaterialPageRoute(builder: (context) => Login()));
  }

  void entryRegister(String title) {
    Navigator.of(context)
        .push(new MaterialPageRoute(builder: (context) => Register()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            Text(
              '律师平台',
              style: TextStyle(
                  fontSize: 50,
                  fontWeight: FontWeight.w500,
                  fontFamily: 'title'),
            ),
            Column(
              children: <Widget>[
                Container(
                  margin: EdgeInsets.only(left: 20, right: 20),
                  width: double.infinity,
                  height: 40,
                  child: RaisedButton(
                    onPressed: () {
                      entryRegister('注册');
                    },
                    child: Text(
                      '注册',
                      style: TextStyle(
                          color: Colors.lightBlueAccent,
                          fontWeight: FontWeight.w100),
                    ),
                    color: Colors.white,
                    elevation: 0,
                    highlightElevation: 0,
                    // 点击时阴影隐藏
//                    highlightColor: Colors.lightBlueAccent,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                        side: BorderSide(color: Colors.lightBlueAccent)),
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(left: 20, right: 20, top: 30),
                  width: double.infinity,
                  height: 40,
                  decoration: BoxDecoration(
                      gradient: LinearGradient(
                          colors: [Colors.lightBlueAccent, Colors.blueAccent]),
                      // 渐变色
                      borderRadius: BorderRadius.circular(20)),
                  child: RaisedButton(
                    onPressed: () {
                      entryLogin('登录');
                    },
                    child: Text(
                      '登录',
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.w100),
                    ),
                    color: Colors.transparent,
                    elevation: 0,
                    highlightElevation: 0,
                    // 点击时阴影隐藏
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
