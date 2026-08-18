export type {
  LegislationEntry,
  LegislationSegment,
  LegislationStatus,
} from './types';

export { LEGISLATION_LIBRARY } from './library';

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
} from './query';

export { UF_OPTIONS, isRioState, normalizeStateName, toUF } from './uf';
