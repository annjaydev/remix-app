import { ISortDto, SortDirectionEnum } from '@/graphql/types/_server';
import { emptySortingFieldValue } from './constants';
import { ColumnName, ISortColumns } from './types';

export const stateToSortingVariables = (values: ISortColumns): ISortDto[] => {
  const sortingVariables: ISortDto[] = [];

  for (const sortField in values) {
    if (
      values[sortField as ColumnName] &&
      values[sortField as ColumnName] !== emptySortingFieldValue
    ) {
      sortingVariables.push({
        columnName: sortField,
        direction: values[sortField as ColumnName] as SortDirectionEnum
      });
    }
  }

  return sortingVariables;
};
