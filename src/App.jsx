import { h, Component } from 'preact';
import Select from './components/Select.jsx'
import TextInput from './components/Input.jsx'
import { createContext } from "preact-context";

import './style.scss'


class App extends Component {
    constructor(props) {
        super(props)
        this.Select = props.withData(Select)
        this.TextInput = props.withData(TextInput)
    }

    render() { 
        const {TextInput, Select} = this

        return (
            <div id="__filter_container">
                <TextInput criteria="title" />
                <Select criteria="area" />
                <Select criteria="difficulty"  />                
            </div>
        )
    }
}


export default App