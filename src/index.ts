export type {
  LegislationEntry,
  LegislationSegment,
  LegislationStatus,
} from './types.js';

export { LEGISLATION_LIBRARY } from './library.js';

export {
  applicableLegislation,
  canonicalLegislationKey,
  extractBaseLegislation,
  findLegislation,
  formatAbnt,
  isApplicable,
  matchesScope,
  pendingVerification,
  searchLegislation,
  type LegislationFilter,
  type LegislationScope,
} from './query.js';

export { UF_OPTIONS, isRioState, normalizeStateName, toUF } from './uf.js';
