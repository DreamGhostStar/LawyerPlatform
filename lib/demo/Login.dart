import 'package:flutter/material.dart';
import '../main.dart';
//这是登录页面

class FormDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 1,
        title:Text('FormDemo'),
      ),
      body: Theme(
        data:Theme.of(context).copyWith(     //覆盖主题
          primaryColor:Colors.black
        ),
        child: Container(
          padding: EdgeInsets.all(30),
          child: Column(
            mainAxisAlignment:MainAxisAlignment.center,
            children:<Widget>[
              RegisterForm(),
            ]
          ),
        ),
      ),
    );
  }
}

class RegisterForm extends StatefulWidget {
  @override
  _RegisterFormState createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  final registerFormKey=GlobalKey<FormState>();
  String username,password;
  bool autovalidate = false;

  String validateUsername(value){
    if(value.isEmpty){
      return 'Username is required.';
    }
    return null;
  }
  String validatePassword(value){
    if(value.isEmpty){
      return 'Password is required.';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Form(         //表单
      key: registerFormKey,
      child: Column(
        children:<Widget>[
          TextFormField(
            decoration: InputDecoration(
              labelText: 'Username',
              helperText: 'Input username'
            ),
            onSaved: (value){
              username=value;
            },
            validator: validateUsername,  //验证表单数据
            //autovalidate: true,       // 自动验证
            autovalidate: autovalidate,  //自定义的自动验证
            //先让autovalidate默认为false,按下按钮后，再变成true
            //即按下按钮前不会自动验证
          ),
          TextFormField(
            obscureText: true,
            decoration: InputDecoration(
              labelText: 'Password',
              helperText: 'Input password'
            ),
            onSaved: (value){
              password=value;
            },
            validator: validatePassword,
            autovalidate: autovalidate,
          ),
          SizedBox(
            height: 30,
          ),
          Container(
            width: double.infinity,  //宽度与上面的部件对齐
            child: RaisedButton(
              child: Text('Register',style:TextStyle(color: Colors.white)),
              color:Colors.blueAccent[700],
              elevation: 1,
              onPressed: (){
                if (registerFormKey.currentState.validate()) {
                  registerFormKey.currentState.save();                
                  debugPrint('username:$username');
                  debugPrint('password:$password');
                  Scaffold.of(context).showSnackBar( //找到最近的scaffold并执行
                    SnackBar(           //在底部弹出提示栏
                      content: Text(
                        'Registering...',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize:15,
                        ),
                      ),
                      backgroundColor: Colors.blueAccent[400],
                    )
                  );
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder:(BuildContext context)=>GeneralFramework()
                    )
                  );

                } else {
                  setState(() {
                    autovalidate = true;
                  });
                }               
              },
            ),
          )
        ],
      ),
    );
  }
}