---
title: "The AT Protocol"
subtitle: "A federated model for social apps, account portability, and open schemas"
date: 2025-01-29
---
Most mainstream social products are centralized: one company hosts identity, graph, and feed ranking. The AT Protocol (Authenticated Transfer Protocol) is an attempt to separate those concerns so clients and hosts can interoperate more like email than like a single walled app.

## What it is

AT Protocol is a federated social networking protocol. Multiple servers can speak the same protocol. Users can, in principle, choose a provider or run their own Personal Data Server (PDS) while remaining reachable to others on the network.

Bluesky is the best-known client and network built on it. The protocol and the app are related but not identical; the interesting part for engineers is the protocol design.

## Design ideas

A few properties are central:

- **Account portability** — Identity and repository data are meant to move between hosts without losing the social graph.
- **Composable feeds** — Ranking and timeline logic can sit outside a single opaque server algorithm.
- **Lexicon** — A schema system for interoperable record types across apps and services.
- **Performance goals** — The project explicitly targets responsiveness at consumer scale, which earlier decentralized social efforts often struggled with.

## Why people care

Centralized social platforms concentrate moderation, ranking, and data custody. A protocol-first approach does not remove hard problems (abuse, spam, discovery), but it changes who can implement alternatives without rebuilding the entire identity layer. For developers, that is the practical appeal: portable accounts and open schemas instead of permanent vendor lock-in.

## Status

The protocol and Bluesky have been evolving quickly. For current details, the canonical references are more useful than any single overview:

- [atproto.com](https://atproto.com)
- [Bluesky docs](https://docs.bsky.app/)
