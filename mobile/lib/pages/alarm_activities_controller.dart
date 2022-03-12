import 'package:flutter/material.dart';
import 'package:mobile/utils/sse_client.dart';

class AlarmActivitiesController extends ChangeNotifier {
  final List<String> _activities = [];

  List<String> get activities => _activities;

  Future<void> getActivities(String alarmId) async {
    final stream =
        SseClient.connect(uri: Uri.parse("http://10.1.1.107:8000/alarm-notifier/$alarmId"), closeOnError: false, withCredentials: false).stream;

    stream.listen((event) {
      _activities.add(event);
      notifyListeners();
    });
  }
}
