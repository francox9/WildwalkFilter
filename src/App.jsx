import { h, Component } from 'preact';
// import {useState} from 'preact/hooks'
import _ from 'lodash'
import Select from './components/Select.jsx'
import TextInput from './components/Input.jsx'

import filter, {areas, difficulties} from './filter'
import './style.scss'

const debounceTime = 300

class App extends Component {
    constructor() {
        super()

        this.debouncedHandle = _.debounce(this.handle, debounceTime).bind(this) // this.debouncedHandle.bind(this)
        this.reset = this.reset.bind(this)

        this.state = {
            updateIndex: 0
        }
    }
    handle(e) {
        console.log( filter(e, false) )
    }
    reset() { 
        filter({}, true); 
        this.setState(
            (state) => ({'updateIndex': state.updateIndex + 1})
        ) 
    }

    render() {
        const {debouncedHandle, reset} = this
        const {updateIndex} = this.state
        return (
            <div id="__filter_container">
                <TextInput key={'title' + updateIndex} criteria="title" onUpdate={debouncedHandle}/>
                <Select key={'area' + updateIndex}  criteria="area" onUpdate={debouncedHandle} options={areas.map(a => ({value: a, text: a}))} />
                <Select key={'difficulty' + updateIndex}  criteria="difficulty" onUpdate={debouncedHandle} options={difficulties.map(a => ({value: a, text: a}))} />
                
                <button type="button" onClick={reset}>Reset {updateIndex}</button>
            </div>
        )
    }
}


export default App