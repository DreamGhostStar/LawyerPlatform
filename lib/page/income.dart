import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/util.dart';

class Income extends StatefulWidget {
  Income({Key key}) : super(key: key);

  @override
  _IncomeState createState() => _IncomeState();
}

class _IncomeState extends State<Income> {
  bool _loading = false;

  Future _load() async {
    setState(() {
      _loading = true;
    });

    await Future.delayed(Duration(seconds: 1), () {
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
      appBar: AppBar(
        backgroundColor: Colors.grey[200],
        title: Text('查看收入'),
      ),
      body: _loading ? loadingWidget(_loading) : ListView(),
    );
  }
}
