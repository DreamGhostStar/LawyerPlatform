import 'package:flutter/material.dart';
//这是案件页面

class Cases extends StatefulWidget{
  @override
  _CasesState createState()=>_CasesState();
}

class _CasesState extends State<Cases>{
  @override
  Widget build(BuildContext context){
    return Scaffold(
      // appBar: AppBar(
      //   iconTheme: IconThemeData(
      //     color:Colors.black
      //   ),
      //   actions: <Widget>[
      //     Icon(Icons.search),
      //   ],
      //   leading: Builder(
      //     builder: (BuildContext context) {
      //       return IconButton(
      //         icon: const Icon(Icons.note_add),
      //         onPressed: () {},
      //         tooltip: '新建案件',
      //       );
      //     },
      //   ),
      // ),
      body: Container(
        padding: EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            SizedBox(height: 20,),
            Row(
              children: <Widget>[
                IconButton(
                  icon: const Icon(Icons.note_add),
                  onPressed: () {},
                  tooltip: '新建案件',
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,

              children: <Widget>[
                ChoiceChip(
                  label: Text('全部'),
                  selected:true,
                )
              ],
            ),
            Divider(),
          ],
        ),
      )
    );
  }
}