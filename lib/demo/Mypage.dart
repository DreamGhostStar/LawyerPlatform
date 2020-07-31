import 'package:flutter/material.dart';
import 'package:lawyerplatform/model/BaseUserInfo.dart';
import 'package:shared_preferences/shared_preferences.dart';
//这是我的页面

class Mypage extends StatefulWidget {
  @override
  _MypageState createState() => _MypageState();
}

class _MypageState extends State<Mypage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[200],
        body: ListView(
          children: <Widget>[
            GestureDetector(
              onTap: () {
                if (user == null) {
                  Navigator.pushNamed(context, '/loginSelect');
                } else {
                  Navigator.pushNamed(context, '/userDetail');
                }
              },
              child: Container(
                margin: EdgeInsets.only(left: 20, right: 20, top: 20),
                padding: EdgeInsets.all(10),
                child: Column(
                  children: <Widget>[UserBasicInfo()],
                ),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(20),
                        topRight: Radius.circular(20)),
                    color: Colors.white),
              ),
            ),
          ],
        ));
  }
}

class UserAvatar extends StatelessWidget {
  final double imageStyle; // 用户头像avatar样式
  UserAvatar({Key key, this.imageStyle = 80}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: imageStyle,
      height: imageStyle,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(imageStyle / 2),
        child: FadeInImage.assetNetwork(
          placeholder: 'images/loading.gif', // 占位图
          image: user.avatar,
        ),
      ),
    );
  }
}

class UserBasicInfo extends StatefulWidget {
  @override
  _UserBasicInfoState createState() => _UserBasicInfoState();
}

class _UserBasicInfoState extends State<UserBasicInfo> {
  static const double imageStyle = 80; //照片宽高
  @override
  void initState() {
    super.initState();
    getUserInfo();
  }

  void getUserInfo() async {
    SharedPreferences perfs = await SharedPreferences.getInstance();
    String token = perfs.getString('Authorization'); //待填
    if (token != null) {
      // TODO: 获取后端数据
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget infoShow = Row(
      children: <Widget>[
        Container(
          width: imageStyle,
          height: imageStyle,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(imageStyle / 2),
            child: Image.asset('images/defaultAvatar.jpg'),
          ),
        ),
        SizedBox(
          width: 20,
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              '点击登录',
              style: TextStyle(fontSize: 24),
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              '学法、知法、守法、用法',
              style: TextStyle(color: Colors.grey),
            ),
          ],
        )
      ],
    );

    // 条件渲染
    // 如果有用户数据则渲染用户数据
    if (user != null) {
      infoShow = Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Row(
            children: <Widget>[
              UserAvatar(),
              SizedBox(
                width: 20,
              ),
              Text(
                user.name,
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.w500),
              )
            ],
          ),
          Icon(
            Icons.arrow_forward_ios,
            size: 16,
          )
        ],
      );
    }
    return infoShow;
  }
}
