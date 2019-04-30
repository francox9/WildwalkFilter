import _ from "lodash";
import { h, Component } from "preact";
import {arrToFn} from '../utils'

const debounceTime = 300;
const opsProcess = (ops) => ops.map(a => ({value: a, text: a}))

/**
 * Provides the following to wrapped component:
 * - 'onUpdate' handler
 */
const withData = filterInfo => WrappedComponent => {
  return class extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''}

    }
    render() {
        const {filter} = filterInfo
        const {criteria, options: ops} = this.props

        const options = opsProcess( ops ? filterInfo[ops] : [] )
        /**
         * Handling onUpdate with a debounceTime
         */
        const handle = _.debounce(d => {
            filter(d, false)
            this.setState({value: d[criteria]})


        }, debounceTime);

        return <WrappedComponent  {...this.props}  value={this.state.value} options={options} onUpdate={handle} />;
    }
  };
};

export default withData;