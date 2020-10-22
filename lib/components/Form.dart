import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../main.dart';

class RegisterForm extends StatefulWidget {
  final String title;

  RegisterForm({Key key, @required this.title}) : super(key: key);

  @override
  _RegisterFormState createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  bool sendingCode = false; //是否在发送验证码
  Timer _timer;
  int _countdownTime; //倒计时
  final registerFormKey = GlobalKey<FormState>();

  TextEditingController usernameController = new TextEditingController();
  TextEditingController passwordController = new TextEditingController();
  TextEditingController phoneController = new TextEditingController();
  TextEditingController codeController = new TextEditingController();

  String usernameError = '';
  String passwordError = '';
  String phoneError = '';
  String codeError = '';
  bool autovalidate = false;
  bool autovalidate2 = false;
  bool _obscureText = false;
  var eyeColor = Colors.grey;
  var codeTextColor = Colors.blue;

  @override
  void dispose() {
    usernameController.dispose();
    passwordController.dispose();
    phoneController.dispose();
    codeController.dispose();
    if (_timer != null) {
      _timer.cancel();
    }
    super.dispose();
  }

  static bool isChinaPhoneLegal(String str) {
    //判断手机号码格式的函数
    return new RegExp(
            '^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(147,145))\\d{8}\$')
        .hasMatch(str);
  }

  String usernameValidator(value) {
    if (value.isEmpty) {
      return '请输入用户名';
    }
    return null;
  }

  String passwardValidator(value) {
    if (value.isEmpty) {
      return '请输入密码';
    }
    return null;
  }

  String phoneValidator(value) {
    if (value.isEmpty) {
      return '请输入手机号';
    }
    if (!isChinaPhoneLegal(value)) {
      return '手机号格式错误';
    }
    return null;
  }

  String codeValidator(value) {
    if (value.isEmpty) {
      return '请输入验证码';
    }
    return null;
  }

  _entry() {
    Navigator.of(context).push(new MaterialPageRoute(
        builder: (context) => GeneralFramework(
              currentIndex: 3,
            )));
  }

//一秒执行一次该函数，更新倒计时
  void startCountdownTimer() {
    const onesecond = const Duration(seconds: 1);
    var callback = (timer) => {
          setState(() {
            if (_countdownTime == 0) {
              _timer.cancel();
              setState(() {
                sendingCode = false;
              });
            } else {
              _countdownTime = _countdownTime - 1;
            }
          })
        };
    _timer = Timer.periodic(onesecond, callback);
  }

  _pressSendCode() {
    //点击发送验证码后的触发效果
    setState(() {
      sendingCode = true;
      _countdownTime = 5;
      startCountdownTimer();
    });
  }

  @override
  Widget build(BuildContext context) {
    Widget mywidget = widget.title == '账号密码登录'
        ? Form(
            key: registerFormKey,
            child: Column(
              children: [
                TextFormField(
                    inputFormatters: [
                      FilteringTextInputFormatter(RegExp("[a-zA-z]|[0-9]"),
                          allow: true), //限制字母或数字
                      LengthLimitingTextInputFormatter(15) //最大长度
                    ],
                    validator: usernameValidator,
                    autovalidate: autovalidate,
                    controller: usernameController,
                    decoration: InputDecoration(
                      labelText: '用户名',
                      helperText: '只能输入15位字母或数字',
                    )),
                TextFormField(
                  inputFormatters: [
                    FilteringTextInputFormatter(RegExp("[a-zA-z]|[0-9]"),
                        allow: true), //限制字母或数字
                    LengthLimitingTextInputFormatter(15) //最大长度
                  ],
                  validator: passwardValidator,
                  autovalidate: autovalidate,
                  obscureText: _obscureText,
                  controller: passwordController,
                  decoration: InputDecoration(
                      labelText: '密码',
                      helperText: '只能输入15位字母或数字',
                      suffixIcon: IconButton(
                          icon: Icon(
                            Icons.remove_red_eye,
                            color: eyeColor,
                          ),
                          onPressed: () {
                            setState(() {
                              _obscureText = !_obscureText;
                              eyeColor =
                                  _obscureText ? Colors.grey : Colors.blue;
                            });
                          })),
                ),
                SizedBox(height: 30),
                Container(
                  width: double.infinity,
                  child: RaisedButton(
                      child: Text('登录', style: TextStyle(color: Colors.white)),
                      color: Colors.blueAccent[700],
                      elevation: 5,
                      onPressed: () {
                        if (registerFormKey.currentState.validate()) {
                          //TODO:后端验证
                          _entry();
                          print('填写正确');
                        } else {
                          setState(() {
                            autovalidate = true;
                            print(autovalidate);
                          });
                        }
                      }),
                )
              ],
            ))
        : Form(
            key: registerFormKey,
            child: Column(
              children: [
                TextFormField(
                  inputFormatters: [
                    FilteringTextInputFormatter(RegExp("[0-9]"),
                        allow: true), //限制数字
                    LengthLimitingTextInputFormatter(15) //最大长度
                  ],
                  validator: phoneValidator,
                  autovalidate: autovalidate2,
                  controller: phoneController,
                  decoration: InputDecoration(labelText: '手机号'),
                ),
                TextFormField(
                    inputFormatters: [
                      FilteringTextInputFormatter(RegExp("[0-9]"),
                          allow: true), //限制数字
                      LengthLimitingTextInputFormatter(6) //最大长度
                    ],
                    validator: codeValidator,
                    autovalidate: autovalidate2,
                    controller: codeController,
                    decoration: InputDecoration(
                        labelText: '验证码',
                        suffix: InkWell(
                          child: Text(
                            sendingCode ? '发送验证码(${_countdownTime}s)' : '发送验证码',
                            style: TextStyle(
                                color: sendingCode ? Colors.grey : Colors.blue),
                          ),
                          onTap: sendingCode ? null : _pressSendCode,  //若正在发送验证码，则为null，实现禁用按钮
                        ))),
                SizedBox(height: 30),
                Container(
                  width: double.infinity,
                  child: RaisedButton(
                      child: Text('登录', style: TextStyle(color: Colors.white)),
                      color: Colors.blueAccent[700],
                      elevation: 5,
                      onPressed: () {
                        if (registerFormKey.currentState.validate()) {
                          // TODO:后端验证
                          _entry();
                          print('right');
                        } else {
                          setState(() {
                            autovalidate2 = true;
                          });
                        }
                      }),
                )
              ],
            ));
    return mywidget;
  }
}
