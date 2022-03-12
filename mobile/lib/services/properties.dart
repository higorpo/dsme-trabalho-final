import 'package:dio/dio.dart';
import 'package:mobile/config/config.dart';

class Property {
  late String id;
  late String address;
  late String ownerName;
  late String ownerPhone;
  late String createdAt;
  late String updatedAt;

  Property({
    required this.id,
    required this.address,
    required this.ownerName,
    required this.ownerPhone,
    required this.createdAt,
    required this.updatedAt,
  });

  Property.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    address = json['address'];
    ownerName = json['ownerName'];
    ownerPhone = json['ownerPhone'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
  }
}

class Properties {
  Properties._privateConstructor();

  static final Properties _instance = Properties._privateConstructor();

  factory Properties() {
    return _instance;
  }

  Future<List<Property>?> getAll() async {
    try {
      final response = await api.get('/properties');

      if (response.statusCode == 200) {
        final responseBody = response.data.map((element) {
          return Property.fromJson(element);
        }).toList();

        return responseBody.cast<Property>();
      } else {
        return [];
      }
    } on DioError catch (err) {
      print(err);
    }
  }
}
