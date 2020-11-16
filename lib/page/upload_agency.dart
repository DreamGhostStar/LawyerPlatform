import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/flutter_uploader.dart';

class UploadAgencyWord extends StatefulWidget {
  UploadAgencyWord({Key key}) : super(key: key);

  @override
  _UploadAgencyWordState createState() => _UploadAgencyWordState();
}

class _UploadAgencyWordState extends State<UploadAgencyWord> {
  TextEditingController _controller = new TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('上传代理词'),
      ),
      body: ListView(
        children: [
          InkWell(
            child: Container(
              margin: EdgeInsets.all(20),
              child: RichText(
                textAlign: TextAlign.center,
                text: TextSpan(children: [
                  TextSpan(
                      text: '点此',
                      style: TextStyle(color: Colors.blue, fontSize: 20)),
                  TextSpan(
                      text: '上传word文件', style: TextStyle(color: Colors.black)),
                ]),
              ),
            ),
            onTap: () {
              Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => UploadScreen()));
            },
          ),
          Container(
            margin: EdgeInsets.only(
              left: 20,
              right: 20,
            ),
            child: TextField(
                controller: _controller,
                maxLength: TextField.noMaxLength, //提示字数
                maxLines: null, //为null时，不限制行数
                enableInteractiveSelection: true, //长按出现粘贴剪切等选项
                textInputAction: TextInputAction.done, //键盘右下角的按钮类型
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(15),
                    ),
                    borderSide: BorderSide(
                      color: Colors.grey[400],
                      width: 1,
                    ),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(
                      color: Colors.black,
                      width: 1,
                    ),
                    borderRadius: BorderRadius.all(
                      Radius.circular(15),
                    ),
                  ),
                  labelText: "手动编辑",
                  labelStyle: TextStyle(color: Colors.grey[600]),
                  hintText: "也可以在这里编辑上传哦~",
                )),
          ),
          Container(
            margin: EdgeInsets.only(left: 25, right: 25),
            child: RaisedButton(
                color: Colors.blue,
                child: Text(
                  '提交',
                  style: TextStyle(color: Colors.white),
                ),
                onPressed: () {}),
          ),
        ],
      ),
    );
  }
}
