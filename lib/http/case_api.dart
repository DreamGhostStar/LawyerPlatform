import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:lawyerplatform/components/util.dart';
import 'package:lawyerplatform/http/HttpUtill.dart';

Future getCaseInfo_api(String url, Map<String, dynamic> data) async {
  //案件具体信息列表接口
  String token = await getToken();
  Response res = await HttpUtil.get(
    // get要传参时使用这个方法
    url,
    parameters: data,
    headers: {'Authorization': token},
  );
  return jsonDecode(res.data);
}
