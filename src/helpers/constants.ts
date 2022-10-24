import { GenreTypeEnum, SortDirectionEnum } from '@/graphql/types/_server';
import { ISortColumns } from './types';

export const dataColumns = [
  { value: 'name', title: 'Name', width: '15%' },
  { value: 'authorEmail', title: 'Author Email', width: '15%' },
  { value: 'description', title: 'Description', width: '15%' },
  { value: 'genre', title: 'Genre', width: '15%' },
  { value: 'price', title: 'Price', width: '15%' },
  { value: 'trackLength', title: 'Track Length', width: '15%' }
];

export const actionColumns = [
  { value: 'edit', title: 'Update', width: '5%' },
  { value: 'delete', title: 'Delete', width: '5%' }
];

export const columns = [...dataColumns, ...actionColumns];

export const sortingFields = [
  { value: 'authorEmail', title: 'Author Email' },
  { value: 'description', title: 'Description' },
  { value: 'name', title: 'Name' },
  { value: 'price', title: 'Price' },
  { value: 'trackLength', title: 'Track Length' }
];

export const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const remixesGenres = (Object.keys(GenreTypeEnum) as (keyof typeof GenreTypeEnum)[])
  .sort()
  .map((key) => GenreTypeEnum[key]);

export const sortDirections = (
  Object.keys(SortDirectionEnum) as (keyof typeof SortDirectionEnum)[]
).map((key) => SortDirectionEnum[key]);

export const successCreateMessage = 'Remix created successfully';
export const successDeleteMessage = 'Remix deleted successfully';
export const successUpdateMessage = 'Remix updated successfully';

export const emptySortingFieldValue = 'no';

export const defaultSortingState: ISortColumns = {
  authorEmail: 'no',
  description: 'no',
  name: 'no',
  price: 'no',
  trackLength: 'no'
};
