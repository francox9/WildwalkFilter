import { h, Component } from 'preact';
import Select from './components/Select.jsx'
import TextInput from './components/Input.jsx'
import Range from './components/Range.jsx'
import { createContext } from "preact-context";

import './style.scss'


class App extends Component {
    constructor(props) {
        super(props)
        this.Select = props.withData(Select)
        this.TextInput = props.withData(TextInput)
        this.Range = props.withData(Range)
    }

    render() { 
        const {TextInput, Select, Range} = this

        return (
            <div id="__filter_container">
                <TextInput criteria="title" />
                <Select criteria="area" options="areas"/>
                {/* <Select criteria="difficulty" options="difficulties" />    
                <Select criteria="type" options="types"/>
                <Select criteria="transport" options="transports"/> */}

                <Range criteria="time" options="times" />
            </div>
        )
    }
}


export default App