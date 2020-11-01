import 'dart:io';
import 'package:flutter/material.dart';

class UploadAgencyWord extends StatefulWidget {
  UploadAgencyWord({Key key}) : super(key: key);

  @override
  _UploadAgencyWordState createState() => _UploadAgencyWordState();
}

class _UploadAgencyWordState extends State<UploadAgencyWord> {
  Future<File> _getFile() async {}

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
              child: Text('如果您有word版本，您可以点此上传'),
            ),
            onTap: () {
              _getFile();
            },
          )
        ],
      ),
    );
  }
}
