import {React} from 'react';
import Decoration from 'react-diff-view/src/Decoration/index.js';
const HunkInfo = ({hunk, ...props}) => (
    <Decoration {...props}>
        {null}
        {hunk.content}
    </Decoration>
);

export default HunkInfo;
