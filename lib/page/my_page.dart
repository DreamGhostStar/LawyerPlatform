import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:lawyerplatform/components/basic_info.dart';
import 'package:lawyerplatform/components/my_page_function.dart';
import 'package:lawyerplatform/model/base_user_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
//这是我的页面

class Mypage extends StatefulWidget {
  @override
  _MypageState createState() => _MypageState();
}

class _MypageState extends State<Mypage> {
  bool have_notice = true;

  getMyFunctionList() {
    //获取个人中心功能列表
    List<MyFunctionItem> _list = [];
    _list.addAll(myFunctionStatic);
    if (user != null) {
      _list.insert(_list.length - 2,
          MyFunctionItem.init({'icon': Icons.vpn_key, 'text': '修改密码'}));
    }
    return _list;
  }

  //进入不同的页面
  enterVarious(String type) async {
    if (type == '退出登录') {
      user = null;

      // 清除token
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.remove('Authorization');

      Fluttertoast.showToast(
        msg: '成功退出',
        backgroundColor: Colors.green,
        textColor: Colors.white,
      );
      setState(() {
        user = null;
      });
      return;
    }
    Map<String, String> contrast = {
      '关于我们': '/about',
      '错误中心': '/error',
      '修改密码': '/alter',
      '电子名片': '/card',
      '查看收入': '/income',
      '日常电话': '/phone',
      '我的通知': '/notice'
    };
    Navigator.pushNamed(context, contrast[type]);
  }

  _functionList(IconData icon, String text, Function function) {
    return Material(
      color: Colors.white,
      child: InkWell(
        child: Container(
          padding: EdgeInsets.only(
            left: 10,
            right: 10,
            top: 20,
            bottom: 20,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Row(
                children: <Widget>[
                  Icon(
                    icon,
                    color: Colors.lightBlueAccent,
                    size: 26,
                  ),
                  SizedBox(width: 10),
                  Text(
                    text,
                    style: TextStyle(fontSize: 20),
                  ),
                ],
              ),
              Icon(
                Icons.arrow_forward_ios,
                size: 12,
              )
            ],
          ),
        ),
        onTap: () {
          function();
        },
      ),
    );
  }

  _comeFunction(String text) {
    if (user == null) {
      Fluttertoast.showToast(
        msg: '请先登录',
        backgroundColor: Colors.black,
        textColor: Colors.white,
      );
      return;
    }
    enterVarious(text);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text('个人中心'),
            automaticallyImplyLeading: false,
            centerTitle: true),
        backgroundColor: Colors.grey[200],
        body: ListView(children: <Widget>[
          UserBasicInfo(
            //头部
            user: user,
          ),
          ListView.builder(
              //功能模块
              shrinkWrap: true,
              physics: new NeverScrollableScrollPhysics(),
              itemCount: getMyFunctionList().length,
              itemBuilder: (BuildContext context, int index) {
                if (getMyFunctionList()[index].text == '我的通知') {
                  if (have_notice) {
                    return Stack(
                      children: [
                        _functionList(getMyFunctionList()[index].icon, '我的通知',
                            () {
                          _comeFunction(getMyFunctionList()[index].text);
                        }),
                        Positioned(
                          left: 34,
                          bottom: 41,
                          child: Icon(
                            Icons.brightness_1,
                            color: Colors.red,
                            size: 8,
                          ), //通知用的红点,
                        )
                      ],
                    );
                  } else {
                    return Stack(
                      children: [
                        _functionList(getMyFunctionList()[index].icon, '我的通知',
                            () {
                          _comeFunction(getMyFunctionList()[index].text);
                        })
                      ],
                    );
                  }
                }
                return _functionList(getMyFunctionList()[index].icon,
                    getMyFunctionList()[index].text, () {
                  _comeFunction(getMyFunctionList()[index].text);
                });
              })
        ]));
  }
}
