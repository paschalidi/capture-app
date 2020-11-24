// @flow
import type { EventProgram } from '../../../../../metaData';
import type {
    CancelLoadTemplates,
    CancelLoadView,
    CancelUpdateList,
    Categories,
    ChangePage,
    ChangeRowsPerPage,
    ClearFilter,
    CustomMenuContents,
    CustomRowMenuContents,
    FiltersData,
    LoadedContext,
    LoadTemplates,
    LoadView,
    SelectRestMenuItem,
    SelectRow,
    SelectTemplate,
    SetColumnOrder,
    Sort,
    StickyFilters,
    UnloadingContext,
    UpdateFilter,
    WorkingListTemplate,
} from '../../WorkingLists';
import type {
    AddTemplate,
    DeleteTemplate,
    UpdateTemplate,
    UpdateList,
    RecordsOrder,
    CustomColumnOrder,
} from '../../WorkingListsCommon';
import type { EventRecords } from '../../EventWorkingListsCommon';
import type {
    EventWorkingListsTemplates,
} from '../types';

export type Props = $ReadOnly<{|
    storeId: string,
|}>;

export type EventWorkingListsReduxOutputProps = {|
    categories?: Categories,
    currentPage?: number,
    currentTemplate?: WorkingListTemplate,
    currentViewHasTemplateChanges?: boolean,
    customColumnOrder?: CustomColumnOrder,
    customListViewMenuContents?: CustomMenuContents,
    customRowMenuContents?: CustomRowMenuContents,
    downloadRequest: Object,
    records?: EventRecords,
    filters?: FiltersData,
    initialViewConfig?: Object,
    lastIdDeleted?: string,
    lastTransaction: number,
    lastTransactionOnListDataRefresh?: number,
    listDataRefreshTimestamp?: number,
    loadedContext?: LoadedContext,
    loading: boolean,
    loadViewError?: string,
    loadTemplatesError?: string, // TODO: Check
    onAddTemplate: AddTemplate,
    onCancelLoadView: CancelLoadView,
    onCancelLoadTemplates: CancelLoadTemplates,
    onCancelUpdateList: CancelUpdateList,
    onChangePage: ChangePage,
    onChangeRowsPerPage: ChangeRowsPerPage,
    onClearFilter: ClearFilter,
    onDeleteEvent: Function,
    onDeleteTemplate: DeleteTemplate,
    onLoadView: LoadView,
    onLoadTemplates: LoadTemplates,
    onSelectListRow: SelectRow,
    onSelectRestMenuItem: SelectRestMenuItem,
    onSelectTemplate: SelectTemplate,
    onSetListColumnOrder: SetColumnOrder,
    onSortList: Sort,
    onUnloadingContext?: UnloadingContext,
    onUpdateFilter: UpdateFilter,
    onUpdateList: UpdateList,
    onUpdateTemplate: UpdateTemplate,
    orgUnitId: string,
    program: EventProgram,
    recordsOrder?: RecordsOrder,
    rowsPerPage?: number,
    sortByDirection?: string,
    sortById?: string,
    stickyFilters?: StickyFilters,
    templates?: EventWorkingListsTemplates,
    templatesLoading: boolean,
    updating: boolean,
    updatingWithDialog: boolean,
    viewPreloaded?: boolean,
|};
