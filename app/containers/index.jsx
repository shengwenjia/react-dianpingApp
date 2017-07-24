import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile  from '../actions/userinfo'

import localStore from '../util/localStore'
import {CITYNAME } from '../config/localStoreKey'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            initDone: false
        }
    }
    componentDidMount(){
        // 从localstorage中获取城市
        let cityName = localStore.getItem(CITYNAME)
        if(cityName == null){
            cityName = '北京'
        }

        // 将城市信息存储到redux中
        this.props.userInfoActions.update({
            cityName: cityName
        })

        this.setState({
            initDone: true
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.initDone ? this.props.children : <div>加载中...</div>
                }
               
            </div>
        )
    }
}

function mapStateToProps(state){
    return {}
}
function mapDispatchToProps(dispatch){
    return {
        userInfoActions:bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(App)
