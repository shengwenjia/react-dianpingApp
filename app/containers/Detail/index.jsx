import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import Info from './subpage/info'
import Buy from './subpage/buy'
import Comment from './subpage/Comment'
class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const id = this.props.params.id
        return (
            <div>
                <Header title="商品详情"/>
                <Info id={id} />
                <Buy id={id} />
                <Comment id={id}/>
            </div>
        )
    }
}

export default  Detail