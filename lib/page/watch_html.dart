import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:lawyerplatform/components/util.dart';

class WatchHtml extends StatefulWidget {
  final String title;
  WatchHtml({Key key, @required this.title}) : super(key: key);

  @override
  _WatchHtmlState createState() => _WatchHtmlState();
}

class _WatchHtmlState extends State<WatchHtml> {
  bool _loading = false;
  String html = '';

  Future<Null> _init() async {
    setState(() {
      _loading = true;
    });
    html = widget.title == '代理词' ? '<h2>这是代理词</h2>' : '<h2>这是结案文书</h2>';
    Future.delayed(Duration(microseconds: 100), () {
      if (mounted) {
        setState(() {
          _loading = false;
        });
      }
    });

    return;
  }

  @override
  void initState() {
    super.initState();
    _init();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: _loading ? Text('加载中...') : Text(widget.title),
      ),
      body: _loading
          ? loadingWidget(_loading)
          : ListView(
              children: [
                Center(
                  child: Html(
                    data: html,
                  ),
                )
              ],
            ),
    );
  }
}
