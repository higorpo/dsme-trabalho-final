import 'package:flutter/material.dart';

import '../config/config.dart';
import '../utils/sse_client.dart';

class AlarmActivitiesController extends ChangeNotifier {
  final List<String> _activities = [];

  List<String> get activities => _activities;

  Future<void> getActivities(String alarmId) async {
    final stream = SseClient.connect(uri: Uri.parse("$baseUrl/alarm-notifier/$alarmId"), closeOnError: false, withCredentials: false).stream;

    stream.listen((event) {
      _activities.add(event);
      notifyListeners();
    });
  }
}
