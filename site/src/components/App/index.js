import {PureComponent} from 'react';
import * as React from 'react';
import {uniqueId} from 'lodash';;
import sha from 'sha1';
import {bind} from 'lodash-decorators';
import {Whether} from 'react-whether';
import {createSelector} from 'reselect';
import {parseDiff} from 'react-diff-view/utils/parse.js';
import {establishConfiguration} from '../../regions/index.js';
import {DiffView, Configuration} from '../../containers/index.js';
import InputArea from '../InputArea/index.js';
import styles from './index.css';

const fakeIndex = () => sha(uniqueId()).slice(0, 9);

class App extends PureComponent {

    state = {
        diff: null,
        source: null
    };

    parse = createSelector(
        state => state.diff,
        diff => {
            if (!diff) {
                return null;
            }

            const segments = [
                'diff --git a/a b/b',
                `index ${fakeIndex()}..${fakeIndex()} 100644`,
                diff
            ];

            const files = parseDiff(segments.join('\n'), {nearbySequences: 'zip'});

            return files[0];
        }
    );

    @bind()
    receiveInput(data) {
        this.setState(data);
    }

    render() {
        const {diff, source} = this.state;
        const file = this.parse(this.state);

        return (
            <div className={styles.root}>
                <InputArea onSubmit={this.receiveInput} />
                <Whether matches={!!file}>
                    {
                        () => (
                            <React.Fragment>
                                <Configuration />
                                <DiffView
                                    key={sha(diff) + (source ? sha(source) : '')}
                                    type={file.type}
                                    hunks={file.hunks}
                                    oldSource={source}
                                />
                            </React.Fragment>
                        )
                    }
                </Whether>
            </div>
        );
    }
}

export default establishConfiguration('Configuration')(App);
