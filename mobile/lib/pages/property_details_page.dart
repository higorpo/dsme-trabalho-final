// ignore_for_file: use_key_in_widget_constructors

import 'package:flutter/material.dart';

class PropertyDetalsPage extends StatefulWidget {
  final String propertyId;
  const PropertyDetalsPage({required this.propertyId});

  @override
  _PropertyDetalsPageState createState() => _PropertyDetalsPageState();
}

class _PropertyDetalsPageState extends State<PropertyDetalsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalhes da propriedade'),
      ),
      body: const Center(
        child: Text('Property Details'),
      ),
    );
  }
}
