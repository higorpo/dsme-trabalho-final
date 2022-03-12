// ignore_for_file: use_key_in_widget_constructors

import 'package:flutter/material.dart';

import 'pages.dart';

class PropertyDetailsPage extends StatefulWidget {
  final String propertyId;
  const PropertyDetailsPage({required this.propertyId});

  @override
  _PropertyDetailsPageState createState() => _PropertyDetailsPageState();
}

class _PropertyDetailsPageState extends State<PropertyDetailsPage> {
  final controller = PropertyDetailsController();

  @override
  void initState() {
    controller.getProperty(widget.propertyId);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalhes da propriedade'),
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

          final property = controller.property!;
          final theme = Theme.of(context);

          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Informações da propriedade', style: theme.textTheme.headline6),
                ListTile(
                  title: const Text('Endereço'),
                  subtitle: Text(property.address),
                ),
                ListTile(
                  title: const Text('Proprietário'),
                  subtitle: Text(property.ownerName),
                ),
                ListTile(
                  title: const Text('Telefone de contato'),
                  subtitle: Text(property.ownerPhone),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
