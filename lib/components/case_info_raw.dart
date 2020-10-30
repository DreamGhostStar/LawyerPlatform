import 'package:flutter/material.dart';

//以下用于案件详细信息页面构建
Widget baseRow(String text1, String text2) {
  return Column(
    children: [
      Container(
          padding: EdgeInsets.only(top: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                text1,
                style: TextStyle(color: Colors.grey),
              ),
              Container(
                width: 235,
                child: Text(
                  text2,
                  textAlign: TextAlign.end,
                  maxLines: 5,
                  overflow: TextOverflow.ellipsis,
                ),
              )
            ],
          )),
      Divider()
    ],
  );
}

Widget title(String title) {
  return Container(
    padding: EdgeInsets.only(top: 10, left: 10, right: 10),
    child: Text(
      title,
      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
    ),
  );
}

//以下用于修改案件信息页面

Widget editRow(String text, TextEditingController controller, int maxLine) {
  return Column(
    children: [
      Container(
          padding: EdgeInsets.only(top: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                text,
                style: TextStyle(color: Colors.grey),
              ),
              Container(
                width: 235,
                // constraints: BoxConstraints(maxHeight: 50),
                child: TextField(
                  textAlign: TextAlign.end,
                  textAlignVertical: TextAlignVertical.center,
                  controller: controller,
                  maxLines: maxLine,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(borderSide: BorderSide.none),
                      contentPadding: EdgeInsets.all(0)),
                ),
              )
            ],
          )),
      Divider()
    ],
  );
}
