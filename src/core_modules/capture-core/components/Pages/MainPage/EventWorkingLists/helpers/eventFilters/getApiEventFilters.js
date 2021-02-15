// @flow
import type { QuerySingleResource } from '../../../../../../utils/api/api.types';

type ApiConfig = {
    eventFilters: Array<Object>,
    pager: Object,
};

export const getApiEventFilters = async (programId: string, querySingleResource: QuerySingleResource) => {
    const apiRes: ApiConfig = await querySingleResource({
        resource: 'eventFilters',
        params: {
            filter: `program:eq:${programId}`,
            fields: 'id, displayName,eventQueryCriteria,access,sharing',
        },
    });

    const configs = apiRes && apiRes.eventFilters ? apiRes.eventFilters : [];
    const processedConfigs: Array<Object> = configs
        .map(c => ({
            ...c,
            name: c.displayName,
        }));

    return processedConfigs;
};
