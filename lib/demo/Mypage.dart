import 'package:flutter/material.dart';
//这是我的页面

class Mypage extends StatefulWidget{
  @override
  _MypageState createState()=>_MypageState();
}

class _MypageState extends State<Mypage>{
  @override
  Widget build(BuildContext context){
    return Scaffold( 
      body: Theme(
        data: Theme.of(context).copyWith(
          primaryColor:Colors.blue,
        ),  
        child: Container(
          margin: EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Card(
                
              ),
            ],
          ),
        ),
      ),
    );
  }
}
