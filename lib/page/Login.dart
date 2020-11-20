import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/Form.dart';

//这是登录页面
class Login extends StatefulWidget {
  Login({Key key}) : super(key: key);
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  String title = '账号密码登录';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        body: SingleChildScrollView(
          //解决键盘弹出时组件溢出的问题
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              SizedBox(
                height: 120,
              ),
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
                            } else {
                              title = '账号密码登录';
                            }
                            RegisterForm(
                              title: title,
                            );
                          });
                        },
                        child: Align(
                          child: Text(
                            title == '账号密码登录' ? '手机验证码登录' : '账号密码登录',
                            style: TextStyle(color: Colors.blue),
                          ),
                          alignment: Alignment.bottomLeft,
                        ),
                      )
                    ]),
              ),
            ],
          ),
        ));
  }
}
