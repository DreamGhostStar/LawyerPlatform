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

class _CasesState extends State<Cases> {
  // List<String> _label = ['全部', '在办', '归档']; //获取案件列表要用的参数
  bool showMoreLoading = false; //上拉加载状态
  ScrollController _scrollController = ScrollController();
  List<CaseItem> _caseList = [];
  // bool isall;
  // String caseStatus;

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
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

  // String _choice = '全部';
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 3,
        child: Scaffold(
            backgroundColor: Colors.grey[100],
            appBar: AppBar(
              title: SearchBox(
                hintTEXT: '搜索案件',
              ),
              centerTitle: true,
              bottom: TabBar(
                tabs: [Text('全部'), Text('在办'), Text('归档')],
                isScrollable: true,
              ),
            ),
            body: RefreshIndicator(
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
                      );
                    }
                  }),
            )));
  }
}
