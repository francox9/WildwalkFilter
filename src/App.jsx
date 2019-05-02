import { h, Component } from 'preact';
import Select from './components/Select.jsx'
import TextInput from './components/Input.jsx'
import Range from './components/Range.jsx'
import {uniqBy, uniq} from './utils'
// import { createContext } from "preact-context";

import { observer, inject, connect } from "mobx-preact";
import { observable, action, autorun, computed } from "mobx";


import './style.scss'

// import { observable, action } from 'mobx';
// import { observer, Provider, inject, connect } from 'mobx-preact';

@inject('store')
@observer
class App extends Component {
    constructor(props) {
        super(props)
        // this.Select = props.withData(Select)
        // this.TextInput = props.withData(TextInput)
        // this.Range = props.withData(Range)
    }

    render({store}) { 
        const {areas, difficulties, types, transports, routes, times: rawTimes, lengths: rawLengths} = this.props.data

        const timeQuantify = t => t.days * 100 + t.hours + t.minutes * 0.01
         /** Remove duplicated times, and sorted */
        const times = uniqBy(rawTimes, timeQuantify).sort((a, b) => timeQuantify(a) - timeQuantify(b))
        const lengths = uniq(rawLengths)

        return (
            <div>
                <div id="__filter_container">
                    <TextInput title="Name" criteria="title" />

                    <Select criteria="area" options={areas}/>
                    <Select criteria="difficulty" options={difficulties} />

                    <Select criteria="type" options={types} />
                    <Select criteria="transport" options={transports} />

                    {/* <Range criteria="time" options={times} /> */}
                    {/* <Range criteria="length" options={lengths} /> */}

                </div>
                <p>{store.filteredAmount} routes Avilable</p>
            </div>
        )
    }
}


export default App