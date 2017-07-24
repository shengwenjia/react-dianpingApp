import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class BuyAndStore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const isStore = this.props.isStore
        const buyHandle = this.props.buyHandle
        const storeHandle = this.props.storeHandle

        return (
            <div className="buy-store-container clear-fix">
                <div className="item-container float-left">
                    {
                        isStore 
                        ? <button className="selected" onClick={storeHandle.bind(this)} >已收藏</button>
                        : <button  onClick={storeHandle.bind(this)} >收藏</button>
                    }
                </div>
               <div className="item-container float-right">
                    <button type="button" onClick={buyHandle.bind(this)}>购买</button>
               </div>          
            </div>
        )
    }
}

export default  BuyAndStore