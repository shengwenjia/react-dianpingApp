import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getCommentData} from '../../../fetch/detail/detail'

import CommentList from '../../../components/CommentList'
import './style.less'

class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            comment: false
        }
    }
    componentDidMount(){
        var result = getCommentData(0,this.props.id)
        result.then((res) => {
            return res.json()
        }).then((json) => {
            this.setState({
                comment: json
            })
        })
    }
    render() {
        
        return (
            <div>
                {
                    this.state.comment ? <CommentList data={this.state.comment} /> : <div>...</div>
                }
            </div>
        )
    }
}


export default Comment