import 'package:flutter/material.dart';

class AboveLoading extends Dialog {
  final String content;

  AboveLoading({Key key, this.content = '正在加载...'}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Material(
      type: MaterialType.transparency,
      child: new Center(
        child: new Container(
          decoration: new ShapeDecoration(
              color: Colors.white,
              shape: new RoundedRectangleBorder(
                  borderRadius: new BorderRadius.all(new Radius.circular(10)))),
          width: 100,
          height: 100,
          padding: EdgeInsets.all(10),
          child: new Column(
            children: <Widget>[
              CircularProgressIndicator(),
              new Text(
                content,
                style: TextStyle(fontSize: 12, color: Colors.grey),
                softWrap: false,
              )
            ],
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          ),
        ),
      ),
    );
  }
}
