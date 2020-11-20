import 'package:flutter/cupertino.dart';

class ExpansionPanelItem {
  final Widget header;
  final Widget body;
  bool isExpanded = false;

  ExpansionPanelItem({this.body, this.header, this.isExpanded});
}
