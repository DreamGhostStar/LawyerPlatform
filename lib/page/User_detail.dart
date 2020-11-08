import 'dart:io';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:lawyerplatform/components/basic_info.dart';
import 'package:lawyerplatform/components/util.dart';
import 'package:image_picker/image_picker.dart';
import 'package:lawyerplatform/model/lawyer_detail_info.dart';

class UserDetail extends StatefulWidget {
  @override
  _UserDetailState createState() => _UserDetailState();
}

class _UserDetailState extends State<UserDetail> {
  bool _submitLoading = false;
  final TextEditingController nameController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final RegExp regPhone = RegExp(r"^1[0-9]{10}$");
  final RegExp regName = RegExp(r"^[\u4E00-\u9FA5A-Za-z]{0,6}$");
  final String phoneErorrText = '手机号必须全由数字组成且必须为11位';
  final String nameErorrText = '由中文或英文组成且不能超过6位';
  bool _loading = false;
  int sex;
  // String _image;
  List<int> _errorList = [];
  final picker = ImagePicker();
  LawyerDetailInfo _userInfo;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  _getSex() {
    sex = sexValue[_userInfo.sex];
  }

  Future<Null> _loadData() async {
    setState(() {
      _loading = true;
    });
    await Future.delayed(Duration(microseconds: 200), () {
      _userInfo = userA;
      print(_userInfo.sex);
      _getSex();
      if (mounted) {
        setState(() {
          nameController.text = _userInfo.name;
          phoneController.text = _userInfo.phone;
          _loading = false;
        });
      }
    });
  }

  Future getImage(bool isTakePhoto) async {
    Navigator.pop(context);
    final pickedFile = await picker.getImage(
        source: isTakePhoto ? ImageSource.camera : ImageSource.gallery);

    if (pickedFile != null) {
      // showDialog(
      //     context: context,
      //     builder: (context) {
      //       return new AboveLoading(
      //         content: '上传中...',
      //       );
      //     });

      // upLoadImage(File(pickedFile.path), (imageUrl) {
      //   setState(() {
      //     _image = imageUrl;
      //   });
      //   Navigator.pop(context);
      // });
      print('~~~~~~~~~~~');
      print(File(pickedFile.path).path);
      setState(() {
        _userInfo.avator = File(pickedFile.path).path;
      });
    } else {
      Fluttertoast.showToast(
          msg: '未选择图片',
          backgroundColor: Colors.cyan[200],
          textColor: Colors.white);
    }
  }

