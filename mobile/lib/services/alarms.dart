import 'package:dio/dio.dart';
import 'package:mobile/config/config.dart';

class Alarm {
  late String id;
  late String propertyId;
  late bool isActivated;
  late String createdAt;
  late String updatedAt;

  Alarm({
    required this.id,
    required this.propertyId,
    required this.isActivated,
    required this.createdAt,
    required this.updatedAt,
  });

  Alarm.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        propertyId = json['propertyId'],
        isActivated = json['isActivated'],
        createdAt = json['createdAt'],
        updatedAt = json['updatedAt'];
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

  Future<List<Alarm>> getAlarmsFromProperty(String propertyId) async {
    try {
      final response = await api.get('/alarms/fromProperty/$propertyId');

      final responseBody = response.data.map((element) {
        return Alarm.fromJson(element);
      }).toList();

      return responseBody.cast<Alarm>();
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
