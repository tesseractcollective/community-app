export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  photoUrl?: string;
  location?: Location;
  createdAt: string;
  updatedAt: string;
}

const graphqlUrl = "https://api.thelitas.co/v1/graphql";

async function fetchGraphQl<T>(query: string, queryKey: string, variables?: {[key: string]: any}): Promise<any> {
  const result = await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": "3340b2d1-7e14-467c-8ba7-81b5da94331f",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    })
  });
  if (result.ok) {
    const responseObject = await result.json();
    if (responseObject.data) {
      return responseObject.data[queryKey] as T;
    } else if (responseObject.errors) {
      // TODO: format errors for display
      throw new Error(responseObject.errors);
    }
  }
  throw new Error('unable to fetch');
}

export async function fetchGroups(): Promise<Group[]> {
  const query = `query allGroups {
    groups {
      id
      name
      description
      photoUrl
      location {
        name
        latitude
        longitude
      }
      createdAt
      updatedAt
    }
  }
  `
  return fetchGraphQl(query, "groups");
}