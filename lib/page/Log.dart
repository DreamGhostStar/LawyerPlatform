import 'package:flutter/material.dart';
//这是日志页面

class Log extends StatefulWidget{
  @override
  _LogState createState()=>_LogState();
}

class _LogState extends State<Log>{
  @override
  Widget build(BuildContext context){
    return Scaffold(
      body: Text('Log'),
    );
  }
}