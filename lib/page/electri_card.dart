import 'package:flutter/material.dart';
import 'package:lawyerplatform/components/basic_info.dart';
import 'package:lawyerplatform/model/electri_card_info.dart';

class ElectriCard extends StatefulWidget {
  ElectriCard({Key key}) : super(key: key);

  @override
  _ElectriCardState createState() => _ElectriCardState();
}

class _ElectriCardState extends State<ElectriCard> {
  bool _loading = false;
  ElectriCardInfo _electriCardInfo;

  Future<Null> _init() async {
    setState(() {
      _loading = true;
    });
    _electriCardInfo = electriCardInfoModel;
    Future.delayed(Duration(seconds: 2), () {
      setState(() {
        _loading = false;
      });
    });

    return;
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _init();
    print(electriCardInfoModel.name);
  }

  _childLayout() {
    if (_loading) {
      return Center(child: Container(child: CircularProgressIndicator()));
    } else {
      return ListView(
        children: [
          Container(
            margin: EdgeInsets.all(10),
            child: Card(
              elevation: 5,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10)),
              child: SizedBox(
                height: 190,
                child: Stack(
                  children: [
                    Container(
                      margin: EdgeInsets.only(top: 20, left: 30),
                      child: UserAvatar(
                          imageStyle: 70, avatar: _electriCardInfo.picture),
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 20, left: 120),
                      child: Text(
                        _electriCardInfo.name,
                        style: TextStyle(
                            fontFamily: 'title',
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 4),
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 55, left: 120),
                      child: Row(
                        children: [
                          Text(
                            '律师证号:',
                            style: TextStyle(fontSize: 12),
                          ),
                          Container(
                            width: 130,
                            child: Text(
                              _electriCardInfo.lawyerNumber,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(fontSize: 12),
                            ),
                          )
                        ],
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 100, left: 25),
                      child: Image.network(
                        _electriCardInfo.winxinCode,
                        width: 70,
                        height: 70,
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 90, left: 120),
                      child: Text(
                        _electriCardInfo.lawyerHouseName,
                        style: TextStyle(color: Colors.blue, fontSize: 17),
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 105, left: 120),
                      child: Divider(
                        color: Colors.black,
                        endIndent: 20,
                        thickness: 1.3,
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 120, left: 120),
                      padding: EdgeInsets.only(right: 10),
                      child: Text(
                        '地址:' + _electriCardInfo.lawyerHouseAddress,
                        style: TextStyle(fontSize: 13),
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 155, left: 120),
                      padding: EdgeInsets.only(right: 5),
                      child: Text(
                        '电话:' + _electriCardInfo.phone,
                        style: TextStyle(fontSize: 13),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          )
        ],
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[200],
        appBar: AppBar(
          title: Text('电子名片'),
        ),
        body: _childLayout());
  }
}
