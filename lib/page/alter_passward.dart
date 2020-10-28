import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AlterPassword extends StatefulWidget {
  AlterPassword({Key key}) : super(key: key);

  @override
  _AlterPasswordState createState() => _AlterPasswordState();
}

class _AlterPasswordState extends State<AlterPassword> {
  final registerFormKey = GlobalKey<FormState>();
  String oldpasswordError = '';
  String newpasswordError = '';
  TextEditingController _oldPassward = new TextEditingController();
  TextEditingController _newPassward = new TextEditingController();
  Color _oldEye = Colors.grey;
  Color _newEye = Colors.grey;
  bool autovalidate = false;
  // bool autovalidate2 = false;
  bool _obscureText = true;
  bool _obscureText2 = true;

  @override
  void dispose() {
    _oldPassward.dispose();
    _newPassward.dispose();
    super.dispose();
  }

  String oldpasswardValidator(value) {
    if (value.isEmpty) {
      return '请输入密码';
    }
    return null;
  }

  String newpasswardValidator(value) {
    if (value.toString() != _oldPassward.text) {
      return '输入密码不一致';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        title: Text('修改密码'),
      ),
      body: ListView(
        children: [
          Container(
            padding: EdgeInsets.all(20),
            child: Form(
                key: registerFormKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(height: 20),
                    TextFormField(
                      inputFormatters: [
                        // FilteringTextInputFormatter(RegExp("[a-zA-z]|[0-9]"),
                        //     allow: true), //限制字母或数字
                        LengthLimitingTextInputFormatter(15) //最大长度
                      ],
                      validator: oldpasswardValidator,
                      autovalidate: autovalidate,
                      obscureText: _obscureText,
                      controller: _oldPassward,
                      decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Color(0xff9e51ff))),
                          labelText: '输入新密码',
                          labelStyle: TextStyle(color: Colors.black45),
                          helperText: '只能输入15位字母或数字',
                          suffixIcon: IconButton(
                              icon: Icon(
                                Icons.remove_red_eye,
                                color: _oldEye,
                              ),
                              onPressed: () {
                                setState(() {
                                  _obscureText = !_obscureText;
                                  _oldEye =
                                      _obscureText ? Colors.grey : Colors.blue;
                                });
                              })),
                    ),
                    SizedBox(height: 30),
                    TextFormField(
                      inputFormatters: [
                        // FilteringTextInputFormatter(RegExp("[a-zA-z]|[0-9]"),
                        //     allow: true), //限制字母或数字
                        LengthLimitingTextInputFormatter(15) //最大长度
                      ],
                      validator: newpasswardValidator,
                      autovalidate: autovalidate,
                      obscureText: _obscureText2,
                      controller: _newPassward,
                      decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: '确认新密码',
                          labelStyle: TextStyle(color: Colors.black45),
                          helperText: '只能输入15位字母或数字',
                          focusedBorder: OutlineInputBorder(
                            //选中时外边框颜色
                            borderSide: BorderSide(
                              color: Color(0xff9e51ff),
                            ),
                          ),
                          suffixIcon: IconButton(
                              icon: Icon(
                                Icons.remove_red_eye,
                                color: _newEye,
                              ),
                              onPressed: () {
                                setState(() {
                                  _obscureText2 = !_obscureText2;
                                  _newEye =
                                      _obscureText2 ? Colors.grey : Colors.blue;
                                });
                              })),
                    ),
                    SizedBox(height: 30),
                    Container(
                      width: double.infinity,
                      child: RaisedButton(
                          color: Colors.blue,
                          child: Text(
                            '确认修改',
                            style: TextStyle(color: Colors.white),
                          ),
                          onPressed: () {
                            if (registerFormKey.currentState.validate()) {
                              print('right');
                              //TODO:
                            } else {
                              setState(() {
                                autovalidate = true;
                              });
                            }
                          }),
                    ),
                  ],
                )),
          )
        ],
      ),
    );
  }
}
