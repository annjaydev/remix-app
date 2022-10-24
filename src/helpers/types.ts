import { OperationVariables, QueryResult } from '@apollo/client';
import { IRemixModel, SortDirectionEnum } from '@/graphql/types/_server';

export type ColumnName = 'authorEmail' | 'description' | 'name' | 'price' | 'trackLength';

export interface DeleteModalProps {
  id: number | undefined;
  remixes: QueryResult<any, OperationVariables>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RemixTableProps {
  remixes: QueryResult<any, OperationVariables>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface RemixFormProps {
  isUpdate?: boolean;
  remixes: QueryResult<any, OperationVariables>;
  currentRemix?: IRemixModel;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface SortFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSorting: React.Dispatch<React.SetStateAction<ISortColumns>>;
  sorting: ISortColumns;
}

export interface ISortColumns {
  authorEmail?: SortDirectionEnum | string;
  description?: SortDirectionEnum | string;
  name?: SortDirectionEnum | string;
  price?: SortDirectionEnum | string;
  trackLength?: SortDirectionEnum | string;
}
