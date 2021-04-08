// import React, { useState, useEffect, Children } from 'react';

// //Types
// const HASURA_CTX = {
//   Groups: 'Groups',
// };

// export inter

// //Consuming Component
// const ctx = useHasuraContext<Groups>('Groups');

// const groups = ctx.useManyQuery({
//   where,
//   order,
//   limit,
// })`
//   name
//   body
//   groups {
//     hello
//   }
// `;

// ctx.useDelete(groups[0]);
// groups.addNew({...});
// ctx.createNew({...});

// //Create Post
// //Create UserGroups

// //Me
// export default function useHasuraContext<T extends string = string>() {
//   useEffect(() => {
//     const res: T.core = getData();
//     res;

//     //insert
//     const inputVars: T.insert_input = {} as T;
//   }, []);

//   return {
/*
      useList
        * [core]
        * [pagination]
        * [where]
        * [orderBy]
        -> useDelete
        * delete_ + [core] + _by_pk
        -> useInsert
        * insert_ + [core]
      useSingle(document)
        edit
        delete
        insert
      useDelete(document)
        abc
      
    */
//   };
// }

// core
// core_aggregate
// core_by_pk
// delete_core
// delete_core_by_pk
// insert_core
// insert_core_one
// update_core

// <Single data={data} />

// core
// -> If limit 1 then return single data
// -> Else return PaginatedList | List

// core_aggregate
// -> Text | Function

// core_by_pk
// -> SingleItem  | Function
// delete_core
// -> Button | Function
// delete_core_by_pk
// -> Button | Function
// insert_core
// -> Button | Function
// insert_core_one
// -> Form + Submit Button | Function
// update_core
// -> Form + Submit Button | Function

// //THESE ARE THE 4 CORE SCENARIOS
// SingleItem (single item)
// Button | Function (delete)
// PaginatedList (many)
// Form (insert & updates)

// interface HasuraContext {
//   typename: string;
//   primaryKey: string[];
//   primaryKeyRequiredOnCreate?: boolean;
//   overrides?: {
//     operationNames?: {
//       query_many?: string,
//       query_aggregate?: string,
//       query_by_pk?: string,
//       delete_by_pk?: string,
//       insert?: string,
//       insert_core_one?: string,
//       update_core?: string,
//     }
//   }
//   fieldFragments: {
//     [key: string]: string
//   }
// }

// interface RootHasuraContext {
//   [key: string]: HasuraContext
// }

// const AllGroupsDocument = `query {
//   groups(where: { city: { _eq : 'Denver' } }) {
//     ${fieldsFragment}
//   }
// }`

// export const Context: RootHasuraContext = {
//   groups: {
//     typename: 'groups',
//     primaryKey: ['id'],
//     // overrides: {
//     //   operationNames: {
//     //     query_many: string,
//     //     query_aggregate: string,
//     //     query_by_pk: groupsPk,
//     //     delete_by_pk: string,
//     //     insert: string,
//     //     insert_core_one: string,
//     //     update_core: string,
//     //   }
//     // },
//     fieldFragments: {
//       allGroups: `...`,
//     }
//   },
//   posts: {
//     typename: 'posts',
//     primaryKey: ['id'],
//     fieldFragments: {},
//   }
// }

// mutation MyMutation {
//   insert_threads(objects: {})
//   insert_threads_one(object: {})
//   update_threads(where: {})
//   update_threads_by_pk(pk_columns: {id: ""})
//   delete_threads(where: {})
//   delete_threads_by_pk(id: "")
// }

// query MyQuery {
//   thread_items_by_pk(id: "")
//   threads
//   threads_aggregate
// }
export {};
