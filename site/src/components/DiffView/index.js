import * as React from 'react';
import Diff from 'react-diff-view/src/Diff/index.js';
import Hunk from 'react-diff-view/src/Hunk/index.js';
import withSourceExpansion from 'react-diff-view/src/hocs/withSourceExpansion.js';
import minCollapsedLines from 'react-diff-view/src/hocs/minCollapsedLines.js';
import withChangeSelect from 'react-diff-view/src/hocs/withChangeSelect.js';
import withTokenizeWorker from 'react-diff-view/src/hocs/withTokenizeWorker.js';

import {compose as Compose} from 'recompose';
import 'prism-themes/themes/prism-vs.css';
import HunkInfo from './HunkInfo';
import UnfoldCollapsed from './UnfoldCollapsed';
import TokenizeWorker from './Tokenize.worker'; // eslint-disable-line import/default
import './index.css';

const tokenize = new TokenizeWorker();

const DiffView = props => {
    const {
        hunks,
        oldSource,
        type,
        showGutter,
        viewType,
        selectedChanges,
        tokens,
        onExpandRange,
        onToggleChangeSelection
    } = props;
    const linesCount = oldSource ? oldSource.split('\n').length : 0;
    const renderHunk = (children, hunk, i, hunks) => {
        const previousElement = children[children.length - 1];
        const decorationElement = oldSource
            ? (
                <UnfoldCollapsed
                    key={'decoration-' + hunk.content}
                    previousHunk={previousElement && previousElement.props.hunk}
                    currentHunk={hunk}
                    linesCount={linesCount}
                    onExpand={onExpandRange}
                />
            )
            : <HunkInfo key={'decoration-' + hunk.content} hunk={hunk} />;
        children.push(decorationElement);

        const hunkElement = (
            <Hunk
                key={'hunk-' + hunk.content}
                hunk={hunk}
                codeEvents={{onClick: onToggleChangeSelection}}
                gutterEvents={{onClick: onToggleChangeSelection}}
            />
        );
        children.push(hunkElement);

        if (i === hunks.length - 1 && oldSource) {
            const unfoldTailElement = (
                <UnfoldCollapsed
                    key="decoration-tail"
                    previousHunk={hunk}
                    linesCount={linesCount}
                    onExpand={onExpandRange}
                />
            );
            children.push(unfoldTailElement);
        }

        return children;
    };

    return (
        <Diff
            viewType={viewType}
            diffType={type}
            hunks={hunks}
            oldSource={oldSource}
            gutterType={showGutter ? 'default' : 'none'}
            selectedChanges={selectedChanges}
            tokens={tokens}
        >
            {hunks => hunks.reduce(renderHunk, [])}
        </Diff>
    );
};

const tokenizeOptions = {
    mapPayload(data, {editsType}) {
        return {
            ...data,
            editsType: editsType
        };
    }
};

const enhance = Compose(
    withSourceExpansion(),
    minCollapsedLines(5),
    withChangeSelect({multiple: true}),
    withTokenizeWorker(tokenize, tokenizeOptions)
);

export default enhance(DiffView);
