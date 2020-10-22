import 'package:flutter/material.dart';

class AlterPassword extends StatefulWidget {
  AlterPassword({Key key}) : super(key: key);

  @override
  _AlterPasswordState createState() => _AlterPasswordState();
}

class _AlterPasswordState extends State<AlterPassword> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('修改密码'),
      ),
    );
  }
}
