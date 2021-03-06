import { h, Component } from 'preact';
import Select from './components/Select.jsx'
import TextInput from './components/Input.jsx'
import Range from './components/Range.jsx'
import {uniqBy, uniq} from './utils'

import { observer, inject, connect } from "mobx-preact";
import { observable, action, autorun, computed } from "mobx";

import './style.scss'

@inject('store')
@observer
class App extends Component {
    constructor(props) {
        super(props)
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

                    <Select  title="Area" criteria="area" options={areas}/>
                    <Select  title="Difficulty" criteria="difficulty" options={difficulties} />
                    <Select  title="Type" criteria="type" options={types} />
                    <Select  title="Transport Methods" criteria="transport" options={transports} />

                    {/* <Range criteria="time" title="Time" options={times} /> */}
                    <Range criteria="length" title="Length" options={lengths} />

                </div>
                <p> <span>{store.filteredAmount} routes Avilable</span>
                <button type="button" onClick={()=>store.resetFilter()}>Show All</button></p>
            </div>
        )
    }
}


export default App