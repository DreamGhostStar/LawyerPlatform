import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:lawyerplatform/components/case_item.dart';
import 'package:lawyerplatform/components/case_list_skeleton.dart';
import 'package:lawyerplatform/components/search_box.dart';
import 'package:lawyerplatform/model/base_user_info.dart';
import 'package:lawyerplatform/model/case_list.dart';
import 'package:lawyerplatform/page/search_case.dart';
//这是案件页面

class Cases extends StatefulWidget {
  @override
  _CasesState createState() => _CasesState();
}

//分页显示
//一页渲染20条
class _CasesState extends State<Cases> with TickerProviderStateMixin {
  int page = 1; //页码，自增
  bool showMoreLoading = false; //上拉加载状态
  ScrollController _scrollController = ScrollController();
  TabController _tabController;
  List<CaseListItem> _caseList = [];

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
          child: CaseListSkeleton(),
        ),
      ),
    );
  }

  // 加载更多数据
  Future<Null> _loadData() async {
    setState(() {
      showMoreLoading = true;
    });
    await Future.delayed(Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          _caseList.addAll(caseListModel); //申请下一页的数据
          showMoreLoading = false;
        });
      }
    });
  }

  // 下拉刷新
  Future<Null> _refresh() async {
    await Future.delayed(Duration(seconds: 2), () {
      _caseList.clear(); // 清除当前状态数据
      setState(() {
        _caseList.addAll(caseListModel); //申请展示第一页的数据
      });
      Fluttertoast.showToast(
          msg: '刷新成功',
          backgroundColor: Colors.grey[300],
          textColor: Colors.lightBlueAccent);
    });
    return;
  }

  List<Widget> _tabs = [
    Container(child: Text('全部', style: TextStyle(fontWeight: FontWeight.bold))),
    Container(child: Text('在办', style: TextStyle(fontWeight: FontWeight.bold))),
    Container(child: Text('归档', style: TextStyle(fontWeight: FontWeight.bold)))
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
                audit: _caseList[index].audit,
                caseid: _caseList[index].id,
              );
            }
          }),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[100],
        appBar: PreferredSize(
            child: AppBar(
              title: GestureDetector(
                child: SearchBox(
                  hintTEXT: ' 搜 索 案 件',
                ),
                onTap: () {
                  if (user == null) {
                    Fluttertoast.showToast(msg: '请先登录');
                  } else {
                    Navigator.of(context).push(
                        MaterialPageRoute(builder: (context) => SearchCase()));
                  }
                },
              ),
              automaticallyImplyLeading: false,
              centerTitle: true,
              bottom: TabBar(
                controller: _tabController,
                tabs: _tabs,
                unselectedLabelColor: Colors.grey,
              ),
            ),
            preferredSize: Size.fromHeight(85)),
        body: TabBarView(controller: _tabController, children: [
          _caseListDemo(0),
          _caseListDemo(1),
          _caseListDemo(2),
        ]));
  }
}
