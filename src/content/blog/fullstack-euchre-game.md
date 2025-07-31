---
title: "Building a Full-Stack Euchre Game with React, TailwindCSS & FastAPI"
date: "2024-12-20"
description: "An inside look at how I built a real-time Euchre web app using React, TailwindCSS, shadcn/ui on the frontend and Python FastAPI on the backend."
excerpt: "Discover how I managed game state with React Query and custom hooks, and structured a modular FastAPI backend with robust testing for my Euchre card game."
categories: ["Full-Stack Development", "Game Development", "Web Applications"]
tags:
  [
    "React",
    "TailwindCSS",
    "shadcn-ui",
    "FastAPI",
    "State Management",
    "Testing",
  ]
---

# Building a Full-Stack Euchre Game with React, TailwindCSS & FastAPI

I recently launched a Euchre app that showcases a seamless blend of modern front-end tooling and a robust Python backend. In this post, I’ll walk through how I manage game state on the client using React Query and custom hooks, then dive deep into my modular REST API design in FastAPI and the testing strategy that ensures quality and reliability.

---

## Frontend Architecture

The UI is built with:

- **React** for component composition
- **TailwindCSS** for rapid utility-first styling
- **shadcn/ui** for pre-styled, accessible components

My folder structure looks like:

```bash
src/
├── components/       # shadcn/ui components + custom cards, buttons
├── hooks/            # custom React hooks (useGame, useAuth)
├── services/         # API client wrappers (React Query)
└── pages/            # route-based pages (Lobby, GameTable, Profile)
```

```bash
backend/
├── app/
│   ├── api/
│   │   ├── auth.py           # login, signup, JWT handling
│   │   ├── users.py          # profile, stats endpoints
│   │   ├── games/
│   │   │   ├── router.py     # /games endpoints
│   │   │   ├── models.py     # Pydantic schemas for Game, Move, Player
│   │   │   └── service.py    # business logic (deal cards, score hands)
│   ├── core/
│   │   ├── config.py         # settings, secrets
│   │   └── security.py       # password hashing, token utilities
│   ├── db/
│   │   ├── base.py           # session, connection
│   │   └── crud.py           # generic CRUD helpers
│   └── main.py               # FastAPI app instantiation
└── tests/
    ├── unit/                 # pure functions, service logic
    ├── integration/          # TestClient against live endpoints
    └── fixtures.py           # reusable test data

```

## Conclusion

This Euchre web app demonstrates how modern frontend libraries and a well-structured Python backend can unite to deliver a responsive, multiplayer gaming experience. By combining React Query for seamless data sync, a clear separation of UI vs. server state, and a modular FastAPI design with comprehensive testing, I built a maintainable codebase that can evolve—whether by adding chat, AI opponents, or extended statistics. Feel free to check out the full source and play a game of Euchre today!
