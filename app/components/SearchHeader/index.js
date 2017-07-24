import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link, hashHistory} from 'react-router'
import './style.less'

import SearchInput from '../SearchInput' 

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }
    enterHandle(value){
        hashHistory.push('/search/all/' + encodeURIComponent(value))
    }
    ClickHandle(){
        window.history.back()
    }
    render() {
        return (
            <div id="search-header" className="clear-fix">
                <div>
                    <span className="back-icon float-left" onClick={this.ClickHandle.bind(this)} >
                        <i className="icon-chevron-left"></i>
                    </span>                  
                </div>
               
                <div className="input-container">                
                    <i className="icon-search"></i>
                    <SearchInput value={this.props.keyword} enterHandle={this.enterHandle.bind(this)} />                  
                </div>
            </div>
        )
    }
}


export default SearchHeader