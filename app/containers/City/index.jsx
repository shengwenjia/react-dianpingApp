import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as userInfoActionsFromOtherFile  from '../../actions/userinfo'

import { CITYNAME } from '../../config/localStoreKey'
import localStore from '../../util/localStore'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    changeCity(newCity){
        if(newCity){
            // 将城市信息重新存储到redux中

            this.props.userInfoActions.update({
                cityName: newCity
            })
            // 修改localStorage
            localStore.setItem(CITYNAME, newCity)
            // 跳转到首页
            hashHistory.push('/')
        }
        
    }
    render() {
        return (
            <div>
                <Header title="选择城市"  />
                <CurrentCity cityName={this.props.userinfo.cityName} />
                <CityList changeFn={this.changeCity.bind(this)} />
            </div>
        )
    }
}

function mapStateToProps(state){
    return({
            userinfo: state.userinfo
        })
}
function mapDispatchToProps(dispatch){
    return({
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(City)
