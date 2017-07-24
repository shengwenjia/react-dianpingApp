import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'

import BuyAndStore from '../../../components/BuyAndStore'

import * as storeActionsFromOtherFile  from '../../../actions/store'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            isStore: false
        }
    }
    componentDidMount() {
        // 验证当前商品是否被收藏
        this.checkStoreState()
    }

    // 购买处理         
    buyHandle(){
        const loginFlag = this.loginCheck()
        if(!loginFlag){
            return
        }

        // 购买流程
        // ...这里购买流程暂不处理

        // 跳转到用户主页
        hashHistory.push('/User')

    }

    // 收藏处理
    storeHandle(){
        const loginFlag = this.loginCheck()
        const id = this.props.id
        const add = this.props.storeActions.add
        const rm = this.props.storeActions.rm
        if(!loginFlag){
            return
        }
        if(this.state.isStore){
            rm({id: id})
        }else{
            add({id: id})
        }

        this.setState({
            isStore: !this.state.isStore
        })
        

    }
    // 检验当前商品是否已经被收藏
    checkStoreState(){
        const store = this.props.store
        const id = this.props.id
        store.some((item) => {
            if(item.id === id){
                this.setState({
                    isStore: true
                })
                // 跳出循环
                return true
            }
        })
    }

    loginCheck(){
        const id = this.props.id
        const username = this.props.userinfo.username
        if(username){
            return true
        }else{
            //这里要保证用户登录之后还要跳转到当前页面：商品详情页面，以此确保用户继续购买
            hashHistory.push('/Login/' + encodeURIComponent('/detail/'+ id) )
            return false
        }
    }

    render() {
        
        return (
            <div>
                <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)} />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}
function mapDispatchToProps(dispatch){
    return　{
        storeActions: bindActionCreators(storeActionsFromOtherFile, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Buy) 