import 'package:flutter/material.dart';

class MyTextField extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;
  const MyTextField(
      {Key key, @required this.controller, @required this.labelText})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextField(
        controller: this.controller,
        maxLength: TextField.noMaxLength, //提示字数
        maxLines: null, //为null时，不限制行数
        enableInteractiveSelection: true, //长按出现粘贴剪切等选项
        textInputAction: TextInputAction.done, //键盘右下角的按钮类型
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(15),
            ),
            borderSide: BorderSide(
              color: Colors.grey[400],
              width: 1,
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: Colors.black,
              width: 1,
            ),
            borderRadius: BorderRadius.all(
              Radius.circular(15),
            ),
          ),
          labelText: this.labelText,
          labelStyle: TextStyle(color: Colors.grey[600]),
        ));
  }
}
