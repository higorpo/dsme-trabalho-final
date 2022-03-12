import 'package:flutter/material.dart';

import 'pages.dart';

class AlarmActivitiesPage extends StatefulWidget {
  final String alarmId;

  const AlarmActivitiesPage({Key? key, required this.alarmId}) : super(key: key);

  @override
  _AlarmActivitiesPageState createState() => _AlarmActivitiesPageState();
}

class _AlarmActivitiesPageState extends State<AlarmActivitiesPage> {
  final controller = AlarmActivitiesController();

  @override
  void initState() {
    controller.getActivities(widget.alarmId);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Atividades do alarme'),
      ),
      body: AnimatedBuilder(
        animation: controller,
        builder: (context, _) {
          return SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  const Text('Aqui serão exibidos os logs de movimento do alarme em tempo real.'),
                  const SizedBox(height: 20),
                  if (controller.activities.isEmpty) const Text('Aguardando mensagens...'),
                  ListView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: controller.activities.length,
                    itemBuilder: (BuildContext context, int index) {
                      return Card(
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(controller.activities[index]),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
