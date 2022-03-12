import 'package:flutter/material.dart';
import 'package:mobile/services/services.dart';

class HomeController extends ChangeNotifier {
  List<Property> _properties = [];
  bool _loading = true;
  String? _errorMessage;

  List<Property> get properties => _properties;
  bool get loading => _loading;
  String? get errorMessage => _errorMessage;

  Future<void> getProperties() async {
    _loading = true;
    notifyListeners();

    await Future.delayed(const Duration(seconds: 2));

    try {
      _properties = await Properties().getAll();
      _errorMessage = null;
    } on PropertyError {
      _properties = [];
      _errorMessage = 'Não foi possível carregar as propriedades';
    } finally {
      _loading = false;
    }

    notifyListeners();
  }
}
