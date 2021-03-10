import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  float8: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "devices" */
export type Devices = {
  __typename?: 'devices';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  token: Scalars['String'];
  type: Scalars['String'];
  updatedAt?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "devices" */
export type Devices_Aggregate = {
  __typename?: 'devices_aggregate';
  aggregate?: Maybe<Devices_Aggregate_Fields>;
  nodes: Array<Devices>;
};

/** aggregate fields of "devices" */
export type Devices_Aggregate_Fields = {
  __typename?: 'devices_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Devices_Max_Fields>;
  min?: Maybe<Devices_Min_Fields>;
};


/** aggregate fields of "devices" */
export type Devices_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Devices_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "devices" */
export type Devices_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Devices_Max_Order_By>;
  min?: Maybe<Devices_Min_Order_By>;
};

/** input type for inserting array relation for remote table "devices" */
export type Devices_Arr_Rel_Insert_Input = {
  data: Array<Devices_Insert_Input>;
  on_conflict?: Maybe<Devices_On_Conflict>;
};

/** Boolean expression to filter rows from the table "devices". All fields are combined with a logical 'AND'. */
export type Devices_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Devices_Bool_Exp>>>;
  _not?: Maybe<Devices_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Devices_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  token?: Maybe<String_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  userId?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "devices" */
export enum Devices_Constraint {
  /** unique or primary key constraint */
  DevicesPkey = 'devices_pkey',
  /** unique or primary key constraint */
  DevicesTokenKey = 'devices_token_key'
}

/** input type for inserting data into table "devices" */
export type Devices_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Devices_Max_Fields = {
  __typename?: 'devices_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "devices" */
export type Devices_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  token?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Devices_Min_Fields = {
  __typename?: 'devices_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "devices" */
export type Devices_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  token?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "devices" */
export type Devices_Mutation_Response = {
  __typename?: 'devices_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Devices>;
};

/** input type for inserting object relation for remote table "devices" */
export type Devices_Obj_Rel_Insert_Input = {
  data: Devices_Insert_Input;
  on_conflict?: Maybe<Devices_On_Conflict>;
};

/** on conflict condition type for table "devices" */
export type Devices_On_Conflict = {
  constraint: Devices_Constraint;
  update_columns: Array<Devices_Update_Column>;
  where?: Maybe<Devices_Bool_Exp>;
};

/** ordering options when selecting data from "devices" */
export type Devices_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  token?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "devices" */
export type Devices_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "devices" */
export enum Devices_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Token = 'token',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "devices" */
export type Devices_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** update columns of table "devices" */
export enum Devices_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Token = 'token',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}


/** expression to compare columns of type float8. All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: Maybe<Scalars['float8']>;
  _gt?: Maybe<Scalars['float8']>;
  _gte?: Maybe<Scalars['float8']>;
  _in?: Maybe<Array<Scalars['float8']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['float8']>;
  _lte?: Maybe<Scalars['float8']>;
  _neq?: Maybe<Scalars['float8']>;
  _nin?: Maybe<Array<Scalars['float8']>>;
};

/** columns and relationships of "groups" */
export type Groups = {
  __typename?: 'groups';
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  isPrivate: Scalars['Boolean'];
  /** An object relationship */
  location?: Maybe<Locations>;
  locationId?: Maybe<Scalars['uuid']>;
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregated array relationship */
  posts_aggregate: Posts_Aggregate;
  updatedAt: Scalars['timestamptz'];
  /** An array relationship */
  userGroups: Array<UserGroups>;
  /** An aggregated array relationship */
  userGroups_aggregate: UserGroups_Aggregate;
};


/** columns and relationships of "groups" */
export type GroupsPostsArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/** columns and relationships of "groups" */
export type GroupsPosts_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/** columns and relationships of "groups" */
export type GroupsUserGroupsArgs = {
  distinct_on?: Maybe<Array<UserGroups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserGroups_Order_By>>;
  where?: Maybe<UserGroups_Bool_Exp>;
};


/** columns and relationships of "groups" */
export type GroupsUserGroups_AggregateArgs = {
  distinct_on?: Maybe<Array<UserGroups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserGroups_Order_By>>;
  where?: Maybe<UserGroups_Bool_Exp>;
};

/** aggregated selection of "groups" */
export type Groups_Aggregate = {
  __typename?: 'groups_aggregate';
  aggregate?: Maybe<Groups_Aggregate_Fields>;
  nodes: Array<Groups>;
};

/** aggregate fields of "groups" */
export type Groups_Aggregate_Fields = {
  __typename?: 'groups_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Groups_Max_Fields>;
  min?: Maybe<Groups_Min_Fields>;
};


/** aggregate fields of "groups" */
export type Groups_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Groups_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "groups" */
export type Groups_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Groups_Max_Order_By>;
  min?: Maybe<Groups_Min_Order_By>;
};

/** input type for inserting array relation for remote table "groups" */
export type Groups_Arr_Rel_Insert_Input = {
  data: Array<Groups_Insert_Input>;
  on_conflict?: Maybe<Groups_On_Conflict>;
};

/** Boolean expression to filter rows from the table "groups". All fields are combined with a logical 'AND'. */
export type Groups_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Groups_Bool_Exp>>>;
  _not?: Maybe<Groups_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Groups_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  isPrivate?: Maybe<Boolean_Comparison_Exp>;
  location?: Maybe<Locations_Bool_Exp>;
  locationId?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  photo?: Maybe<String_Comparison_Exp>;
  photoUrl?: Maybe<String_Comparison_Exp>;
  posts?: Maybe<Posts_Bool_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  userGroups?: Maybe<UserGroups_Bool_Exp>;
};

/** unique or primary key constraints on table "groups" */
export enum Groups_Constraint {
  /** unique or primary key constraint */
  GroupsNameKey = 'groups_name_key',
  /** unique or primary key constraint */
  GroupsPkey = 'groups_pkey'
}

