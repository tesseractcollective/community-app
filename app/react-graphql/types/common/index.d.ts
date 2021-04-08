type IJsonNotNull = string | number | boolean | IJsonObject | IJsonArray;
type IJsonAny = IJsonNotNull | null;

interface IJsonObject {
  [key: string]: any;
}

interface IJsonNoNullsObject {
  [key: string]: IJsonNotNull;
}

type IJsonArray = IJsonAny[];

interface IJsonMapOfArraysObject {
  [key: string]: IJsonArray;
}