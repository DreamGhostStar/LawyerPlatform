import 'package:flui/flui.dart';
import 'package:flutter/material.dart';

class CaseListSkeleton extends StatelessWidget {
  const CaseListSkeleton({Key key}) : super(key: key);
  Widget _skeletonWidget() {
    return Container(
      padding: EdgeInsets.only(bottom: 10),
      child: Card(
        child: Stack(
          children: [
            FLSkeleton(
              shape: BoxShape.rectangle,
              borderRadius: BorderRadius.circular(2),
              margin: EdgeInsets.only(left: 10, top: 10, right: 10),
              height: 20,
            ),
            FLSkeleton(
              shape: BoxShape.rectangle,
              borderRadius: BorderRadius.circular(2),
              margin: EdgeInsets.only(left: 10, top: 40),
              width: 300,
              height: 20,
            ),
            FLSkeleton(
              shape: BoxShape.rectangle,
              borderRadius: BorderRadius.circular(2),
              margin: EdgeInsets.only(left: 10, top: 70, bottom: 10),
              width: 100,
              height: 20,
            ),
            FLSkeleton(
              shape: BoxShape.rectangle,
              borderRadius: BorderRadius.circular(2),
              margin: EdgeInsets.only(left: 10, top: 10, right: 10),
              height: 20,
            ),
            FLSkeleton(
              shape: BoxShape.rectangle,
              borderRadius: BorderRadius.circular(2),
              margin: EdgeInsets.only(left: 10, top: 40),
              width: 300,
              height: 20,
            ),
            FLSkeleton(
              shape: BoxShape.rectangle,
              borderRadius: BorderRadius.circular(2),
              margin: EdgeInsets.only(left: 10, top: 70, bottom: 10),
              width: 100,
              height: 20,
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _skeletonWidget(),
        _skeletonWidget(),
        _skeletonWidget(),
        _skeletonWidget()
      ],
    );
  }
}
