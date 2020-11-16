import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/util.dart';

class DayTimePhone extends StatefulWidget {
  DayTimePhone({Key key}) : super(key: key);

  @override
  _DayTimePhoneState createState() => _DayTimePhoneState();
}

class _DayTimePhoneState extends State<DayTimePhone> {
  bool _loading = false;

  Future _load() async {
    setState(() {
      _loading = true;
    });
    Future.delayed(Duration(seconds: 1), () {
      setState(() {
        _loading = false;
      });
    });
    return null;
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _load();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        title: Text('日常电话'),
      ),
      body: _loading ? loadingWidget(_loading) : ListView(),
    );
  }
}
