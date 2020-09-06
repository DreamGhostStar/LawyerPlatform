import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';

Future<PhoneValidate> fetchPost() async {
  final response = await http.post('http://106.14.174.206:7003/api/login/note');
  print(response.statusCode);
  if (response.statusCode == 200)
    return PhoneValidate.fromJson(json.decode(response.body));
  else
    throw Exception('Failed to load post');
}

class PhoneValidate {
  final String phoneNumber;
  final String verificationCode;
  final int platform;

  PhoneValidate({this.phoneNumber, this.verificationCode, this.platform});

  factory PhoneValidate.fromJson(Map<String, dynamic> json) {
    return PhoneValidate(
        phoneNumber: json['phoneNumber'],
        verificationCode: json['verification_code'],
        platform: json['platform']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['phoneNumber'] = this.phoneNumber;
    data['verification_code'] = this.verificationCode;
    data['platform'] = this.platform;
    return data;
  }
}
