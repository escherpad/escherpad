/** 12/29/17 ge  */
import {createProvider} from "./luna-provider";
import connect from "./connect";

class Example extends Component {
    render() {
        const {text} = props;
        return <div>{text}</div>
    }
}

export default connect()
