import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:lawyerplatform/model/base_user_info.dart';

class popMenuButton extends StatefulWidget {
  popMenuButton({Key key}) : super(key: key);

  @override
  _popMenuButtonState createState() => _popMenuButtonState();
}

class _popMenuButtonState extends State<popMenuButton> {
  popMenuItem(IconData icon, String text, String cvalue) {
    return PopupMenuItem<String>(
        value: cvalue,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[Icon(icon, color: Colors.blue), Text(text)],
        ));
  }

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton(
      itemBuilder: (BuildContext context) {
        return <PopupMenuItem<String>>[
          this.popMenuItem(Icons.edit, '修改案件', 'A'),
          this.popMenuItem(Icons.content_paste, '传代理词', 'B'),
          this.popMenuItem(Icons.stars, '申请结案', 'C')
        ];
      },
      onSelected: (String action) {
        switch (action) {
          case 'A':
            {
              if (user == null) {
                Fluttertoast.showToast(
                  msg: '请先登录',
                );
              } else {}
            }
            break;
          case 'B':
            {
              if (user == null) {
                Fluttertoast.showToast(
                  msg: '请先登录',
                );
              } else {}
            }
            break;
          case 'C':
            {
              if (user == null) {
                Fluttertoast.showToast(
                  msg: '请先登录',
                );
              } else {}
            }
            break;
        }
      },
    );
  }
}
