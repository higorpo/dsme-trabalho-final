import 'package:flutter/material.dart';
import 'package:mobile/services/services.dart';

class PropertyDetailsController extends ChangeNotifier {
  Property? _property;
  bool _loading = true;
  String? _errorMessage;

  Property? get property => _property;
  bool get loading => _loading;
  String? get errorMessage => _errorMessage;

  Future<void> getProperty(String propertyId) async {
    _loading = true;
    notifyListeners();

    await Future.delayed(const Duration(seconds: 2));

    try {
      _property = await Properties().get(propertyId);
      _errorMessage = null;
    } on PropertyError catch (e) {
      _property = null;

      switch (e) {
        case PropertyError.notFound:
          _errorMessage = 'Não foi possível encontrar essa propriedade';
          break;
        default:
          _errorMessage = 'Não foi possível carregar essa propriedade, tente novamente mais tarde!';
          break;
      }
    } finally {
      _loading = false;
    }

    notifyListeners();
  }
}
