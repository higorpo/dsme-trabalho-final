import 'package:dio/dio.dart';

const baseUrl = 'http://10.1.1.107:8000';

var options = BaseOptions(
  baseUrl: baseUrl,
);

Dio api = Dio(options);
