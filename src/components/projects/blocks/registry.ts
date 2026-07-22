import type { ComponentType } from "react";
import type { Block } from "@/lib/content/schema";
import { ProseBlock } from "./ProseBlock";
import { CalloutBlock } from "./CalloutBlock";
import { CardGridBlock } from "./CardGridBlock";
import { IconListBlock } from "./IconListBlock";
import { CardListBlock } from "./CardListBlock";
import { ChipFlowBlock } from "./ChipFlowBlock";
import { RoadmapBlock } from "./RoadmapBlock";

// Keyed by discriminant so each entry's component is checked against the
// block shape for that specific `type`, not a generic catch-all — e.g.
// registering `ProseBlock` under `callout` would fail right here, at the
// object-literal check, rather than at some runtime call site.
//
// `Block` became a real `z.discriminatedUnion` of 7 members in Task 3a.1
// (was a single-member alias before). That's fine for THIS file: each
// property of the object literal below is still checked independently
// against its own `Extract<Block, { type: K }>`, so the mapped type here
// continues to type-check cleanly regardless of how many members `Block`
// has. What does NOT come free is a *consumer* doing a runtime-widened
// lookup — `BLOCK_REGISTRY[block.type]` inside a `.map()` over `Block[]`,
// where `block.type` is no longer narrowed to a single literal — because
// TS can't verify a widened `block.type` union against a union of
// component call signatures. `CaseStudyShell.tsx` does exactly that today;
// fixing its call site (a narrowing helper or equivalent) is out of scope
// here per the task brief — that's the "shell extension" task 3a.2 does.
type BlockRegistry = {
  [K in Block["type"]]: ComponentType<{ data: Extract<Block, { type: K }> }>;
};

export const BLOCK_REGISTRY: BlockRegistry = {
  prose: ProseBlock,
  callout: CalloutBlock,
  "card-grid": CardGridBlock,
  "icon-list": IconListBlock,
  "card-list": CardListBlock,
  "chip-flow": ChipFlowBlock,
  roadmap: RoadmapBlock,
};
