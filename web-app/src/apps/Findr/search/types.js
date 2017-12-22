//@flow
export type TSimpleQuery = { text: ?string };
export type TComplexQuery = TSimpleQuery & {
    author: ?string,
    offset: ?number,
    limit: ?number,
    engine: string | Array<string>,
}
export const RESULT_TYPES = {google_autocomplete: 'google.autocomplete'};
export type TSimpleResult = { type: string, title: string }
export type TRichResult = TSimpleResult & { date: string, snippet: string }
export type TQueryResult = {
    items: Array<TSimpleResult | TRichResult>
}

