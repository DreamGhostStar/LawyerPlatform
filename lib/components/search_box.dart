import 'package:flutter/material.dart';

class SearchBox extends StatelessWidget {
  final double boxWidth;
  final String hintTEXT;
  const SearchBox({Key key, this.boxWidth = 180, @required this.hintTEXT})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.only(left: 0, right: 0),
      shape: StadiumBorder(),
      child: SizedBox(
        width: 320,
        height: 35,
        child: Row(
          children: <Widget>[
            SizedBox(
              width: 5.0,
            ),
            Icon(
              Icons.search,
              color: Colors.grey,
              size: 20,
            ),
            SizedBox(
                height: 30,
                width: boxWidth,
                child: Align(
                  child: Container(
                      child:
                          Text(hintTEXT, style: TextStyle(color: Colors.grey))),
                  alignment: Alignment.centerLeft,
                )),
          ],
        ),
      ),
    );
  }
}
