import {React, PureComponent} from 'react';
import classNames from 'classnames';
import {bind} from 'lodash-decorators';
// import {Icon} from 'antd';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
import styles from './DiffText.css';

export default class DiffText extends PureComponent {

    state = {
        diff: '',
        source: '',
        isSourceVisible: false
    };

    @bind()
    updateDiff(diff) {
        this.setState({diff});
    }

    @bind()
    updateSource(source) {
        this.setState({source});
    }

    @bind()
    toggleSourceInput() {
        this.setState(state => ({isSourceVisible: !state.isSourceVisible}));
    }

    @bind()
    submit() {
        const {onSubmit} = this.props;
        const {diff, source, isSourceVisible} = this.state;
        const data = {
            diff: diff,
            source: (isSourceVisible && source) ? source : null
        };

        onSubmit(data);
    }

    render() {
        const {className} = this.props;
        const {diff, source, isSourceVisible} = this.state;

        return (
            <div className={classNames(styles.root, className)}>
                <TextInput title="DIFF TEXT" value={diff} onChange={this.updateDiff} />
                <div className={styles.source}>
                    <TextInput
                        className={isSourceVisible ? null : styles.hidden}
                        title="ORIGINAL SOURCE CODE"
                        value={source}
                        onChange={this.updateSource}
                    />
                </div>
                <SubmitButton onClick={this.submit} />
            </div>
        );
    }
}
