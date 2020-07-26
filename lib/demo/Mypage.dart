import 'package:flutter/material.dart';
//这是我的页面

class Mypage extends StatefulWidget {
  @override
  _MypageState createState() => _MypageState();
}

class _MypageState extends State<Mypage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Theme(
        data: Theme.of(context).copyWith(
          primaryColor: Colors.blue,
        ),
        child: GestureDetector(
          onTap: () {
            Navigator.pushNamed(context, '/login');
          },
          child: Container(
            margin: EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Padding(
                  //个人名片两边加边距
                  padding: EdgeInsets.fromLTRB(7, 4, 7, 4),
                  child: Card(
                    child: Image.asset('images/logo.jpg'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
