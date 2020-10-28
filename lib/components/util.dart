import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flui/flui.dart';
import 'package:flutter/material.dart';
import 'package:crypto/crypto.dart';
import 'package:convert/convert.dart';
import 'package:shared_preferences/shared_preferences.dart';

//工具类
VoidCallback openAlertDialog(
    BuildContext context, VoidCallback callback, String content) {
  showDialog(
      context: context,
      barrierDismissible: false, // 若设置为false用户不能点击空白部分来关闭对话框
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('提示', style: TextStyle(fontWeight: FontWeight.bold)),
          content: Text(content),
          actions: <Widget>[
            FlatButton(
              child: Text('确认'),
              onPressed: () {
                Navigator.pop(context);
                callback();
              },
            ),
            FlatButton(
              child: Text('取消'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        );
      });
}

void openSimpleDialog(BuildContext context, String content) {
  showDialog(
      context: context,
      builder: (context) => SimpleDialog(
            title: Text('提示'),
            children: [
              Container(
                margin: EdgeInsets.only(left: 10),
                child: Text(content),
              ),
              Align(
                alignment: Alignment.centerRight,
                child: FlatButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    child: Text(
                      '取消',
                      style: TextStyle(color: Colors.blue),
                    )),
              )
            ],
          ));
}

//骨架屏
Widget skeleton() {
  return FLSkeleton(
    shape: BoxShape.rectangle,
    borderRadius: BorderRadius.circular(2),
    margin: EdgeInsets.only(left: 60, top: 10, right: 10),
    height: 20,
  );
}

// 加载中状态框
Widget loadingWidget(bool loading) {
  if (loading) {
    return new Padding(
      padding: const EdgeInsets.all(8.0),
      child: new Center(
        child: new Opacity(
          opacity: 1,
          child: new CircularProgressIndicator(),
        ),
      ),
    );
  }
  return Container();
}

// 上传图片
upLoadImage(File image, ValueChanged<String> callback) async {
  // String path = image.path;
  // String name = path.substring(path.lastIndexOf("/") + 1, path.length);

  // FormData formdata = FormData.fromMap(
  // {"file": await MultipartFile.fromFile(path, filename: name)});

  // Dio dio = new Dio();
  // Response respone = await dio.post<String>(
  // "$backIP/user/upFile",
  // data: formdata,
  // );
  // if (jsonDecode(respone.data)['code'] == 0) {
  //   Fluttertoast.showToast(
  //     msg: "图片上传成功",
  //     gravity: ToastGravity.CENTER,
  //     textColor: Colors.grey,
  //   );
  // callback(jsonDecode(respone.data)['data']);
  // print(jsonDecode(respone.data)['data']);
  // }
}
// md5加密
String generateMd5(String data) {
  var content = new Utf8Encoder().convert(data);
  var digest = md5.convert(content);
  // 这里其实就是 digest.toString()
  return hex.encode(digest.bytes);
}

// 获取token
Future<String> getToken() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String token = prefs.getString('Authorization');
  return token;
}
