import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import Header from '../../components/Header'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
        // const username = this.props.userinfo.username
        // if(!username){
        //     hashHistory.push('/Login')
        // }
    }
    render() {
        const username = this.props.userinfo.username
        const cityname = this.props.userinfo.cityname
        return (
            <div>
                <Header title="用户主页" backRouter='/' />
                <UserInfo username={username} cityname={cityname} />
                <OrderList  username={username} />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch){
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)