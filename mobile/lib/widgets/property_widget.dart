import 'package:flutter/material.dart';

import '../services/services.dart';

import '../pages/pages.dart';

class PropertyWidget extends StatelessWidget {
  final Property property;

  const PropertyWidget({
    Key? key,
    required this.property,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          ListTile(
            leading: const Icon(Icons.house),
            title: Text(property.address),
            subtitle: Text('${property.ownerName} - ${property.ownerPhone}'),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              TextButton(
                child: const Text('VERIFICAR'),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => PropertyDetailsPage(
                        propertyId: property.id,
                      ),
                    ),
                  );
                },
              ),
              const SizedBox(width: 8),
            ],
          ),
        ],
      ),
    );
  }
}
