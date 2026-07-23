import type { ComponentType } from "react";
import type { Block } from "@/lib/content/schema";
import { ProseBlock } from "./ProseBlock";
import { CalloutBlock } from "./CalloutBlock";
import { CardGridBlock } from "./CardGridBlock";
import { IconListBlock } from "./IconListBlock";
import { CardListBlock } from "./CardListBlock";
import { ChipFlowBlock } from "./ChipFlowBlock";
import { RoadmapBlock } from "./RoadmapBlock";
import { TabsBlock } from "./TabsBlock";
import { AccordionBlock } from "./AccordionBlock";
import { TimelineBlock } from "./TimelineBlock";
import { FishboneBlock } from "./FishboneBlock";
import { PositioningMapBlock } from "./PositioningMapBlock";
import { ComparisonTableBlock } from "./ComparisonTableBlock";

// Keyed by discriminant so each entry's component is checked against the
// block shape for that specific `type`, not a generic catch-all — e.g.
// registering `ProseBlock` under `callout` would fail right here, at the
// object-literal check, rather than at some runtime call site.
//
// `Block` is a `z.discriminatedUnion` of 13 members as of Task 3c.1 (11 as of
// 3b.1, plus `positioning-map`/`comparison-table` here). That's fine for THIS file: each
// property of the object literal below is still checked independently
// against its own `Extract<Block, { type: K }>`, so the mapped type here
// continues to type-check cleanly regardless of how many members `Block`
// has. What does NOT come free is a *consumer* doing a runtime-widened
// lookup — `BLOCK_REGISTRY[block.type]` inside a `.map()` over `Block[]`,
// where `block.type` is no longer narrowed to a single literal — because
// TS can't verify a widened `block.type` union against a union of
// component call signatures. `CaseStudyShell.tsx` does exactly that; its
// one call site carries a narrowing cast (see that file's comment) to
// restore the build — landed in a standalone fix commit ahead of this
// task, not something 3a.2 itself needed to do.
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
  tabs: TabsBlock,
  accordion: AccordionBlock,
  timeline: TimelineBlock,
  fishbone: FishboneBlock,
  "positioning-map": PositioningMapBlock,
  "comparison-table": ComparisonTableBlock,
};
