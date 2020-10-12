import 'package:flutter/material.dart';

class CaseItems extends StatefulWidget {
  final String name;
  CaseItems({Key key, @required this.name}) : super(key: key);

  @override
  _CaseItemsState createState() => _CaseItemsState();
}

class _CaseItemsState extends State<CaseItems> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          child: Text(widget.name),
        ),
        SizedBox(
          height: 50,
        )
      ],
    );
  }
}
