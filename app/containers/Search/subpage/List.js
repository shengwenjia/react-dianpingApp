import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import {getSearchData} from '../../../fetch/search/search'

import HomeList from '../../../components/HomeList'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            page: 0,
        }
    }
    componentDidMount(){ 
        this.loadFirstPageData()
    }
    componentDidUpdate(prevProps, prevState){
        const category = this.props.category
        const keyword = this.props.keyword 
        
        if (keyword === prevProps.keyword && category === prevProps.category) {
            
            return
        }

        // this.setState()
        // this.loadFirstPageData()
    }

    loadFirstPageData(){
        const cityName = this.props.userinfo.cityName
        const category = this.props.category
        const keyword = this.props.keyword || ''
        const result = getSearchData(0, cityName, category, keyword)
        this.resultHandle(result)
    }

    resultHandle(result){
        const page = this.state.page
        this.setState({
            page: page+1
        })

        result.then((res) => {
            return res.json()
        }).then((json) => {
            const data = json.data
            this.setState({
                data: this.state.data.concat(data)
            })
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.data.length ? <HomeList data={this.state.data} /> : <div>...</div>
                }
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(List)