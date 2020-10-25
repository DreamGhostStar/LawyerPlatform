import 'package:flutter/material.dart';
import 'package:lawyerplatform/model/base_user_info.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UserAvatar extends StatelessWidget {
  final double imageStyle; // 用户头像avatar样式
  final String avatar;
  UserAvatar({Key key, this.imageStyle = 80, @required this.avatar})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: imageStyle,
      height: imageStyle,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(imageStyle / 2),
        child: FadeInImage.assetNetwork(
          placeholder: 'images/loading.gif', // 占位图
          image: this.avatar,
        ),
      ),
    );
  }
}

class UserBasicInfo extends StatefulWidget {
  final BaseUserInfo user;

  const UserBasicInfo({Key key, this.user}) : super(key: key);
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
    if (widget.user != null) {
      print(widget.user.avatar);
      print(widget.user.nickname);
      infoShow = Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Row(
            children: <Widget>[
              UserAvatar(
                avatar: widget.user.avatar,
              ),
              SizedBox(
                width: 20,
              ),
              Container(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      widget.user.nickname,
                      style:
                          TextStyle(fontSize: 24, fontWeight: FontWeight.w500),
                    ),
                    SizedBox(height: 15),
                    Text('ID: ' + widget.user.lawyerID),
                  ],
                ),
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
    return GestureDetector(
      onTap: () {
        if (widget.user == null) {
          Navigator.pushNamed(context, '/loginSelect');
        } else {
          Navigator.pushNamed(context, '/userDetail');
        }
      },
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20), topRight: Radius.circular(20)),
          color: Colors.white,
        ),
        margin: EdgeInsets.only(left: 20, right: 20, top: 20),
        padding: EdgeInsets.all(10),
        child: infoShow,
      ),
    );
  }
}
