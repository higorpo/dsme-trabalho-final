import 'package:flutter/material.dart';

import '../services/services.dart';

class AlarmWidget extends StatefulWidget {
  final int index;
  final Alarm alarm;

  const AlarmWidget({
    Key? key,
    required this.index,
    required this.alarm,
  }) : super(key: key);

  @override
  State<AlarmWidget> createState() => _AlarmWidgetState();
}

class _AlarmWidgetState extends State<AlarmWidget> {
  bool isActivated = false;

  @override
  void initState() {
    setState(() {
      isActivated = widget.alarm.isActivated;
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          ListTile(
            title: Text('Alarme ${widget.index}'),
            subtitle: Text(widget.alarm.id),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              TextButton(
                child: Text(isActivated ? 'DESATIVAR' : 'ATIVAR'),
                onPressed: toggleAlarmStatus,
              ),
              const SizedBox(width: 8),
              TextButton(
                child: const Text('VER ATIVIDADE'),
                onPressed: () {},
              ),
              const SizedBox(width: 8),
            ],
          ),
        ],
      ),
    );
  }

  void toggleAlarmStatus() {
    Alarms().updateAlarmStatus(widget.alarm.id, !isActivated);

    setState(() {
      isActivated = !isActivated;
    });
  }
}
