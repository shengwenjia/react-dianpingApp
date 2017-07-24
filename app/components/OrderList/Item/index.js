import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            commentState: 0

        }
    }
    componentDidMount(){
        // 每个订单的评价状态分为3种，这3种状态从后端数据中得到
        this.setState({
            commentState: this.props.data.commentState
        })
    }
    clickHandle(){
        this.setState({
            commentState: 1
        })

    }
    submitComment(){      
        const submitComment = this.props.submitComment
        const id = this.props.data.id
        const value = this.refs.commentText.value.trim()
        // 以防万一 输入框中没有内容
        if(!value){
            return
        }
        submitComment(id, value, this.commentOk.bind(this))
    }
    commentOk(){
        this.setState({
            commentState: 2
        })
    }
    hideComment(){
        this.setState({
            commentState: 0
        })
    }
    render() {
        const data = this.props.data
        return (
            <div className="clear-fix order-item-container">              
                <div className="order-item-img float-left">
                    <img src={data.img}/>
                </div>
                <div className="order-item-comment float-right">
                    {
                        this.state.commentState === 0 //未评价
                        ? <button className="btn" onClick={this.clickHandle.bind(this)} >评价</button>
                        :  
                            this.state.commentState === 1 //评价中
                            ? ''
                            : <button className="btn unselected-btn">已评价</button>  
                    }
                    
                </div>
                <div className="order-item-content">
                    <span>商户：{data.title}</span>
                    <span>数量：{data.count}</span>
                    <span>价格：￥{data.price}</span>
                </div>
                {
                     // “评价中”才会显示输入框
                    this.state.commentState === 1
                    ? <div className="comment-text-container">
                        <textarea style={{width: '100%', height: '80px'}} className="comment-text" ref="commentText"></textarea>
                        <button className="btn" onClick={this.submitComment.bind(this)}>提交</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn unseleted-btn" onClick={this.hideComment.bind(this)}>取消</button>
                    </div>
                    : ''
                }
            </div>
        )
    }
}

export default  Item