import { removeFilters } from "./remove";
import { selectorFilters } from "./selector";
import { replaceFilters } from "./replace";
import { markdownFilters } from "./markdown";
import { textFilters } from "./text";
import { urlFilters } from "./url";
import type { FilterFn } from "../types";

export const builtinFilters: Record<string, FilterFn> = {
  ...selectorFilters,
  ...removeFilters,
  ...replaceFilters,
  ...markdownFilters,
  ...textFilters,
  ...urlFilters,
};
