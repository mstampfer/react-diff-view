import {Whether} from 'react-whether';
import Unfold from './Unfold';

const HunkHeader = ({previousHunk, currentHunk, rawCodeLines, onExpand}) => {
    if (!previousHunk) {
        const collapsedLines = currentHunk.oldStart - 1;

        if (!collapsedLines) {
            return null;
        }

        return (
            <div>
                <Whether matches={collapsedLines > 10}>
                    <Unfold start={1} direction="none" lines={collapsedLines} onExpand={onExpand} />
                </Whether>
                <Unfold
                    start={Math.max(currentHunk.oldStart - 10, 1)}
                    direction="up"
                    lines={Math.min(collapsedLines, 10)}
                    onExpand={onExpand}
                />
            </div>
        );
    }

    if (currentHunk.content === 'STUB') {
        const nextStart = currentHunk.oldStart + currentHunk.oldLines;
        const collapsedLines = rawCodeLines.length - nextStart + 1;

        return (
            <div>
                <Whether matches={collapsedLines > 10}>
                    <Unfold start={nextStart} direction="none" lines={collapsedLines} onExpand={onExpand} />
                </Whether>
                <Unfold
                    start={nextStart}
                    direction="up"
                    lines={Math.min(collapsedLines, 10)}
                    onExpand={onExpand}
                />
            </div>
        );
    }

    const collapsedStart = previousHunk.oldStart + previousHunk.oldLines;
    const collapsedLines = currentHunk.oldStart - collapsedStart;

    if (collapsedLines < 10) {
        return (
            <div>
                <Unfold start={collapsedStart} direction="none" lines={collapsedLines} onExpand={onExpand} />
            </div>
        );
    }

    return (
        <div>
            <Unfold start={collapsedStart} direction="down" lines={10} onExpand={onExpand} />
            <Unfold start={collapsedStart} direction="none" lines={collapsedLines} onExpand={onExpand} />
            <Unfold start={currentHunk.oldStart - 9} direction="up" lines={10} onExpand={onExpand} />
        </div>
    );
};

export default HunkHeader;
