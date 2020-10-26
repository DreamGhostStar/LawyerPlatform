import 'package:flutter/material.dart';

class ElectriCard extends StatefulWidget {
  ElectriCard({Key key}) : super(key: key);

  @override
  _ElectriCardState createState() => _ElectriCardState();
}

class _ElectriCardState extends State<ElectriCard> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('电子名片'),
      ),
    );
  }
}
