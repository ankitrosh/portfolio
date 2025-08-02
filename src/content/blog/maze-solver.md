---
title: "Maze Solver with Enviro: Randomized Obstacle Navigation"
date: "2025-03-20"
description: "A walkthrough of building a maze-solving robot using Enviro, featuring a randomized turn algorithm to avoid loops."
excerpt: "Learn how we configured a static maze in Enviro and implemented a randomized left/right turn strategy to guarantee eventual maze completion."
categories: ["Robotics", "Simulation", "Maze Solving"]
tags: ["Enviro", "Maze Solver", "Robotics", "Randomized Algorithm"]
---

---

# Maze Solver with Enviro: Randomized Obstacle Navigation

In this final project for EEP 520 (Winter 2025), we tasked a simulated robot to autonomously navigate and solve a static maze built in the Enviro simulator. By combining simple obstacle detection with a randomized turn strategy, we ensured the robot never becomes trapped in loops and will eventually reach the maze exit.

---

## Overview

The maze environment is constructed using Enviro’s static-wall primitives. The robot begins in a **moving_forward** state, advancing until its front distance sensor detects a wall. At that point, it transitions to a **rotating** state, executes a series of randomized and fallback turns, then resumes forward motion. This two-state design keeps the control logic straightforward and responsive to obstacles.

---

## Randomized Turn Algorithm

A naive left-first or right-first strategy can cause the robot to circle indefinitely. To avoid this, we implemented a three-step randomized algorithm:

1. **Random initial turn**: Choose **left** or **right** at random and rotate.
2. **Check path**: If the chosen direction is clear, move forward; otherwise, rotate to the opposite side.
3. **Fallback U-turn**: If both sides are blocked, execute a 180° turn.

By injecting randomness at the initial choice, the robot cannot get stuck repeating the same dead-end pattern—it eventually explores all paths and exits the maze.

---

## Implementation Details

- **States**:

  - `moving_forward`: drive straight at constant speed
  - `rotating`: execute left/right/U-turn based on sensor checks

- **Obstacle detection**: Continuous front-sonar readings trigger state change.
- **Enviro setup**: Maze walls defined as static agents; robot runs as a mobile agent with two behaviors.
- **Randomness source**: Pseudorandom function seeded uniformly at start.

Sensors and actuators are managed within Enviro’s event loop, ensuring non-blocking control and smooth transitions between states.

---

## Key Challenges & Lessons Learned

- **Avoiding loops**: A purely deterministic turn order caused endless cycles; randomness breaks symmetry and guarantees progress.
- **Collision handling**: Built-in `move_toward` exhibited erratic wall collisions; custom state machine provided smoother navigation.
- **Simulation fidelity**: Enviro’s agent abstraction made it easy to model sensors, actuators, and environment in JavaScript/C++.

---

## Acknowledgements

- **Enviro Simulator** by Klavins Lab for multi-agent experimentation.
- Maze-solving algorithm inspired by [Instructables Robot Maze Solver](https://www.instructables.com/Robot-Maze-Solver/).

_With this approach, our Enviro-based robot reliably completes the labyrinth, demonstrating how simple rules augmented with randomness can solve complex navigation tasks._
