import 'package:flutter/material.dart';
import 'package:lawyerplatform/main.dart';
import 'package:lawyerplatform/model/BaseUserInfo.dart';
import 'package:lawyerplatform/model/LoginAvatar.dart';

//这是登录页面
class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  String title = '账号密码登录';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text(
            title,
            style: TextStyle(fontFamily: 'main', fontSize: 30),
          ),
          Container(
            padding: EdgeInsets.all(30),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  RegisterForm(
                    title: title,
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  GestureDetector(
                    onTap: () {
                      setState(() {
                        if (title == '账号密码登录') {
                          title = '手机验证码登录';
                          RegisterForm(
                            title: title,
                          );
                        } else {
                          title = '账号密码登录';
                          RegisterForm(
                            title: title,
                          );
                        }
                      });
                    },
                    child: Align(
                      child: Text(title == '账号密码登录' ? '手机验证码登录' : '账号密码登录'),
                      alignment: Alignment.bottomLeft,
                    ),
                  )
                ]),
          ),
        ],
      ),
    );
  }
}

class RegisterForm extends StatefulWidget {
  final String title;

  RegisterForm({this.title});

  @override
  _RegisterFormState createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  final registerFormKey = GlobalKey<FormState>();
  String username, password, phonenumber;
  bool autovalidate = false;
  bool _obscure = true;
  var eyeColor = Colors.grey;

  String validateUsername(value) {
    if (value.isEmpty) {
      return '请输入用户名';
    }
    return null;
  }

  String validatePassword(value) {
    if (value.isEmpty) {
      return '请输入密码';
    }
    return null;
  }

  String validateNumber(value) {
    if (value.isEmpty) {
      return '请输入手机号';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    Widget myWidget = Form(
      //表单
      key: registerFormKey,
      child: Column(
        children: <Widget>[
          TextFormField(
            decoration:
                InputDecoration(labelText: '用户名', helperText: 'Input username'),
            onSaved: (value) {
              username = value;
            },
            validator: validateUsername, //验证表单数据
            autovalidate: autovalidate, //自定义的自动验证
          ),
          TextFormField(
            obscureText: _obscure,
            decoration: InputDecoration(
                labelText: '密码',
                helperText: 'Input password',
                suffixIcon: IconButton(
                    icon: Icon(
                      Icons.remove_red_eye,
                      color: eyeColor,
                    ),
                    onPressed: () {
                      setState(() {
                        _obscure = !_obscure;
                        eyeColor = _obscure ? Colors.grey : Colors.blue;
                      });
                    })),
            onSaved: (value) {
              password = value;
            },
            validator: validatePassword,
            autovalidate: autovalidate,
          ),
          SizedBox(
            height: 30,
          ),
          Container(
            width: double.infinity, //宽度与上面的部件对齐
            child: RaisedButton(
              child: Text('登录', style: TextStyle(color: Colors.white)),
              color: Colors.blueAccent[700],
              elevation: 5,
              onPressed: () {
                if (registerFormKey.currentState.validate()) {
                  registerFormKey.currentState.save();
                  Scaffold.of(context).showSnackBar(//找到最近的scaffold并执行
                      SnackBar(
                    //在底部弹出提示栏
                    content: Text(
                      'Loading...',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 15,
                      ),
                    ),
                    backgroundColor: Colors.blueAccent[400],
                  ));
                  Navigator.pushNamed(context, '/user');
                } else {
                  setState(() {
                    autovalidate = true;
                  });
                }
              },
            ),
          )
        ],
      ),
    );
    if (widget.title == '手机验证码登录')
      myWidget = Form(
        //表单
        key: registerFormKey,
        child: Column(
          children: <Widget>[
            TextFormField(
              decoration: InputDecoration(hintText: '请输入手机号'),
              onSaved: (value) {
                phonenumber = value;
              },
              validator: validateNumber, //验证表单数据
              autovalidate: autovalidate, //自定义的自动验证
            ),
            SizedBox(
              height: 30,
            ),
            Container(
              width: double.infinity, //宽度与上面的部件对齐
              child: RaisedButton(
                child: Text('获取验证码', style: TextStyle(color: Colors.white)),
                color: Colors.blueAccent[700],
                elevation: 5,
                onPressed: () {
                  if (registerFormKey.currentState.validate()) {
                    registerFormKey.currentState.save();

                    fetchPost().then((PhoneValidate value) {
                      print(
                          '请求结果：\nphoneNumber:${value.phoneNumber}\nplatForm:${value.platform}\nverificationCode:${value.verificationCode}');
                    });
                    user = BaseUserInfo.init({
                      'nickname': '用户$phonenumber',
                      'avatar':
                          'http://img.duoziwang.com/2017/06/08/B16106482.jpg'
                    });
                    Navigator.of(context).pushAndRemoveUntil(
                        new MaterialPageRoute(
                            builder: (context) =>
                                new GeneralFramework(currentIndex: 3)),
                        (route) => route == null);
                  } else {
                    setState(() {
                      autovalidate = true;
                    });
                  }
                },
              ),
            )
          ],
        ),
      );
    return myWidget;
  }
}
