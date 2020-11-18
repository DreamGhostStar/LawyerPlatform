import 'package:flutter/cupertino.dart';

class ExpansionPanelItem {
  final String headerText;
  final Widget body;
  bool isExpanded = false;

  ExpansionPanelItem({this.body, this.headerText, this.isExpanded});
}
