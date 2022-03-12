import 'package:flutter/material.dart';
import 'package:mobile/services/services.dart';

class HomeController extends ChangeNotifier {
  List<Property> _properties = [];
  bool _loading = true;

  get propertie => _properties;
  get loading => _loading;

  Future<void> getProperties() async {
    _loading = true;
    notifyListeners();

    await Future.delayed(const Duration(seconds: 2));
    _loading = false;
    _properties = await Properties().getAll() ?? [];
    notifyListeners();
  }
}