/** input type for inserting data into table "groups" */
export type Groups_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Locations_Obj_Rel_Insert_Input>;
  locationId?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  posts?: Maybe<Posts_Arr_Rel_Insert_Input>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userGroups?: Maybe<UserGroups_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Groups_Max_Fields = {
  __typename?: 'groups_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  locationId?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "groups" */
export type Groups_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  locationId?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  photo?: Maybe<Order_By>;
  photoUrl?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Groups_Min_Fields = {
  __typename?: 'groups_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  locationId?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "groups" */
export type Groups_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  locationId?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  photo?: Maybe<Order_By>;
  photoUrl?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "groups" */
export type Groups_Mutation_Response = {
  __typename?: 'groups_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Groups>;
};

/** input type for inserting object relation for remote table "groups" */
export type Groups_Obj_Rel_Insert_Input = {
  data: Groups_Insert_Input;
  on_conflict?: Maybe<Groups_On_Conflict>;
};

/** on conflict condition type for table "groups" */
export type Groups_On_Conflict = {
  constraint: Groups_Constraint;
  update_columns: Array<Groups_Update_Column>;
  where?: Maybe<Groups_Bool_Exp>;
};

/** ordering options when selecting data from "groups" */
export type Groups_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isPrivate?: Maybe<Order_By>;
  location?: Maybe<Locations_Order_By>;
  locationId?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  photo?: Maybe<Order_By>;
  photoUrl?: Maybe<Order_By>;
  posts_aggregate?: Maybe<Posts_Aggregate_Order_By>;
  updatedAt?: Maybe<Order_By>;
  userGroups_aggregate?: Maybe<UserGroups_Aggregate_Order_By>;
};

/** primary key columns input for table: "groups" */
export type Groups_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "groups" */
export enum Groups_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsPrivate = 'isPrivate',
  /** column name */
  LocationId = 'locationId',
  /** column name */
  Name = 'name',
  /** column name */
  Photo = 'photo',
  /** column name */
  PhotoUrl = 'photoUrl',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "groups" */
export type Groups_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  locationId?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "groups" */
export enum Groups_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsPrivate = 'isPrivate',
  /** column name */
  LocationId = 'locationId',
  /** column name */
  Name = 'name',
  /** column name */
  Photo = 'photo',
  /** column name */
  PhotoUrl = 'photoUrl',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** columns and relationships of "locations" */
export type Locations = {
  __typename?: 'locations';
  city?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  countryCode: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  formattedAddress: Scalars['String'];
  id: Scalars['uuid'];
  latitude: Scalars['float8'];
  longitude: Scalars['float8'];
  name: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "locations" */
export type Locations_Aggregate = {
  __typename?: 'locations_aggregate';
  aggregate?: Maybe<Locations_Aggregate_Fields>;
  nodes: Array<Locations>;
};

/** aggregate fields of "locations" */
export type Locations_Aggregate_Fields = {
  __typename?: 'locations_aggregate_fields';
  avg?: Maybe<Locations_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Locations_Max_Fields>;
  min?: Maybe<Locations_Min_Fields>;
  stddev?: Maybe<Locations_Stddev_Fields>;
  stddev_pop?: Maybe<Locations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Locations_Stddev_Samp_Fields>;
  sum?: Maybe<Locations_Sum_Fields>;
  var_pop?: Maybe<Locations_Var_Pop_Fields>;
  var_samp?: Maybe<Locations_Var_Samp_Fields>;
  variance?: Maybe<Locations_Variance_Fields>;
};


/** aggregate fields of "locations" */
export type Locations_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Locations_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "locations" */
export type Locations_Aggregate_Order_By = {
  avg?: Maybe<Locations_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Locations_Max_Order_By>;
  min?: Maybe<Locations_Min_Order_By>;
  stddev?: Maybe<Locations_Stddev_Order_By>;
  stddev_pop?: Maybe<Locations_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Locations_Stddev_Samp_Order_By>;
  sum?: Maybe<Locations_Sum_Order_By>;
  var_pop?: Maybe<Locations_Var_Pop_Order_By>;
  var_samp?: Maybe<Locations_Var_Samp_Order_By>;
  variance?: Maybe<Locations_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "locations" */
export type Locations_Arr_Rel_Insert_Input = {
  data: Array<Locations_Insert_Input>;
  on_conflict?: Maybe<Locations_On_Conflict>;
};

/** aggregate avg on columns */
export type Locations_Avg_Fields = {
  __typename?: 'locations_avg_fields';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "locations" */
export type Locations_Avg_Order_By = {
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "locations". All fields are combined with a logical 'AND'. */
export type Locations_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Locations_Bool_Exp>>>;
  _not?: Maybe<Locations_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Locations_Bool_Exp>>>;
  city?: Maybe<String_Comparison_Exp>;
  country?: Maybe<String_Comparison_Exp>;
  countryCode?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  formattedAddress?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  latitude?: Maybe<Float8_Comparison_Exp>;
  longitude?: Maybe<Float8_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  state?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "locations" */
export enum Locations_Constraint {
  /** unique or primary key constraint */
  LocationsPkey = 'locations_pkey'
}

/** input type for incrementing integer column in table "locations" */
export type Locations_Inc_Input = {
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
};

/** input type for inserting data into table "locations" */
export type Locations_Insert_Input = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  formattedAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Locations_Max_Fields = {
  __typename?: 'locations_max_fields';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  formattedAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "locations" */
export type Locations_Max_Order_By = {
  city?: Maybe<Order_By>;
  country?: Maybe<Order_By>;
  countryCode?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  formattedAddress?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Locations_Min_Fields = {
  __typename?: 'locations_min_fields';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  formattedAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "locations" */
export type Locations_Min_Order_By = {
  city?: Maybe<Order_By>;
  country?: Maybe<Order_By>;
  countryCode?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  formattedAddress?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "locations" */
export type Locations_Mutation_Response = {
  __typename?: 'locations_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Locations>;
};

/** input type for inserting object relation for remote table "locations" */
export type Locations_Obj_Rel_Insert_Input = {
  data: Locations_Insert_Input;
  on_conflict?: Maybe<Locations_On_Conflict>;
};

/** on conflict condition type for table "locations" */
export type Locations_On_Conflict = {
  constraint: Locations_Constraint;
  update_columns: Array<Locations_Update_Column>;
  where?: Maybe<Locations_Bool_Exp>;
};

/** ordering options when selecting data from "locations" */
export type Locations_Order_By = {
  city?: Maybe<Order_By>;
  country?: Maybe<Order_By>;
  countryCode?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  formattedAddress?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: "locations" */
export type Locations_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "locations" */
export enum Locations_Select_Column {
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CountryCode = 'countryCode',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FormattedAddress = 'formattedAddress',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "locations" */
export type Locations_Set_Input = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  formattedAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Locations_Stddev_Fields = {
  __typename?: 'locations_stddev_fields';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "locations" */
export type Locations_Stddev_Order_By = {
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Locations_Stddev_Pop_Fields = {
  __typename?: 'locations_stddev_pop_fields';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "locations" */
export type Locations_Stddev_Pop_Order_By = {
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Locations_Stddev_Samp_Fields = {
  __typename?: 'locations_stddev_samp_fields';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "locations" */
export type Locations_Stddev_Samp_Order_By = {
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Locations_Sum_Fields = {
  __typename?: 'locations_sum_fields';
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
};

/** order by sum() on columns of table "locations" */
export type Locations_Sum_Order_By = {
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
};

/** update columns of table "locations" */
export enum Locations_Update_Column {
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CountryCode = 'countryCode',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FormattedAddress = 'formattedAddress',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type Locations_Var_Pop_Fields = {
  __typename?: 'locations_var_pop_fields';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "locations" */
export type Locations_Var_Pop_Order_By = {
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Locations_Var_Samp_Fields = {
  __typename?: 'locations_var_samp_fields';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "locations" */
export type Locations_Var_Samp_Order_By = {
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Locations_Variance_Fields = {
  __typename?: 'locations_variance_fields';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "locations" */
export type Locations_Variance_Order_By = {
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "devices" */
  delete_devices?: Maybe<Devices_Mutation_Response>;
  /** delete single row from the table: "devices" */
  delete_devices_by_pk?: Maybe<Devices>;
  /** delete data from the table: "groups" */
  delete_groups?: Maybe<Groups_Mutation_Response>;
  /** delete single row from the table: "groups" */
  delete_groups_by_pk?: Maybe<Groups>;
  /** delete data from the table: "locations" */
  delete_locations?: Maybe<Locations_Mutation_Response>;
  /** delete single row from the table: "locations" */
  delete_locations_by_pk?: Maybe<Locations>;
  /** delete data from the table: "posts" */
  delete_posts?: Maybe<Posts_Mutation_Response>;
  /** delete single row from the table: "posts" */
  delete_posts_by_pk?: Maybe<Posts>;
  /** delete data from the table: "userGroups" */
  delete_userGroups?: Maybe<UserGroups_Mutation_Response>;
  /** delete single row from the table: "userGroups" */
  delete_userGroups_by_pk?: Maybe<UserGroups>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "devices" */
  insert_devices?: Maybe<Devices_Mutation_Response>;
  /** insert a single row into the table: "devices" */
  insert_devices_one?: Maybe<Devices>;
  /** insert data into the table: "groups" */
  insert_groups?: Maybe<Groups_Mutation_Response>;
  /** insert a single row into the table: "groups" */
  insert_groups_one?: Maybe<Groups>;
  /** insert data into the table: "locations" */
  insert_locations?: Maybe<Locations_Mutation_Response>;
  /** insert a single row into the table: "locations" */
  insert_locations_one?: Maybe<Locations>;
  /** insert data into the table: "posts" */
  insert_posts?: Maybe<Posts_Mutation_Response>;
  /** insert a single row into the table: "posts" */
  insert_posts_one?: Maybe<Posts>;
  /** insert data into the table: "userGroups" */
  insert_userGroups?: Maybe<UserGroups_Mutation_Response>;
  /** insert a single row into the table: "userGroups" */
  insert_userGroups_one?: Maybe<UserGroups>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "devices" */
  update_devices?: Maybe<Devices_Mutation_Response>;
  /** update single row of the table: "devices" */
  update_devices_by_pk?: Maybe<Devices>;
  /** update data of the table: "groups" */
  update_groups?: Maybe<Groups_Mutation_Response>;
  /** update single row of the table: "groups" */
  update_groups_by_pk?: Maybe<Groups>;
  /** update data of the table: "locations" */
  update_locations?: Maybe<Locations_Mutation_Response>;
  /** update single row of the table: "locations" */
  update_locations_by_pk?: Maybe<Locations>;
  /** update data of the table: "posts" */
  update_posts?: Maybe<Posts_Mutation_Response>;
  /** update single row of the table: "posts" */
  update_posts_by_pk?: Maybe<Posts>;
  /** update data of the table: "userGroups" */
  update_userGroups?: Maybe<UserGroups_Mutation_Response>;
  /** update single row of the table: "userGroups" */
  update_userGroups_by_pk?: Maybe<UserGroups>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_DevicesArgs = {
  where: Devices_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Devices_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GroupsArgs = {
  where: Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Groups_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_LocationsArgs = {
  where: Locations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Locations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_PostsArgs = {
  where: Posts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Posts_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UserGroupsArgs = {
  where: UserGroups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_UserGroups_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_DevicesArgs = {
  objects: Array<Devices_Insert_Input>;
  on_conflict?: Maybe<Devices_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Devices_OneArgs = {
  object: Devices_Insert_Input;
  on_conflict?: Maybe<Devices_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GroupsArgs = {
  objects: Array<Groups_Insert_Input>;
  on_conflict?: Maybe<Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Groups_OneArgs = {
  object: Groups_Insert_Input;
  on_conflict?: Maybe<Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LocationsArgs = {
  objects: Array<Locations_Insert_Input>;
  on_conflict?: Maybe<Locations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Locations_OneArgs = {
  object: Locations_Insert_Input;
  on_conflict?: Maybe<Locations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PostsArgs = {
  objects: Array<Posts_Insert_Input>;
  on_conflict?: Maybe<Posts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Posts_OneArgs = {
  object: Posts_Insert_Input;
  on_conflict?: Maybe<Posts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserGroupsArgs = {
  objects: Array<UserGroups_Insert_Input>;
  on_conflict?: Maybe<UserGroups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserGroups_OneArgs = {
  object: UserGroups_Insert_Input;
  on_conflict?: Maybe<UserGroups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_DevicesArgs = {
  _set?: Maybe<Devices_Set_Input>;
  where: Devices_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Devices_By_PkArgs = {
  _set?: Maybe<Devices_Set_Input>;
  pk_columns: Devices_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GroupsArgs = {
  _set?: Maybe<Groups_Set_Input>;
  where: Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Groups_By_PkArgs = {
  _set?: Maybe<Groups_Set_Input>;
  pk_columns: Groups_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_LocationsArgs = {
  _inc?: Maybe<Locations_Inc_Input>;
  _set?: Maybe<Locations_Set_Input>;
  where: Locations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Locations_By_PkArgs = {
  _inc?: Maybe<Locations_Inc_Input>;
  _set?: Maybe<Locations_Set_Input>;
  pk_columns: Locations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PostsArgs = {
  _set?: Maybe<Posts_Set_Input>;
  where: Posts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Posts_By_PkArgs = {
  _set?: Maybe<Posts_Set_Input>;
  pk_columns: Posts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserGroupsArgs = {
  _set?: Maybe<UserGroups_Set_Input>;
  where: UserGroups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_UserGroups_By_PkArgs = {
  _set?: Maybe<UserGroups_Set_Input>;
  pk_columns: UserGroups_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "posts" */
export type Posts = {
  __typename?: 'posts';
  body: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  group?: Maybe<Groups>;
  groupId?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  photoUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user?: Maybe<Users>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "posts" */
export type Posts_Aggregate = {
  __typename?: 'posts_aggregate';
  aggregate?: Maybe<Posts_Aggregate_Fields>;
  nodes: Array<Posts>;
};

/** aggregate fields of "posts" */
export type Posts_Aggregate_Fields = {
  __typename?: 'posts_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Posts_Max_Fields>;
  min?: Maybe<Posts_Min_Fields>;
};


/** aggregate fields of "posts" */
export type Posts_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Posts_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "posts" */
export type Posts_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Posts_Max_Order_By>;
  min?: Maybe<Posts_Min_Order_By>;
};

/** input type for inserting array relation for remote table "posts" */
export type Posts_Arr_Rel_Insert_Input = {
  data: Array<Posts_Insert_Input>;
  on_conflict?: Maybe<Posts_On_Conflict>;
};

/** Boolean expression to filter rows from the table "posts". All fields are combined with a logical 'AND'. */
export type Posts_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Posts_Bool_Exp>>>;
  _not?: Maybe<Posts_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Posts_Bool_Exp>>>;
  body?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  group?: Maybe<Groups_Bool_Exp>;
  groupId?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  photoUrl?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  userId?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "posts" */
export enum Posts_Constraint {
  /** unique or primary key constraint */
  PostsPkey = 'posts_pkey'
}

/** input type for inserting data into table "posts" */
export type Posts_Insert_Input = {
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  group?: Maybe<Groups_Obj_Rel_Insert_Input>;
  groupId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  photoUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Posts_Max_Fields = {
  __typename?: 'posts_max_fields';
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  groupId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  photoUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "posts" */
export type Posts_Max_Order_By = {
  body?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  groupId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  photoUrl?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Posts_Min_Fields = {
  __typename?: 'posts_min_fields';
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  groupId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  photoUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "posts" */
export type Posts_Min_Order_By = {
  body?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  groupId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  photoUrl?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "posts" */
export type Posts_Mutation_Response = {
  __typename?: 'posts_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Posts>;
};

/** input type for inserting object relation for remote table "posts" */
export type Posts_Obj_Rel_Insert_Input = {
  data: Posts_Insert_Input;
  on_conflict?: Maybe<Posts_On_Conflict>;
};

/** on conflict condition type for table "posts" */
export type Posts_On_Conflict = {
  constraint: Posts_Constraint;
  update_columns: Array<Posts_Update_Column>;
  where?: Maybe<Posts_Bool_Exp>;
};

/** ordering options when selecting data from "posts" */
export type Posts_Order_By = {
  body?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  group?: Maybe<Groups_Order_By>;
  groupId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  photoUrl?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "posts" */
export type Posts_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "posts" */
export enum Posts_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  GroupId = 'groupId',
  /** column name */
  Id = 'id',
  /** column name */
  PhotoUrl = 'photoUrl',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "posts" */
export type Posts_Set_Input = {
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  groupId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  photoUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** update columns of table "posts" */
export enum Posts_Update_Column {
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  GroupId = 'groupId',
  /** column name */
  Id = 'id',
  /** column name */
  PhotoUrl = 'photoUrl',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "devices" */
  devices: Array<Devices>;
  /** fetch aggregated fields from the table: "devices" */
  devices_aggregate: Devices_Aggregate;
  /** fetch data from the table: "devices" using primary key columns */
  devices_by_pk?: Maybe<Devices>;
  /** fetch data from the table: "groups" */
  groups: Array<Groups>;
  /** fetch aggregated fields from the table: "groups" */
  groups_aggregate: Groups_Aggregate;
  /** fetch data from the table: "groups" using primary key columns */
  groups_by_pk?: Maybe<Groups>;
  /** fetch data from the table: "locations" */
  locations: Array<Locations>;
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>;
  /** fetch data from the table: "posts" */
  posts: Array<Posts>;
  /** fetch aggregated fields from the table: "posts" */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
  /** fetch data from the table: "userGroups" */
  userGroups: Array<UserGroups>;
  /** fetch aggregated fields from the table: "userGroups" */
  userGroups_aggregate: UserGroups_Aggregate;
  /** fetch data from the table: "userGroups" using primary key columns */
  userGroups_by_pk?: Maybe<UserGroups>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootDevicesArgs = {
  distinct_on?: Maybe<Array<Devices_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Devices_Order_By>>;
  where?: Maybe<Devices_Bool_Exp>;
};


/** query root */
export type Query_RootDevices_AggregateArgs = {
  distinct_on?: Maybe<Array<Devices_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Devices_Order_By>>;
  where?: Maybe<Devices_Bool_Exp>;
};


/** query root */
export type Query_RootDevices_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootGroupsArgs = {
  distinct_on?: Maybe<Array<Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Groups_Order_By>>;
  where?: Maybe<Groups_Bool_Exp>;
};


/** query root */
export type Query_RootGroups_AggregateArgs = {
  distinct_on?: Maybe<Array<Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Groups_Order_By>>;
  where?: Maybe<Groups_Bool_Exp>;
};


/** query root */
export type Query_RootGroups_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootLocationsArgs = {
  distinct_on?: Maybe<Array<Locations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Locations_Order_By>>;
  where?: Maybe<Locations_Bool_Exp>;
};


/** query root */
export type Query_RootLocations_AggregateArgs = {
  distinct_on?: Maybe<Array<Locations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Locations_Order_By>>;
  where?: Maybe<Locations_Bool_Exp>;
};


/** query root */
export type Query_RootLocations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootPostsArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/** query root */
export type Query_RootPosts_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/** query root */
export type Query_RootPosts_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUserGroupsArgs = {
  distinct_on?: Maybe<Array<UserGroups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserGroups_Order_By>>;
  where?: Maybe<UserGroups_Bool_Exp>;
};


/** query root */
export type Query_RootUserGroups_AggregateArgs = {
  distinct_on?: Maybe<Array<UserGroups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserGroups_Order_By>>;
  where?: Maybe<UserGroups_Bool_Exp>;
};


/** query root */
export type Query_RootUserGroups_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "devices" */
  devices: Array<Devices>;
  /** fetch aggregated fields from the table: "devices" */
  devices_aggregate: Devices_Aggregate;
  /** fetch data from the table: "devices" using primary key columns */
  devices_by_pk?: Maybe<Devices>;
  /** fetch data from the table: "groups" */
  groups: Array<Groups>;
  /** fetch aggregated fields from the table: "groups" */
  groups_aggregate: Groups_Aggregate;
  /** fetch data from the table: "groups" using primary key columns */
  groups_by_pk?: Maybe<Groups>;
  /** fetch data from the table: "locations" */
  locations: Array<Locations>;
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>;
  /** fetch data from the table: "posts" */
  posts: Array<Posts>;
  /** fetch aggregated fields from the table: "posts" */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
  /** fetch data from the table: "userGroups" */
  userGroups: Array<UserGroups>;
  /** fetch aggregated fields from the table: "userGroups" */
  userGroups_aggregate: UserGroups_Aggregate;
  /** fetch data from the table: "userGroups" using primary key columns */
  userGroups_by_pk?: Maybe<UserGroups>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootDevicesArgs = {
  distinct_on?: Maybe<Array<Devices_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Devices_Order_By>>;
  where?: Maybe<Devices_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDevices_AggregateArgs = {
  distinct_on?: Maybe<Array<Devices_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Devices_Order_By>>;
  where?: Maybe<Devices_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDevices_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootGroupsArgs = {
  distinct_on?: Maybe<Array<Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Groups_Order_By>>;
  where?: Maybe<Groups_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGroups_AggregateArgs = {
  distinct_on?: Maybe<Array<Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Groups_Order_By>>;
  where?: Maybe<Groups_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGroups_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootLocationsArgs = {
  distinct_on?: Maybe<Array<Locations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Locations_Order_By>>;
  where?: Maybe<Locations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLocations_AggregateArgs = {
  distinct_on?: Maybe<Array<Locations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Locations_Order_By>>;
  where?: Maybe<Locations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLocations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootPostsArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPosts_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPosts_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUserGroupsArgs = {
  distinct_on?: Maybe<Array<UserGroups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserGroups_Order_By>>;
  where?: Maybe<UserGroups_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUserGroups_AggregateArgs = {
  distinct_on?: Maybe<Array<UserGroups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserGroups_Order_By>>;
  where?: Maybe<UserGroups_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUserGroups_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "userGroups" */
export type UserGroups = {
  __typename?: 'userGroups';
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  group: Groups;
  groupId: Scalars['uuid'];
  id: Scalars['uuid'];
  isAdmin: Scalars['Boolean'];
  isFounder: Scalars['Boolean'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "userGroups" */
export type UserGroups_Aggregate = {
  __typename?: 'userGroups_aggregate';
  aggregate?: Maybe<UserGroups_Aggregate_Fields>;
  nodes: Array<UserGroups>;
};

/** aggregate fields of "userGroups" */
export type UserGroups_Aggregate_Fields = {
  __typename?: 'userGroups_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UserGroups_Max_Fields>;
  min?: Maybe<UserGroups_Min_Fields>;
};


/** aggregate fields of "userGroups" */
export type UserGroups_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<UserGroups_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "userGroups" */
export type UserGroups_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<UserGroups_Max_Order_By>;
  min?: Maybe<UserGroups_Min_Order_By>;
};

/** input type for inserting array relation for remote table "userGroups" */
export type UserGroups_Arr_Rel_Insert_Input = {
  data: Array<UserGroups_Insert_Input>;
  on_conflict?: Maybe<UserGroups_On_Conflict>;
};

/** Boolean expression to filter rows from the table "userGroups". All fields are combined with a logical 'AND'. */
export type UserGroups_Bool_Exp = {
  _and?: Maybe<Array<Maybe<UserGroups_Bool_Exp>>>;
  _not?: Maybe<UserGroups_Bool_Exp>;
  _or?: Maybe<Array<Maybe<UserGroups_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  group?: Maybe<Groups_Bool_Exp>;
  groupId?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  isAdmin?: Maybe<Boolean_Comparison_Exp>;
  isFounder?: Maybe<Boolean_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  userId?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "userGroups" */
export enum UserGroups_Constraint {
  /** unique or primary key constraint */
  UserGroupsPkey = 'userGroups_pkey'
}

/** input type for inserting data into table "userGroups" */
export type UserGroups_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  group?: Maybe<Groups_Obj_Rel_Insert_Input>;
  groupId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  isFounder?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type UserGroups_Max_Fields = {
  __typename?: 'userGroups_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  groupId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "userGroups" */
export type UserGroups_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  groupId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type UserGroups_Min_Fields = {
  __typename?: 'userGroups_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  groupId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "userGroups" */
export type UserGroups_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  groupId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "userGroups" */
export type UserGroups_Mutation_Response = {
  __typename?: 'userGroups_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<UserGroups>;
};

/** input type for inserting object relation for remote table "userGroups" */
export type UserGroups_Obj_Rel_Insert_Input = {
  data: UserGroups_Insert_Input;
  on_conflict?: Maybe<UserGroups_On_Conflict>;
};

/** on conflict condition type for table "userGroups" */
export type UserGroups_On_Conflict = {
  constraint: UserGroups_Constraint;
  update_columns: Array<UserGroups_Update_Column>;
  where?: Maybe<UserGroups_Bool_Exp>;
};

/** ordering options when selecting data from "userGroups" */
export type UserGroups_Order_By = {
  createdAt?: Maybe<Order_By>;
  group?: Maybe<Groups_Order_By>;
  groupId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isAdmin?: Maybe<Order_By>;
  isFounder?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "userGroups" */
export type UserGroups_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "userGroups" */
export enum UserGroups_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  GroupId = 'groupId',
  /** column name */
  Id = 'id',
  /** column name */
  IsAdmin = 'isAdmin',
  /** column name */
  IsFounder = 'isFounder',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "userGroups" */
export type UserGroups_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  groupId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  isFounder?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** update columns of table "userGroups" */
export enum UserGroups_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  GroupId = 'groupId',
  /** column name */
  Id = 'id',
  /** column name */
  IsAdmin = 'isAdmin',
  /** column name */
  IsFounder = 'isFounder',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  createdAt: Scalars['timestamptz'];
  /** An array relationship */
  devices: Array<Devices>;
  /** An aggregated array relationship */
  devices_aggregate: Devices_Aggregate;
  email: Scalars['String'];
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregated array relationship */
  posts_aggregate: Posts_Aggregate;
  role: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An array relationship */
  userGroups: Array<UserGroups>;
  /** An aggregated array relationship */
  userGroups_aggregate: UserGroups_Aggregate;
};


/** columns and relationships of "users" */
export type UsersDevicesArgs = {
  distinct_on?: Maybe<Array<Devices_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Devices_Order_By>>;
  where?: Maybe<Devices_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersDevices_AggregateArgs = {
  distinct_on?: Maybe<Array<Devices_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Devices_Order_By>>;
  where?: Maybe<Devices_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPostsArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPosts_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUserGroupsArgs = {
  distinct_on?: Maybe<Array<UserGroups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserGroups_Order_By>>;
  where?: Maybe<UserGroups_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUserGroups_AggregateArgs = {
  distinct_on?: Maybe<Array<UserGroups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserGroups_Order_By>>;
  where?: Maybe<UserGroups_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  devices?: Maybe<Devices_Bool_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  posts?: Maybe<Posts_Bool_Exp>;
  role?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  userGroups?: Maybe<UserGroups_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  devices?: Maybe<Devices_Arr_Rel_Insert_Input>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Posts_Arr_Rel_Insert_Input>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userGroups?: Maybe<UserGroups_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  role?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  role?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  createdAt?: Maybe<Order_By>;
  devices_aggregate?: Maybe<Devices_Aggregate_Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  posts_aggregate?: Maybe<Posts_Aggregate_Order_By>;
  role?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userGroups_aggregate?: Maybe<UserGroups_Aggregate_Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt'
}


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type AllGroupsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  where?: Maybe<Groups_Bool_Exp>;
  orderBy?: Maybe<Array<Groups_Order_By> | Groups_Order_By>;
}>;


export type AllGroupsQuery = (
  { __typename?: 'query_root' }
  & { groups: Array<(
    { __typename?: 'groups' }
    & Pick<Groups, 'id' | 'name' | 'description' | 'createdAt' | 'updatedAt' | 'photoUrl'>
    & { location?: Maybe<(
      { __typename?: 'locations' }
      & Pick<Locations, 'id' | 'name' | 'city' | 'country' | 'countryCode' | 'formattedAddress' | 'latitude' | 'longitude' | 'state'>
    )> }
  )> }
);

export type AllPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  where?: Maybe<Posts_Bool_Exp>;
  orderBy?: Maybe<Array<Posts_Order_By> | Posts_Order_By>;
}>;


export type AllPostsQuery = (
  { __typename?: 'query_root' }
  & { posts: Array<(
    { __typename?: 'posts' }
    & Pick<Posts, 'id' | 'body' | 'createdAt' | 'updatedAt' | 'photoUrl'>
    & { user?: Maybe<(
      { __typename?: 'users' }
      & Pick<Users, 'name' | 'id'>
    )> }
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & Pick<Users, 'id' | 'email' | 'createdAt' | 'updatedAt'>
  )> }
);

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "query_root"
    },
    "mutationType": {
      "name": "mutation_root"
    },
    "subscriptionType": {
      "name": "subscription_root"
    },
    "types": [
      {
        "kind": "OBJECT",
        "name": "devices",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "users"
              }
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "devices_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "devices_aggregate_fields"
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "devices"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "devices_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "devices_max_fields"
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "devices_min_fields"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "devices_max_fields",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "devices_min_fields",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "devices_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "devices"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "isPrivate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "location",
            "type": {
              "kind": "OBJECT",
              "name": "locations"
            },
            "args": []
          },
          {
            "name": "locationId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "photo",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "photoUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "posts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "posts"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "posts_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "posts_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "userGroups",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "userGroups"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "userGroups_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "userGroups_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "groups_aggregate_fields"
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groups"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "groups_max_fields"
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "groups_min_fields"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups_max_fields",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "locationId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "photo",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "photoUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups_min_fields",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "locationId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "photo",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "photoUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groups"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations",
        "fields": [
          {
            "name": "city",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "country",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "countryCode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "formattedAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "latitude",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "state",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "locations_aggregate_fields"
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "locations"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_aggregate_fields",
        "fields": [
          {
            "name": "avg",
            "type": {
              "kind": "OBJECT",
              "name": "locations_avg_fields"
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "locations_max_fields"
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "locations_min_fields"
            },
            "args": []
          },
          {
            "name": "stddev",
            "type": {
              "kind": "OBJECT",
              "name": "locations_stddev_fields"
            },
            "args": []
          },
          {
            "name": "stddev_pop",
            "type": {
              "kind": "OBJECT",
              "name": "locations_stddev_pop_fields"
            },
            "args": []
          },
          {
            "name": "stddev_samp",
            "type": {
              "kind": "OBJECT",
              "name": "locations_stddev_samp_fields"
            },
            "args": []
          },
          {
            "name": "sum",
            "type": {
              "kind": "OBJECT",
              "name": "locations_sum_fields"
            },
            "args": []
          },
          {
            "name": "var_pop",
            "type": {
              "kind": "OBJECT",
              "name": "locations_var_pop_fields"
            },
            "args": []
          },
          {
            "name": "var_samp",
            "type": {
              "kind": "OBJECT",
              "name": "locations_var_samp_fields"
            },
            "args": []
          },
          {
            "name": "variance",
            "type": {
              "kind": "OBJECT",
              "name": "locations_variance_fields"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_avg_fields",
        "fields": [
          {
            "name": "latitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_max_fields",
        "fields": [
          {
            "name": "city",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "country",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "countryCode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "formattedAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "latitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "state",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_min_fields",
        "fields": [
          {
            "name": "city",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "country",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "countryCode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "formattedAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "latitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "state",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "locations"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_stddev_fields",
        "fields": [
          {
            "name": "latitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_stddev_pop_fields",
        "fields": [
          {
            "name": "latitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_stddev_samp_fields",
        "fields": [
          {
            "name": "latitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_sum_fields",
        "fields": [
          {
            "name": "latitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_var_pop_fields",
        "fields": [
          {
            "name": "latitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_var_samp_fields",
        "fields": [
          {
            "name": "latitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "locations_variance_fields",
        "fields": [
          {
            "name": "latitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "longitude",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "mutation_root",
        "fields": [
          {
            "name": "delete_devices",
            "type": {
              "kind": "OBJECT",
              "name": "devices_mutation_response"
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_devices_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "devices"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_groups",
            "type": {
              "kind": "OBJECT",
              "name": "groups_mutation_response"
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_groups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groups"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_locations",
            "type": {
              "kind": "OBJECT",
              "name": "locations_mutation_response"
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_locations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "locations"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_posts",
            "type": {
              "kind": "OBJECT",
              "name": "posts_mutation_response"
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_posts_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "posts"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_userGroups",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups_mutation_response"
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_userGroups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_users",
            "type": {
              "kind": "OBJECT",
              "name": "users_mutation_response"
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_users_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "users"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "insert_devices",
            "type": {
              "kind": "OBJECT",
              "name": "devices_mutation_response"
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_devices_one",
            "type": {
              "kind": "OBJECT",
              "name": "devices"
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_groups",
            "type": {
              "kind": "OBJECT",
              "name": "groups_mutation_response"
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_groups_one",
            "type": {
              "kind": "OBJECT",
              "name": "groups"
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_locations",
            "type": {
              "kind": "OBJECT",
              "name": "locations_mutation_response"
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_locations_one",
            "type": {
              "kind": "OBJECT",
              "name": "locations"
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_posts",
            "type": {
              "kind": "OBJECT",
              "name": "posts_mutation_response"
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_posts_one",
            "type": {
              "kind": "OBJECT",
              "name": "posts"
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_userGroups",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups_mutation_response"
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_userGroups_one",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups"
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_users",
            "type": {
              "kind": "OBJECT",
              "name": "users_mutation_response"
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_users_one",
            "type": {
              "kind": "OBJECT",
              "name": "users"
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "update_devices",
            "type": {
              "kind": "OBJECT",
              "name": "devices_mutation_response"
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_devices_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "devices"
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_groups",
            "type": {
              "kind": "OBJECT",
              "name": "groups_mutation_response"
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_groups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groups"
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_locations",
            "type": {
              "kind": "OBJECT",
              "name": "locations_mutation_response"
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_locations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "locations"
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_posts",
            "type": {
              "kind": "OBJECT",
              "name": "posts_mutation_response"
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_posts_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "posts"
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_userGroups",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups_mutation_response"
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_userGroups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups"
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_users",
            "type": {
              "kind": "OBJECT",
              "name": "users_mutation_response"
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_users_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "users"
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "posts",
        "fields": [
          {
            "name": "body",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "group",
            "type": {
              "kind": "OBJECT",
              "name": "groups"
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "photoUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "users"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "posts_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "posts_aggregate_fields"
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "posts"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "posts_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "posts_max_fields"
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "posts_min_fields"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "posts_max_fields",
        "fields": [
          {
            "name": "body",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "photoUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "posts_min_fields",
        "fields": [
          {
            "name": "body",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "photoUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "posts_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "posts"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "query_root",
        "fields": [
          {
            "name": "devices",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "devices"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "devices_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "devices_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "devices_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "devices"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "groups",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groups"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groups_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groups_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groups"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "locations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "locations"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "locations_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "locations_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "locations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "locations"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "posts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "posts"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "posts_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "posts_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "posts_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "posts"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "userGroups",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "userGroups"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "userGroups_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "userGroups_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "userGroups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "users",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "users"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "users_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "users"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "subscription_root",
        "fields": [
          {
            "name": "devices",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "devices"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "devices_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "devices_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "devices_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "devices"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "groups",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groups"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groups_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groups_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groups"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "locations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "locations"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "locations_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "locations_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "locations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "locations"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "posts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "posts"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "posts_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "posts_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "posts_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "posts"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "userGroups",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "userGroups"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "userGroups_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "userGroups_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "userGroups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "users",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "users"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "users_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "users"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "userGroups",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "group",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groups"
              }
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "isAdmin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "isFounder",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "users"
              }
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "userGroups_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups_aggregate_fields"
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "userGroups"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "userGroups_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups_max_fields"
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "userGroups_min_fields"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "userGroups_max_fields",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "userGroups_min_fields",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "userGroups_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "userGroups"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "devices",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "devices"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "devices_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "devices_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "posts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "posts"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "posts_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "posts_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "role",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "userGroups",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "userGroups"
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "userGroups_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "userGroups_aggregate"
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "users_aggregate_fields"
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "users"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "users_max_fields"
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "users_min_fields"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users_max_fields",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "role",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users_min_fields",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "role",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "users"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__Schema",
        "fields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__Type"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "queryType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "__Type"
              }
            },
            "args": []
          },
          {
            "name": "mutationType",
            "type": {
              "kind": "OBJECT",
              "name": "__Type"
            },
            "args": []
          },
          {
            "name": "subscriptionType",
            "type": {
              "kind": "OBJECT",
              "name": "__Type"
            },
            "args": []
          },
          {
            "name": "directives",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__Directive"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__Type",
        "fields": [
          {
            "name": "kind",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "specifiedByUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "fields",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Field"
                }
              }
            },
            "args": [
              {
                "name": "includeDeprecated",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "interfaces",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Type"
                }
              }
            },
            "args": []
          },
          {
            "name": "possibleTypes",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Type"
                }
              }
            },
            "args": []
          },
          {
            "name": "enumValues",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__EnumValue"
                }
              }
            },
            "args": [
              {
                "name": "includeDeprecated",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "inputFields",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__InputValue"
                }
              }
            },
            "args": [
              {
                "name": "includeDeprecated",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "ofType",
            "type": {
              "kind": "OBJECT",
              "name": "__Type"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__Field",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "args",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__InputValue"
                  }
                }
              }
            },
            "args": [
              {
                "name": "includeDeprecated",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "__Type"
              }
            },
            "args": []
          },
          {
            "name": "isDeprecated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "deprecationReason",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__InputValue",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "__Type"
              }
            },
            "args": []
          },
          {
            "name": "defaultValue",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isDeprecated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "deprecationReason",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__EnumValue",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isDeprecated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "deprecationReason",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__Directive",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isRepeatable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "locations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "args",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__InputValue"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;

export const AllGroupsDocument = gql`
    query allGroups($limit: Int!, $offset: Int!, $where: groups_bool_exp, $orderBy: [groups_order_by!]) {
  groups(limit: $limit, offset: $offset, where: $where, order_by: $orderBy) {
    id
    name
    description
    createdAt
    updatedAt
    photoUrl
    location {
      id
      name
      city
      country
      countryCode
      formattedAddress
      latitude
      longitude
      state
    }
  }
}
    `;

export function useAllGroupsQuery(options: Omit<Urql.UseQueryArgs<AllGroupsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllGroupsQuery>({ query: AllGroupsDocument, ...options });
};
export const AllPostsDocument = gql`
    query allPosts($limit: Int!, $offset: Int!, $where: posts_bool_exp, $orderBy: [posts_order_by!]) {
  posts(limit: $limit, offset: $offset, where: $where, order_by: $orderBy) {
    id
    body
    createdAt
    updatedAt
    photoUrl
    user {
      name
      id
    }
  }
}
    `;

export function useAllPostsQuery(options: Omit<Urql.UseQueryArgs<AllPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllPostsQuery>({ query: AllPostsDocument, ...options });
};
export const UsersDocument = gql`
    query users {
  users {
    id
    email
    createdAt
    updatedAt
  }
}
    `;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};