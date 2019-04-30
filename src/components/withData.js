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
    }
    render() {
        const {filter, areas, difficulties} = filterInfo
        const {criteria} = this.props
        const options = opsProcess(
            criteria === 'area' ? areas :
            criteria === 'difficulty' ? difficulties :
            []
        )
        const debouncedHandle = _.debounce(e => {
            console.log(filter(e, false));
        }, debounceTime);

        return <WrappedComponent options={options} {...this.props} onUpdate={debouncedHandle} />;
    }
  };
};

export default withData;