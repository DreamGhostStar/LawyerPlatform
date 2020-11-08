import 'package:flui/flui.dart';
import 'package:flutter/material.dart';

class CaseInfoSkeleton extends StatelessWidget {
  const CaseInfoSkeleton({Key key}) : super(key: key);
  Widget _rowSkeleton(double width1, double width2) {
    return Row(
        //内容行 骨架
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          FLSkeleton(
            shape: BoxShape.rectangle,
            borderRadius: BorderRadius.circular(2),
            margin: EdgeInsets.all(10),
            padding: EdgeInsets.only(left: 10, right: 10),
            height: 20,
            width: width1,
          ),
          FLSkeleton(
            shape: BoxShape.rectangle,
            borderRadius: BorderRadius.circular(2),
            padding: EdgeInsets.only(left: 10, right: 10),
            margin: EdgeInsets.all(10),
            height: 20,
            width: width2,
          )
        ]);
  }

  Widget _skeletonWidget() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
            child: FLSkeleton(
          shape: BoxShape.rectangle,
          borderRadius: BorderRadius.circular(2),
          margin: EdgeInsets.all(10),
          height: 20,
          width: 70,
        )),
        Card(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
              _rowSkeleton(50, 60),
              _rowSkeleton(60, 70),
              _rowSkeleton(80, 50),
              _rowSkeleton(60, 80),
              _rowSkeleton(70, 100),
            ])),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Container(
            padding: EdgeInsets.only(top: 10, bottom: 20),
            child: _skeletonWidget()),
        Container(child: _skeletonWidget()),
      ],
    );
  }
}
