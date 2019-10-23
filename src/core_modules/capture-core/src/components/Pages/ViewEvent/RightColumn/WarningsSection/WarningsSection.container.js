// @flow
import { connect } from 'react-redux';
import WarningsSection from './WarningsSection.component';
import { makeGetVisibleMessages } from '../ErrorsSection/messageSection.selectors';

const makeStateToProps = () => {
    const getVisibleWarnings = makeGetVisibleMessages();
    const mapStateToProps = (state: ReduxState, props: Object) => {
        const messagesContainer = state.rulesEffectsGeneralWarnings[props.dataEntryKey];
        return {
            warnings: getVisibleWarnings({
                messagesContainer,
                containerPropNameMain: 'warning',
                containerPropNameOnComplete: 'warningOnComplete',
                showOnComplete: true,
            }),
        };
    };
    return mapStateToProps;
};

// $FlowSuppress
export default connect(makeStateToProps, () => ({}))(WarningsSection);