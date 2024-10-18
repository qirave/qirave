declare module '*.graphql' {
  import { DocumentNode } from '@/lib/types/gql';
  const Schema: DocumentNode;
  export default Schema;
}

declare module '*.gql' {
  import { DocumentNode } from '@/lib/types/gql';
  const Schema: DocumentNode;
  export default Schema;
}

declare type GQLData<T> = {
  data: T;
};
