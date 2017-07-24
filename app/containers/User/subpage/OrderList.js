import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getOrderListData, postCommentData} from '../../../fetch/user/orderlist'

import OrderListComponent from '../../../components/OrderList'
import './style.less'
class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            orderList: []
        }
    }
    componentDidMount(){
        // const username = this.props.username
        const username = 15021930952
        if(username){
            // 获取订单信息
            const result = getOrderListData(username)        
            result.then((res) => {
                return res.json()
            }).then((json) =>{
                this.setState({
                    orderList: json
                })
            })
        }     
    }
    submitComment(id, value, callback){
        postCommentData(id,value).then((res) =>{
            return res.json()
        }).then((json) =>{
            if(json.errno === 0){
                // 已经评价，修改状态
                callback()
            }else{
                // 评价失败

            }
        })
    }
    render() {
        
        return (
            <div className='order-list-container'>
                <h2>您的订单</h2>
                <OrderListComponent data={this.state.orderList} submitComment={this.submitComment.bind(this)} />
            </div>
        )
    }
}

export default  OrderList