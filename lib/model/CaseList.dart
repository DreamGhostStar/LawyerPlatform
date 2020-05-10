import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

Future getAPI() async{
  await Dio().get("path");
}