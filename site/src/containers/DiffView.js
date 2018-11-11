import {omit} from 'lodash';
import DiffView from '../components/DiffView/index.js';
import {joinConfiguration} from '../regions/index.js';

const mapToProps = context => omit(context, 'update');

export default joinConfiguration(mapToProps)(DiffView);
