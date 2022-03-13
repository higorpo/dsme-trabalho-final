import 'package:dio/dio.dart';

const baseUrl = 'http://10.1.1.107:8000';

final options = BaseOptions(
  baseUrl: baseUrl,
);

final Dio api = Dio(options);
