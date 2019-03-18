// @flow
/* eslint-disable complexity */
/* eslint-disable no-underscore-dangle */
import {
    TrackedEntityType,
    Icon,
    EventProgram,
    TrackerProgram,
    CategoryCombination,
    Category,
    CategoryOption,
} from '../../../../metaData';

import getProgramIconAsync from './getProgramIcon';
import { SearchGroupFactory } from '../../../common/factory';
import { EnrollmentFactory } from '../enrollment';
import DataElementFactory from '../enrollment/DataElementFactory';
import {
    ProgramStageFactory,
} from '../programStage';

import type {
    CachedStyle,
    CachedProgramStage,
    CachedCategoryOption,
    CachedCategory,
    CachedCategoryCombo,
    CachedProgram,
    CachedOptionSet,
    CachedRelationshipType,
    CachedTrackedEntityAttribute,
} from '../../../../storageControllers/cache.types';

class ProgramFactory {
    programStageFactory: ProgramStageFactory;
    enrollmentFactory: EnrollmentFactory;
    searchGroupFactory: SearchGroupFactory;
    dataElementFactory: DataElementFactory;
    trackedEntityTypeCollection: Map<string, TrackedEntityType>;

    constructor(
        cachedOptionSets: Map<string, CachedOptionSet>,
        cachedRelationshipTypes: Array<CachedRelationshipType>,
        cachedTrackedEntityAttributes: Map<string, CachedTrackedEntityAttribute>,
        trackedEntityTypeCollection: Map<string, TrackedEntityType>,
        locale: ?string,
    ) {
        this.trackedEntityTypeCollection = trackedEntityTypeCollection;
        this.programStageFactory = new ProgramStageFactory(
            cachedOptionSets,
            cachedRelationshipTypes,
            locale,
        );
        this.enrollmentFactory = new EnrollmentFactory(
            cachedTrackedEntityAttributes,
            cachedOptionSets,
            locale,
            trackedEntityTypeCollection,
        );
        this.searchGroupFactory = new SearchGroupFactory(
            cachedTrackedEntityAttributes,
            locale,
        );
        this.dataElementFactory = new DataElementFactory(
            cachedTrackedEntityAttributes,
            cachedOptionSets,
            locale,
        );
    }

    static _buildCategoryOptions(cachedCategoryOptions: Array<CachedCategoryOption>): Map<string, CategoryOption> {
        return cachedCategoryOptions.reduce((accCategoryOptionsMap, cachedOption) => {
            accCategoryOptionsMap.set(cachedOption.id, new CategoryOption((_this) => {
                _this.id = cachedOption.id;
                _this.name = cachedOption.displayName;
                _this.access = cachedOption.access;
            }));
            return accCategoryOptionsMap;
        }, new Map());
    }

    static _buildCategories(cachedCategories: Array<CachedCategory>): Map<string, Category> {
        return cachedCategories.reduce((accCategoriesMap, cachedCategory) => {
            const category = new Category((_this) => {
                _this.id = cachedCategory.id;
                _this.name = cachedCategory.displayName;
                _this.categoryOptions = ProgramFactory._buildCategoryOptions(cachedCategory.categoryOptions || []);
            });
            accCategoriesMap.set(cachedCategory.id, category);
            return accCategoriesMap;
        }, new Map());
    }

    static _buildCategoriCombination(
        cachedCategoriCombination: ?CachedCategoryCombo,
    ) {
        if (!(
            cachedCategoriCombination &&
            !cachedCategoriCombination.isDefault &&
            cachedCategoriCombination.categories &&
            cachedCategoriCombination.categories.length > 0
        )) {
            return null;
        }

        return new CategoryCombination((_this) => {
            // $FlowSuppress
            _this.name = cachedCategoriCombination.displayName;
            // $FlowSuppress
            _this.id = cachedCategoriCombination.id;
            // $FlowSuppress
            _this.categories = ProgramFactory._buildCategories(cachedCategoriCombination.categories);
        });
    }

    static async _buildProgramIcon(cachedStyle: CachedStyle = {}) {
        const icon = new Icon();
        icon.color = cachedStyle.color || '#e0e0e0';
        icon.data = await getProgramIconAsync(cachedStyle.icon);
        return icon;
    }

    async _buildProgramAttributes(cachedProgramTrackedEntityAttributes: Array<CachedProgramTrackedEntityAttribute>) {
        const attributePromises = cachedProgramTrackedEntityAttributes.map(async (ptea) => {
            const dataElement = await this.dataElementFactory.build(ptea);
            return dataElement;
        });

        const attributes = await Promise.all(attributePromises);
        return attributes;
    }

    async build(cachedProgram: CachedProgram) {
        let program;
        if (cachedProgram.programType === 'WITHOUT_REGISTRATION') {
            program = new EventProgram((_this) => {
                _this.id = cachedProgram.id;
                _this.access = cachedProgram.access;
                _this.name = cachedProgram.displayName;
                _this.shortName = cachedProgram.displayShortName;
                _this.organisationUnits = cachedProgram.organisationUnits;
                _this.categoryCombination = ProgramFactory._buildCategoriCombination(cachedProgram.categoryCombo);
            });
            const d2Stage = cachedProgram.programStages && cachedProgram.programStages[0];
            program.stage =
                await this.programStageFactory.build(
                    d2Stage,
                    program.id,
                );
        } else {
            program = new TrackerProgram((_this) => {
                _this.id = cachedProgram.id;
                _this.access = cachedProgram.access;
                _this.name = cachedProgram.displayName;
                _this.shortName = cachedProgram.displayShortName;
                _this.organisationUnits = cachedProgram.organisationUnits;
                // $FlowFixMe
                _this.trackedEntityType = this.trackedEntityTypeCollection.get(cachedProgram.trackedEntityTypeId);
            });

            if (cachedProgram.programTrackedEntityAttributes) {
                program.searchGroups = await this.searchGroupFactory.build(
                    cachedProgram.programTrackedEntityAttributes,
                    cachedProgram.minAttributesRequiredToSearch,
                );

                // $FlowFixMe
                program.attributes = await this._buildProgramAttributes(cachedProgram.programTrackedEntityAttributes);
            }

            // $FlowFixMe
            await cachedProgram.programStages.asyncForEach(async (cachedProgramStage: CachedProgramStage) => {
                // $FlowFixMe
                program.addStage(
                    await this.programStageFactory.build(
                        cachedProgramStage,
                        program.id,
                    ),
                );
            });

            program.enrollment = await this.enrollmentFactory.build(cachedProgram, program.searchGroups);
        }
        // $FlowFixMe
        program.icon = await ProgramFactory._buildProgramIcon(cachedProgram.style);

        return program;
    }
}

export default ProgramFactory;
