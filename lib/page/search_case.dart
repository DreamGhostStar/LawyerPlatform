import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/util.dart';
import 'package:lawyerplatform/model/search_item.dart';

class SearchCase extends StatefulWidget {
  SearchCase({Key key}) : super(key: key);

  @override
  _SearchCaseState createState() => _SearchCaseState();
}

class _SearchCaseState extends State<SearchCase> {
  TextEditingController textEditingController = new TextEditingController();
  bool _loading = false;
  List<SearchItem> _list = [];

  Future<Null> _loadData(String value) async {
    setState(() {
      _loading = true;
    });
    Future.delayed(Duration(milliseconds: 2000), () {
      if (mounted) {
        setState(() {
          _list.addAll(searchListModel);
          _loading = false;
        });
      }
    });

    return;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Container(
          decoration: BoxDecoration(
              border: Border.all(color: Colors.grey[200], width: 1),
              color: Colors.grey[200],
              borderRadius: BorderRadius.all(Radius.circular(15))),
          alignment: Alignment.center,
          height: 35,
          padding: EdgeInsets.fromLTRB(10, 0, 0, 0),
          child: TextField(
            //搜索框
            onChanged: (value) {
              //TODO:有变化时就匹配信息
              _loadData(value);
            },
            controller: textEditingController,
            cursorColor: Colors.black,
            decoration: InputDecoration(
                border: InputBorder.none,
                icon: Icon(Icons.search),
                hintText: '搜索案件',
                hintStyle: TextStyle(fontSize: 16, color: Colors.grey)),
            style: TextStyle(fontSize: 16, color: Colors.black),
          ),
        ),
      ),
      body: _loading
          ? loadingWidget(_loading)
          : ListView.builder(
              itemCount: _list.length,
              itemBuilder: (BuildContext context, int index) {
                return InkWell(
                  child: Container(
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            width: 1,
                            color: Colors.grey,
                          ),
                        ),
                      ),
                      padding: EdgeInsets.all(10),
                      child: Row(
                        children: <Widget>[
                          Icon(Icons.find_in_page, size: 40),
                          SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                // Tag(
                                //   text: searchTagTexts[_list[index].type],
                                //   bgColor: Colors.grey,
                                //   fontSize: 12,
                                // ),
                                SizedBox(height: 5),
                                Text(
                                  _list[index].content,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ),
                          )
                        ],
                      )),
                );
              }),
    );
  }
}
