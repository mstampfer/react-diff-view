import Configuration from '../components/Configuration/index.js';
import {joinConfiguration} from '../regions/index.js';

const mapToProps = ({update, ...configuration}) => {
    return {
        onChange: update,
        ...configuration
    };
};

export default joinConfiguration(mapToProps)(Configuration);
