export {createBuildable, s, when} from "@batono/core";
import {bt as btCore, type Bt as BtCore} from "@batono/core";
import {bt as btUI, type Bt as BtUi} from "@batono/ui";

export const bt: BtCore & BtUi = {
  ...btCore,
  ...btUI,
} satisfies BtCore & BtUi

export type Bt = typeof bt
