import 'package:flutter/material.dart';
import 'package:r_calendar/r_calendar.dart'; //日历插件库

class SchedulePage extends StatefulWidget {
  @override
  _SchedulePageState createState() => _SchedulePageState();
}

//主体布局
class _SchedulePageState extends State<SchedulePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.blue,
          //左上菜单组件
          leading: PopupMenuButton<String>(
            padding: const EdgeInsets.only(left: 10, right: 20),
            tooltip: '提示',
            itemBuilder: (context) {
              return <PopupMenuEntry<String>>[
                PopupMenuItem<String>(
                  value: '月视图',
                  child: Row(
                    children: <Widget>[
                      Icon(
                        Icons.calendar_today,
                        color: Colors.black,
                      ),
                      Text('    月视图'),
                    ],
                  ),
                ),
                PopupMenuItem<String>(
                  value: '待办清单',
                  child: Row(
                    children: <Widget>[
                      Icon(
                        Icons.list,
                        color: Colors.black,
                      ),
                      Text('    待办清单'),
                    ],
                  ),
                ),
                PopupMenuItem<String>(
                  value: '分享',
                  child: Row(
                    children: <Widget>[
                      Icon(
                        Icons.share,
                        color: Colors.black,
                      ),
                      Text('    分享'),
                    ],
                  ),
                ),
              ];
            },
            onSelected: (value) {
              if (value == '月视图') {
                print('月视图');
              } else if (value == '待办清单')
                print('待办清单');
              else
                print('分享');
            },
            onCanceled: () {
              //print('onCanceled');
            },
            shape: RoundedRectangleBorder(
                side: BorderSide(), borderRadius: BorderRadius.circular(10)),
          ),
        ),
        body: Container(
          margin: EdgeInsets.symmetric(
            horizontal: 2.0,
            vertical: 10.0,
          ),
          child: Column(
            //mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              RCalenderPage(), //日历
              Divider(
                height: 50.0,
                color: Colors.grey,
              ),
              Text(
                '没有日程，放松一下',
                textScaleFactor: 1.5,
              ),
              Text(
                '想记点什么，点击+号按钮写下来',
                style: TextStyle(
                  color: Colors.grey,
                ),
              ),
            ],
          ),
        ),
        //悬浮加号按钮(和body同级别)
        floatingActionButton: new FloatingActionButton(
          onPressed: () {
            showModalBottomSheet(
              context: context,
              builder: (BuildContext context) {
                return GestureDetector(
                  child: Container(
                    height: 2000.0,
                    color: Colors.white,
                    child: Column(
                      children: <Widget>[
                        new Container(
                          color: Colors.grey,
                          padding: EdgeInsets.only(
                              left: 16, top: 8, bottom: 8, right: 16),
                          child: Container(
                            decoration: BoxDecoration(color: Colors.white),
                            child: TextField(
                              //controller: controller,
                              autofocus: true,
                              style: TextStyle(fontSize: 16),
                              //设置键盘按钮为发送
                              /*textInputAction: TextInputAction.send,
                                keyboardType: TextInputType.multiline,
                                onEditingComplete: () {
                                  //点击发送调用
                                  print('onEditingComplete');
                                  onEditingCompleteText(controller.text);
                                  Navigator.pop(context);
                                },*/
                              decoration: InputDecoration(
                                hintText: '请输入评论的内容',
                                isDense: true,
                                contentPadding: EdgeInsets.only(
                                    left: 10, top: 5, bottom: 5, right: 10),
                                border: const OutlineInputBorder(
                                  gapPadding: 0,
                                  borderSide: BorderSide(
                                    width: 0,
                                    style: BorderStyle.none,
                                  ),
                                ),
                              ),
                              minLines: 1,
                              maxLines: 5,
                            ),
                          ),
                        ),
                        RaisedButton(
                          onPressed: () {},
                          child: Text(
                            '保存',
                            style: TextStyle(
                              color: Colors.white,
                            ),
                            textScaleFactor: 1.5,
                          ),
                          color: Colors.orange,
                        ),
                      ],
                    ),
                  ),
                  onTap: () => false,
                );
              },
            );
          },
          tooltip: 'Increment',
          child: new Icon(Icons.add),
          backgroundColor: Colors.orange,
        ));
  }
}

//日历类
class RCalenderPage extends StatefulWidget {
  @override
  _RCalenderPageState createState() => _RCalenderPageState();
}

class _RCalenderPageState extends State<RCalenderPage> {
  RCalendarController controller;
  @override
  void initState() {
    super.initState();
    controller = RCalendarController.single(
      selectedDate: DateTime.now(),
      isAutoSelect: true,
      mode: RCalendarMode.week,
    );
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return RCalendarWidget(
      controller: controller,
      customWidget: DefaultRCalendarCustomWidget(),
      firstDate: DateTime(1970, 1, 1), //当前日历的最小日期
      lastDate: DateTime(2055, 12, 31), //当前日历的最大日期
    );
  }
}
