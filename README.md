# batono

> Server-driven UI interactions for the web.

[![npm version](https://badge.fury.io/js/batono.svg)](https://www.npmjs.com/package/batono)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)
[![codecov](https://codecov.io/gh/batono-js/batono/branch/main/graph/badge.svg)](https://codecov.io/gh/batono-js/batono)

`batono` is the all-in-one entry point for the Batono protocol. It combines `@batono/core` and `@batono/ui` into a
single import — the backend defines an `InteractionGraph`, the frontend renders it.

---

## Features

- ✅ Single import for the full Batono stack
- ✅ Backend defines layout, content and action flows
- ✅ Frontend receives a self-contained, typed JSON graph
- ✅ Automatic action gathering — no manual registration
- ✅ Sequential, parallel and nested action flows
- ✅ Per-response graph tokens for structural consistency
- ✅ Fully typed — result interfaces for every node type

---

## Installation

```bash
npm install batono
```

---

## Basic Usage

```ts
import {bt} from 'batono'

const bookUnit = bt.defineAction(
  bt.request('POST', '/bookings')
)

const addNote = bt.defineAction(
  bt.modal('New Note')
)

const graph = bt.graph(
  bt.rows(
    bt.row(
      bt.header('Batman Forever', {
        avatar: 'BF',
        actions: bt.actionButtons(
          bt.action('+ Book Unit', bookUnit, {variant: 'primary'}),
          bt.action('+ Note', addNote, {variant: 'secondary'})
        )
      })
    ),
    bt.row(
      bt.section('Personal Data', bt.rows(
        bt.row(
          bt.field('First Name', 'Batman'),
          bt.field('Last Name', 'Forever')
        ),
        bt.row(
          bt.field('Email', null),
          bt.field('Phone', null)
        )
      )).withIcon('🧑')
    )
  )
)

res.json(graph)
```

---

## Action Flows

### Confirm then submit

```ts
const deleteUser = bt.defineAction(
  bt.sequential(
    bt.modal('Are you sure?'),
    bt.request('DELETE', '/users/42')
  )
)
```

### Fire and forget

```ts
const bookAndNotify = bt.defineAction(
  bt.parallel(
    bt.request('POST', '/bookings'),
    bt.request('POST', '/notifications')
  )
)
```

### Reusable actions with payload

```ts
const bookUnit = (id: number) => bt.defineAction(
  bt.request('POST', '/bookings').withPayload({id})
)

bt.action('Book Unit A', bookUnit(1))
bt.action('Book Unit B', bookUnit(2))
```

---

## Output Format

The serialized graph contains a unique `$graph` token per response. Every node carries the same token — the renderer
uses it to verify all nodes belong to the same response.

```json
{
  "$schema": "batono.interaction-graph.v1",
  "$graph": "a3f9x1b2",
  "layout": {
    "$schema": "batono.interaction-graph.v1",
    "$graph": "a3f9x1b2",
    "type": "rows",
    "items": [
      ...
    ]
  },
  "actions": {
    "action_1": [
      {
        "$schema": "batono.interaction-graph.v1",
        "$graph": "a3f9x1b2",
        "type": "request",
        "method": "POST",
        "url": "/bookings"
      }
    ]
  }
}
```

---

## Frontend Types

All result interfaces are available as named exports:

```ts
import type {
  Defined,
  HeaderResult,
  SectionResult,
  FieldResult,
  RowsResult,
  RowResult,
  ActionResult,
  NoteResult,
  StatResult,
  MetaResult,
  TextResult,
  LinkResult,
  InlineResult,
  RequestActionResult,
  ModalActionResult,
  SequentialActionResult,
  ParallelActionResult,
  ActionReferenceResult,
  InteractionGraphPayload
} from 'batono'
```

---

## Packages

`batono` is the combined entry point. The underlying packages are also available independently if you need a leaner
setup:

| Package        | Contents                                                      |
|----------------|---------------------------------------------------------------|
| `@batono/core` | `InteractionGraph`, `DefinedAction`, `sequential`, `parallel` |
| `@batono/ui`   | Layout, definitions, actions, result types                    |
| `batono`       | Everything combined                                           |

---

## Design Goals

- **Backend owns the interaction** — layout, content and action flows are defined server-side
- **Frontend just renders** — no business logic in the renderer, only type-safe interpretation
- **Predictable output** — every response is a self-contained, verifiable graph
- **Composable** — every node is an `IBuildable`, freely nestable and extensible
- **Progressive** — start with `batono`, split into `@batono/core` and `@batono/ui` when needed

---

## Why the name “Batono”?

Batono is inspired by the baton — the conductor’s stick.

Just as a conductor defines the tempo and flow of an orchestra,
Batono lets the backend define the structure, flow, and interactions of the UI.

The frontend doesn’t invent the music — it performs it.

---

## License

MIT
