import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {getAdData} from '../../../fetch/home/home'

import HomeAd from '../../../components/HomeAd'
import './style.less'

class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
        	data: []
        }
    }
    componentDidMount(){
    	const result = getAdData() 	
    	// console.log(result)
    	result.then((res) => {
    		return res.json()    //必须要加return
    	}).then((json) => {		
    		const data = json
    		if(data.length){
    			this.setState({
    				data: data
    			})
    		}
    	})
    }

    render() {
        return (
            <div>
            	{
            		this.state.data ? <HomeAd data={this.state.data}/> : <div>...</div>
            	}
            </div>
        )
    }
}


export default  Ad