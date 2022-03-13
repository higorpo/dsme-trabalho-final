import 'package:flutter/material.dart';

import '../widgets/widgets.dart';

import 'pages.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final controller = HomeController();

  @override
  void initState() {
    controller.getProperties();
    super.initState();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SecuritySystem'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => controller.getProperties(),
          ),
        ],
      ),
      body: AnimatedBuilder(
        animation: controller,
        builder: (context, _) {
          if (controller.loading) {
            return const Center(child: CircularProgressIndicator());
          }

          if (controller.errorMessage != null && controller.errorMessage!.isNotEmpty) {
            return Center(
              child: Text(controller.errorMessage!),
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.all(8),
            itemCount: controller.properties.length,
            itemBuilder: (BuildContext context, int index) {
              final property = controller.properties[index];
              return PropertyWidget(property: property);
            },
          );
        },
      ),
    );
  }
}
