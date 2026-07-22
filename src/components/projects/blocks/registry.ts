import type { ComponentType } from "react";
import type { Block } from "@/lib/content/schema";
import { ProseBlock } from "./ProseBlock";

// Keyed by discriminant so each entry's component is checked against the
// block shape for that specific `type`, not a generic catch-all. Precise
// today because there is exactly one member; once BlockSchema becomes a
// real discriminated union (later stage), a generic lookup like
// `BLOCK_REGISTRY[block.type]` inside a `.map()` over `Block[]` will need a
// narrowing helper at the call site (TS can't verify a widened `block.type`
// union against a union of component call signatures) — deliberately not
// solved here, see task brief.
type BlockRegistry = {
  [K in Block["type"]]: ComponentType<{ data: Extract<Block, { type: K }> }>;
};

export const BLOCK_REGISTRY: BlockRegistry = {
  prose: ProseBlock,
};
