import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {getListData} from '../../../fetch/home/home'
import  HomeList from '../../../components/HomeList'
// import LoadMore from '../../../components/LoadMore'
import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
        	data: [],
        	hasMore: false
        }
    }
    componentDidMount(){
    	this.loadFirstPageData()
    }
    loadFirstPageData(){
    	const cityName = this.props.cityName
    	const result = getListData(cityName,0)
    	this.resultHandle(result)
    }
    resultHandle(result){
    	result.then((res) => {
    		return res.json()
    	}).then((json) => {
    		// console.log(json)
    		const data = json.data
    		const hasMore = json.hasMore 
    		if(data.length){
    			this.setState({
    				data: data,
    				hasMore: hasMore
    			})
    		}
    	})
    }
    render() {
        return (
            <div>
            	<h2 className="home-list-title">猜你喜欢</h2>
            	{
            		this.state.data ? <HomeList data={this.state.data}/> : <div>...</div>
            	}
            	
            </div>
        )
    }
}


export default  List