import 'package:dio/dio.dart';

var options = BaseOptions(
  baseUrl: 'http://10.1.1.107:8000',
);

Dio api = Dio(options);
