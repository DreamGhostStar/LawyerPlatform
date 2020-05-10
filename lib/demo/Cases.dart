import 'package:flutter/material.dart';
//这是案件页面

class Cases extends StatefulWidget{
  @override
  _CasesState createState()=>_CasesState();
}

class _CasesState extends State<Cases>{
  List<String> _label = ['全部','在办','归档','结案'];
  String _choice = '全部';
  @override
  Widget build(BuildContext context){
    return Scaffold(
      body:Theme(
        data: Theme.of(context).copyWith(
          primaryColor:Colors.grey,
        ), 
        child: Container(
          padding: EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              SizedBox(height: 20,),            
              TextField(
                decoration: InputDecoration(
                  icon: Icon(Icons.search),
                  hintText: '输入关键词，搜索案件',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(20)),
                  ),
                ),
              ),
              SizedBox(height: 10,),
              Wrap(
                spacing: 30,
                children: _label.map(
                  (tag){
                    return ChoiceChip(
                      labelStyle: TextStyle(color:Colors.black),
                      selectedColor: Colors.orange[200],
                      // shape: ,
                      label: Text(tag),
                      selected: _choice==tag,
                      onSelected: (value){
                        setState(() {
                          _choice=tag;
                        });
                      },
                    );
                  }
                ).toList(),
              ),
              Divider(height: 6,color: Colors.black,),
            ],
          ),
        ),
      ), 
    );
  }
}