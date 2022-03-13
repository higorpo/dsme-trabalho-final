import 'package:flutter/material.dart';

import 'pages/pages.dart';

void main() {
  runApp(const SecuritySystem());
}

class SecuritySystem extends StatelessWidget {
  const SecuritySystem({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SecuritySystem',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomePage(),
    );
  }
}
