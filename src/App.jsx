import { h, Component } from 'preact';
// import {useState} from 'preact/hooks'
import _ from 'lodash'
import Select from './components/Select.jsx'
import TextInput from './components/Input.jsx'

import './style.scss'

const debounceTime = 300

class App extends Component {
    constructor() {
        super()

        this.debouncedHandle = _.debounce(this.handle, debounceTime).bind(this) // this.debouncedHandle.bind(this)
        this.reset = this.reset.bind(this)

        this.state = { updateIndex: 0 }
    }

    handle(e) {
        const {filter} = this.props.filterInfo
        console.log( filter(e, false) )
    }
    reset() { 
        const {filter} = this.props.filterInfo

        filter({}, true); 
        this.setState(
            (state) => ({'updateIndex': state.updateIndex + 1})
        ) 
    }

    render() { 
        const {updateIndex} = this.state
        const {areas, difficulties} = this.props.filterInfo

        return (
            <div id="__filter_container">
                <TextInput key={'title' + updateIndex} criteria="title" onUpdate={this.debouncedHandle}/>
                <Select key={'area' + updateIndex}  criteria="area" onUpdate={this.debouncedHandle} options={areas.map(a => ({value: a, text: a}))} />
                <Select key={'difficulty' + updateIndex}  criteria="difficulty" onUpdate={this.debouncedHandle} options={difficulties.map(a => ({value: a, text: a}))} />
                
                <button type="button" onClick={this.reset}>Reset</button>
            </div>
        )
    }
}


export default App