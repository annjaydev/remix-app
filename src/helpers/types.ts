import { OperationVariables, QueryResult } from '@apollo/client';
import { IRemixModel } from '@/graphql/types/_server';

export interface DeleteModalProps {
  id: number | undefined;
  remixes: QueryResult<any, OperationVariables>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RemixTableProps {
  remixes: QueryResult<any, OperationVariables>;
}

export interface RemixFormProps {
  isUpdate?: boolean;
  remixes: QueryResult<any, OperationVariables>;
  currentRemix?: IRemixModel;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
