// @flow
import RenderFoundation from '../../../metaData/RenderFoundation/RenderFoundation';

export type PropsFromRedux = {|
  +preselectedProgram: {|
    value: ?string,
    label: ?string
  |},
  +trackedEntityTypesWithCorrelatedPrograms: {
    [elementId: string]: {|
      +trackedEntityTypeId: string,
      +trackedEntityTypeName: string,
      +programs: Array<{|
        +programName: string,
        +programId: string,
      |}>
    |}
  },
  +programs: {
    [elementId: string]: {|
      +programId: string,
      +programName: string,
      +searchGroups: Array<{|searchForm: RenderFoundation, unique: boolean, formId: string|}>
    |}
  },
  +forms: {
    [elementId: string]: {
      loadNr: number
    }
  },
  error: boolean,
  ready: boolean,
  searchResults: Object,
  searchStatus: string,
  searchResultsErrorMessage: string,
|}

export type DispatcherFromRedux = {|
  searchViaUniqueId: ({| selectedProgramId: string, formId: string |}) => void,
  searchViaAttributes: ({| selectedProgramId: string, formId: string |}) => void,
  addFormIdToReduxStore: (formId: string) => void,
  closeModal: () => void
|}

export type Props =
  DispatcherFromRedux & PropsFromRedux & {
  +searchStatus: "RESULTS_EMPTY" | "SEARCHING" | "",
  +classes: {|
    +container: string,
    +header: string,
    +paper: string,
    +customEmpty: string,
    +groupTitle: string,
    +searchDomainSelectorSection: string,
    +searchRow: string,
    +searchRowTitle: string,
    +searchRowSelectElement: string,
    +searchButtonContainer: string,
  |},
}