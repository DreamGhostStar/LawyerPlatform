import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:lawyerplatform/components/case_item.dart';
import 'package:lawyerplatform/components/search_box.dart';
import 'package:lawyerplatform/model/case_list.dart';
//这是案件页面

class Cases extends StatefulWidget {
  @override
  _CasesState createState() => _CasesState();
}

class _CasesState extends State<Cases> with TickerProviderStateMixin {
  bool showMoreLoading = false; //上拉加载状态
  ScrollController _scrollController = ScrollController();
  TabController _tabController;
  List<CaseItem> _caseList = [];

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _scrollController.addListener(() {
      if (_scrollController.position.pixels ==
          _scrollController.position.maxScrollExtent) {
        _loadData();
      }
    });
    _loadData();
  }

  // 加载中状态框
  Widget _buildProgressIndicator() {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Center(
        child: Opacity(
          opacity: showMoreLoading ? 1.0 : 0.0,
          child: CircularProgressIndicator(),
        ),
      ),
    );
  }

  // 加载更多数据
  Future<Null> _loadData() async {
    setState(() {
      showMoreLoading = true;
    });
    await Future.delayed(Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _caseList.addAll(newCaseList);
          showMoreLoading = false;
        });
      }
    });
  }

  // 下拉刷新，请求下一页的数据
  Future<Null> _refresh() async {
    await Future.delayed(Duration(seconds: 2), () {
      _caseList.clear(); // 清除当前状态数据
      setState(() {
        _caseList.addAll(caseListModel);
      });
      Fluttertoast.showToast(
          msg: '刷新成功',
          backgroundColor: Colors.grey[300],
          textColor: Colors.lightBlueAccent);
    });
    return;
  }

  List<Widget> _tabs = [
    Container(child: Text('全部')),
    Container(child: Text('在办')),
    Container(child: Text('归档'))
  ];

  _caseListDemo(int id) {
    //id为案件状态，0为全部，1为在办，2为归档
    return RefreshIndicator(
      onRefresh: _refresh,
      displacement: 40,
      child: ListView.builder(
          shrinkWrap: true,
          controller: _scrollController,
          itemCount: _caseList.length + 1,
          itemBuilder: (context, index) {
            if (index == _caseList.length) {
              return _buildProgressIndicator();
            } else {
              return CaseItems(
                name: _caseList[index].name,
                hostname: _caseList[index].host.name,
                hostphone: _caseList[index].host.phone,
                type: _caseList[index].type,
              );
            }
          }),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[100],
        appBar: AppBar(
          title: SearchBox(
            hintTEXT: '搜索案件',
          ),
          centerTitle: true,
          bottom: TabBar(
            controller: _tabController,
            tabs: _tabs,
            isScrollable: true,
          ),
        ),
        body: TabBarView(controller: _tabController, children: [
          _caseListDemo(0),
          _caseListDemo(1),
          _caseListDemo(2),
        ]));
  }
}
