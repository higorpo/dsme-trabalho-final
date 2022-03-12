import 'package:dio/dio.dart';
import 'package:mobile/config/config.dart';

class Alarm {
  late String id;
  late String propertyId;
  late String isActived;
  late String createdAt;
  late String updatedAt;

  Alarm({
    required this.id,
    required this.propertyId,
    required this.isActived,
    required this.createdAt,
    required this.updatedAt,
  });

  Alarm.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        propertyId = json['property_id'],
        isActived = json['is_actived'],
        createdAt = json['created_at'],
        updatedAt = json['updated_at'];
}

enum AlarmError { unexpectedError, notFound, serverError }

class Alarms {
  Alarms._privateConstructor();

  static final Alarms _instance = Alarms._privateConstructor();

  factory Alarms() {
    return _instance;
  }

  Future<Alarm> get(String alarmId) async {
    try {
      final response = await api.get('/alarms/$alarmId');
      return Alarm.fromJson(response.data);
    } on DioError catch (e) {
      if (e.response != null) {
        if (e.response!.statusCode == 404) {
          throw AlarmError.notFound;
        } else if (e.response!.statusCode == 500) {
          throw AlarmError.serverError;
        }
      }
      throw AlarmError.unexpectedError;
    }
  }
}
