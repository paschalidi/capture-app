// @flow
/* eslint-disable react/no-multi-comp */
import React from 'react';
import i18n from '@dhis2/d2-i18n';
import {
    DataEntry,
    withBrowserBackWarning,
    withSearchGroups,
    inMemoryFileStore,
} from '../../DataEntry';
import type { TeiRegistration } from '../../../metaData';

const getSearchGroups = (props: Object) => props.teiRegistrationMetadata.inputSearchGroups;
const getSearchContext = (props: Object) => ({
    ...props.onGetValidationContext(),
    trackedEntityType: props.teiRegistrationMetadata.form.id,
});

type FinalTeiDataEntryProps = {
    teiRegistrationMetadata: TeiRegistration,
};
// final step before the generic dataEntry is inserted
class FinalTeiDataEntry extends React.Component<FinalTeiDataEntryProps> {
    componentWillUnmount() {
        inMemoryFileStore.clear();
    }

    render() {
        const { teiRegistrationMetadata, ...passOnProps } = this.props;
        return (
            <DataEntry
                {...passOnProps}
                formFoundation={teiRegistrationMetadata.form}
            />
        );
    }
}

const SearchGroupsHOC = withSearchGroups(getSearchGroups, getSearchContext)(FinalTeiDataEntry);
const BrowserBackWarningHOC = withBrowserBackWarning()(SearchGroupsHOC);

class PreTeiDataEntryPure extends React.PureComponent<Object> {
    render() {
        return (
            <BrowserBackWarningHOC
                {...this.props}
            />
        );
    }
}

type PreTeiDataEntryProps = {
    orgUnit: Object,
    onUpdateField: Function,
    onStartAsyncUpdateField: Function,
    teiRegistrationMetadata: ?TeiRegistration,
    onGetUnsavedAttributeValues?: ?Function,
};

class PreTeiDataEntry extends React.Component<PreTeiDataEntryProps> {
    getValidationContext = () => {
        const { orgUnit, onGetUnsavedAttributeValues } = this.props;
        return {
            orgUnitId: orgUnit.id,
            onGetUnsavedAttributeValues,
        };
    }

    render() {
        const {
            orgUnit,
            onUpdateField,
            onStartAsyncUpdateField,
            teiRegistrationMetadata,
            onGetUnsavedAttributeValues,
            ...passOnProps } = this.props;

        if (!teiRegistrationMetadata) {
            return (
                <div>
                    {i18n.t('An error has occurred. See log for details')}
                </div>
            );
        }

        return (
            // $FlowFixMe[cannot-spread-inexact] automated comment
            <PreTeiDataEntryPure
                onGetValidationContext={this.getValidationContext}
                onUpdateFormField={onUpdateField}
                onUpdateFormFieldAsync={onStartAsyncUpdateField}
                teiRegistrationMetadata={teiRegistrationMetadata}
                {...passOnProps}
            />
        );
    }
}

export default PreTeiDataEntry;