  pickImage() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        height: 120,
        child: Column(
          children: <Widget>[_item('拍照', true), _item('从相册选择', false)],
        ),
      ),
    );
  }

  _item(String title, bool isTakePhoto) {
    return GestureDetector(
      child: ListTile(
        leading: Icon(isTakePhoto ? Icons.camera_alt : Icons.photo_library),
        title: Text(title),
        onTap: () => getImage(isTakePhoto),
      ),
    );
  }

  verifyInput(int index, String text, String errorText) {
    if (text == '') {
      return '输入不能为空';
    }

    return _errorList.contains(index) ? errorText : null;
  }

  Widget _getInputTextField(
    String title,
    TextEditingController controller,
    String placeholder,
    int index, {
    String errorText,
    RegExp reg,
  }) {
    return Container(
      padding: EdgeInsets.all(10),
      margin: EdgeInsets.only(top: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.grey[300], width: 1),
      ),
      child: Row(
        children: <Widget>[
          Container(
            width: 80,
            child: Text('$title',
                style: TextStyle(fontSize: 18, color: Colors.grey[600])),
          ),
          Expanded(
            child: TextField(
              controller: controller,
              maxLines: 1,
              decoration: InputDecoration(
                errorText: verifyInput(index, controller.text, errorText),
                contentPadding: EdgeInsets.symmetric(vertical: 10.0),
                border: OutlineInputBorder(
                  borderSide: BorderSide.none,
                ),
                hintText: placeholder,
                hintStyle: TextStyle(color: Colors.grey[500]),
              ),
              onChanged: (String text) {
                if (!(reg.hasMatch(text))) {
                  if (!_errorList.contains(index)) {
                    setState(() {
                      _errorList.add(index);
                    });
                  }
                } else {
                  setState(() {
                    _errorList.remove(index);
                  });
                }
              },
            ),
          ),
        ],
      ),
    );
  }

  Map<String, int> sexValue = {'男': 0, '女': 1};
  Widget _getRadio(int radioValue) {
    return Radio(
      value: radioValue,
      groupValue: sex,
      onChanged: (value) {
        setState(() {
          sex = value;
        });
      },
    );
  }

  // 提交数据
  Future<Null> _submitData() async {
    if (nameController.text == '' || phoneController.text == '') {
      Fluttertoast.showToast(
        msg: '填入的信息不符合规范，请检查',
        gravity: ToastGravity.CENTER,
        backgroundColor: Colors.red,
        textColor: Colors.white,
      );
      return;
    }
    if (_errorList.length != 0) {
      Fluttertoast.showToast(
        msg: '填入的密码有 ${_errorList.length}项 不符合规范，请修改之后再重试',
        gravity: ToastGravity.CENTER,
        backgroundColor: Colors.red,
        textColor: Colors.white,
      );
      return;
    }
    setState(() {
      _submitLoading = true;
    });
    print(_errorList);
    if (mounted) {
      // dynamic res = await alterUserInfo_api('$backIP/user/userInfo', {
      //   'name': nameController.text,
      //   'sex': sex,
      //   'phonenumber': phoneController.text,
      // });
      // await getBasicUserInfo_api(); // 重新获取当前用户基本信息
      setState(() {
        _submitLoading = false;
      });
      Navigator.pop(context);
      Fluttertoast.showToast(
        msg: '修改信息成功',
        gravity: ToastGravity.TOP,
        backgroundColor: Colors.green,
        textColor: Colors.white,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[300],
        appBar: AppBar(
          title: Text('我的信息'),
          centerTitle: true,
        ),
        body: _loading
            ? loadingWidget(_loading)
            : Container(
                child: ListView(children: [
                SizedBox(height: MediaQuery.of(context).size.height / 20),
                Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _userInfo.avator == null
                          ? UserAvatar(avatar: _userInfo.avator)
                          : Container(
                              width: 100,
                              height: 100,
                              // color: Colors.white,
                              child: GestureDetector(
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(100),
                                    child: Image.network(_userInfo.avator),
                                  ),
                                  onTap: () {
                                    pickImage();
                                  })),
                    ]),
                _getInputTextField(
                  '姓名',
                  nameController,
                  '请输入你的姓名',
                  0,
                  errorText: nameErorrText,
                  reg: regName,
                ),
                Container(
                  padding: EdgeInsets.all(10),
                  margin: EdgeInsets.only(top: 10),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(color: Colors.grey[300], width: 1),
                  ),
                  child: Row(
                    children: <Widget>[
                      Container(
                        width: 80,
                        child: Text('性别',
                            style: TextStyle(
                                fontSize: 18, color: Colors.grey[600])),
                      ),
                      Expanded(
                          child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: <Widget>[
                          _getRadio(0),
                          Text("男"),
                          SizedBox(width: 20),
                          _getRadio(1),
                          Text("女"),
                        ],
                      )),
                    ],
                  ),
                ),
                _getInputTextField(
                  '手机号',
                  phoneController,
                  '请输入11位手机号',
                  2,
                  errorText: phoneErorrText,
                  reg: regPhone,
                ),
                Container(
                  width: 150,
                  height: 150,
                  margin: EdgeInsets.only(top: 15),
                  // color: Colors.white,
                  child: GestureDetector(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(30),
                        child: Image.asset('images/logo.jpg'),
                      ),
                      onTap: () {
                        pickImage();
                      }),
                ),
                Container(
                  width: 150,
                  height: 150,
                  margin: EdgeInsets.only(top: 15),
                  // color: Colors.white,
                  child: GestureDetector(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(30),
                        child: Image.asset('images/logo.jpg'),
                      ),
                      onTap: () {
                        pickImage();
                      }),
                ),
                SizedBox(height: 20),
                Flex(
                  direction: Axis.vertical,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    RaisedButton(
                      child: Text(_submitLoading ? '保存中...' : '保存'),
                      color: Colors.blueAccent,
                      textColor: Colors.white,
                      onPressed: () {
                        if (_submitLoading) {
                          Fluttertoast.showToast(
                            msg: '请勿重复点击',
                            backgroundColor: Colors.black,
                            textColor: Colors.white,
                          );
                          return;
                        }
                        _submitData();
                      },
                    ),
                  ],
                ),
                SizedBox(height: 20),
              ])));
  }
}
