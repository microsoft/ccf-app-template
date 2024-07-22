import * as ccfapp from "@microsoft/ccf-app";

function parse_request_query(request: ccfapp.Request): {
  [key: string]: string;
} {
  const elements = request.query.split("&");
  const obj = {};
  for (const kv of elements) {
    const [k, v] = kv.split("=");
    obj[k] = v;
  }
  return obj;
}

const recordsMap = ccfapp.typedKv("records", ccfapp.string, ccfapp.string);

export function write(request: ccfapp.Request): ccfapp.Response {
  const parsedQuery = parse_request_query(request);
  if (parsedQuery.id === undefined) {
    return { body: { error: "Missing query parameter 'id'" } };
  }
  const params = request.body.json();

  recordsMap.set(parsedQuery.id, params.msg);
  return {};
}

export function read(request: ccfapp.Request): ccfapp.Response {
  const parsedQuery = parse_request_query(request);
  if (parsedQuery.id === undefined) {
    return { body: { error: "Missing query parameter 'id'" } };
  }

  const msg = recordsMap.get(parsedQuery.id);
  if (msg === undefined) {
    return {
      body: { error: `Cannot find record for id \"${parsedQuery.id}\".` },
    };
  }
  return { body: msg };
}
