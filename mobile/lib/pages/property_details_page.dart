import 'package:flutter/material.dart';

import '../widgets/widgets.dart';

import 'pages.dart';

class PropertyDetailsPage extends StatefulWidget {
  final String propertyId;
  const PropertyDetailsPage({Key? key, required this.propertyId}) : super(key: key);

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
  void dispose() {
    controller.dispose();
    super.dispose();
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

          return SingleChildScrollView(
            physics: const ScrollPhysics(),
            child: Padding(
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
                  Text('Alarmes', style: theme.textTheme.headline6),
                  ListView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: controller.alarms.length,
                    itemBuilder: (BuildContext context, int index) {
                      return AlarmWidget(index: index + 1, alarm: controller.alarms[index]);
                    },
                  )
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
