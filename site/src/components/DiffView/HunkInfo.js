import {React} from 'react';
// import {Decoration} from 'react-diff-view';
import Decoration from '../../../../src/Decoration'
const HunkInfo = ({hunk, ...props}) => (
    <Decoration {...props}>
        {null}
        {hunk.content}
    </Decoration>
);

export default HunkInfo;
