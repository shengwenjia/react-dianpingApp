import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'

import * as userInfoActionsFromOtherFile  from '../../actions/userinfo'

import Header from '../../components/Header'
import LoginComponent from '../../components/Login'
import './style.less'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            checking: false
        }
    }
    componentDidMount(){
        this.doCheck()
    }
    doCheck(){
        const userinfo = this.props.userinfo
        if(userinfo.username){
            // 已经登录
            // 跳转界面
            this.goUserPage()
        }else{
            // 没有登录
            this.setState({
                checking: false
            })
        }
    }
    goUserPage(){
        hashHistory.push('/User')
    }

    loginHandle(username){
        // 登录之后处理函数，须由container传入coomponent中
        // 保存用户名
        const actions = this.props.userInfoActions
        let userinfo = this.props.userinfo
        userinfo.username = username
        actions.update(userinfo)   //这里是将整个userinfo参数传进去，而不是单个username

        // 跳转界面
        const router = this.props.params.router
        if(router){
            // 跳转到指定页面
            hashHistory.push(router)
        }else{
            // 跳转到默认页面：用户界面
            this.goUserPage()
        }
    }
    render() {
       
        return (
            <div>
                <Header title="登录" />
                <LoginComponent loginHandle={this.loginHandle.bind(this)} />
                {
                    // this.state.checking ?  :  <
                }
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        userinfo : state.userinfo
    }
}

function mapDispatchToProps (dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)