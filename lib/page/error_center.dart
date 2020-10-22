import 'package:flutter/material.dart';

class ErrorCenter extends StatefulWidget {
  ErrorCenter({Key key}) : super(key: key);

  @override
  _ErrorCenterState createState() => _ErrorCenterState();
}

class _ErrorCenterState extends State<ErrorCenter> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('错误中心'),
      ),
    );
  }
}
