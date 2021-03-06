// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Search from './Search.component';
import Selected from './Selected.component';
import type { User } from './types';

const getStyles = (theme: Theme) => ({
    inputWrapperFocused: {
        border: `2px solid ${theme.palette.primary.light}`,
        borderRadius: '5px',
    },
    inputWrapperUnfocused: {
        padding: 2,
    },
});

type Props = {
    value: ?User | ?string,
    onSet: (user?: User | string) => void,
    classes: Object,
    useUpwardSuggestions?: ?boolean,
    focusOnMount?: ?boolean,
    inputPlaceholderText?: ?string,
    usernameOnlyMode?: boolean,
};

const UserField = (props: Props) => {
    const {
        classes,
        value,
        onSet,
        useUpwardSuggestions,
        focusOnMount = false,
        inputPlaceholderText,
        usernameOnlyMode,
    } = props;
    const focusSearchInput = React.useRef(focusOnMount);
    const focusSelectedInput = React.useRef(focusOnMount);

    React.useEffect(() => {
        if (focusSearchInput) {
            focusSearchInput.current = false;
        }
    });

    React.useEffect(() => {
        if (focusSelectedInput) {
            focusSelectedInput.current = false;
        }
    });

    const handleClear = () => {
        onSet();
        focusSearchInput.current = true;
    };

    const handleSet = (user: User) => {
        onSet(usernameOnlyMode ? user.username : user);
        focusSelectedInput.current = true;
    };

    if (value) {
        return (
            <Selected
                // $FlowFixMe
                text={usernameOnlyMode ? value : value.name}
                onClear={handleClear}
                // $FlowFixMe[incompatible-type] automated comment
                focusInputOnMount={focusSelectedInput.current}
            />
        );
    }

    return (
        <div>
            <Search
                onSet={handleSet}
                inputWrapperClasses={classes}
                // $FlowFixMe[incompatible-type] automated comment
                focusInputOnMount={focusSearchInput.current}
                useUpwardList={useUpwardSuggestions}
                inputPlaceholderText={inputPlaceholderText}
                exitBehaviour="selectBestChoice"
            />
        </div>
    );
};

export default withStyles(getStyles)(UserField);
