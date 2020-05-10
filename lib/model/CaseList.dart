import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
//一次性将数据放进数组里，需要时取出
//点什么标签传什么数据，需要多次传递数据
Future getAPI(bool isAll,String status) async{
  await Dio().get("path");
}