import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/flutter_uploader.dart';
import 'package:lawyerplatform/components/text_field.dart';

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
            child: MyTextField(controller: _controller, labelText: "在此编辑"),
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
