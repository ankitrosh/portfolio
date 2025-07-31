---
title: "Implementing a 5-Stage Pipelined RISC-V CPU: Hazards, Forwarding & PPA Trade-Offs"
date: "2025-07-31"
description: "A deep dive into extending a single-cycle RV32I design into a 5-stage pipeline, covering hazard resolution, forwarding techniques, and power-performance-area trade-offs."
excerpt: "Learn how to pipeline RISC-V instructions, detect and resolve hazards with forwarding and stalling, and analyze the impact on power, performance, and area."
categories: ["Computer Architecture", "Hardware Design"]
tags: ["RISC-V", "Pipelining", "Hazards", "Forwarding", "Performance", "VLSI"]
---

# Implementing a 5-Stage Pipelined RISC-V CPU: Hazards, Forwarding & PPA Trade-Offs

Moving from a single-cycle CPU to a pipelined design unlocks higher clock rates and instruction-level parallelism. In this lab, we refactored our RV32I datapath into five stages—IF, ID, EX, MEM, WB—added pipeline registers, and tackled the added complexity of hazards, forwarding, and resource trade-offs.

---

## Pipelining Overview

We split instruction execution into these sequential stages:

1. **Instruction Fetch (IF)** – read instruction memory and update PC
2. **Instruction Decode (ID)** – decode bits, generate control signals, read registers
3. **Execute (EX)** – perform ALU operations
4. **Memory (MEM)** – load/store data memory
5. **Writeback (WB)** – write results back to the register file

Pipeline registers (`IF/ID`, `ID/EX`, `EX/MEM`, `MEM/WB`) isolate each stage’s logic, shortening the critical path and increasing throughput. Ideally, a 5-stage pipeline yields up to a 5× speedup, though real gains depend on stage balancing and hazard penalties.

---

## Hazards & Forwarding

### Static vs. Dynamic Resolution

- **Static**: Compiler reorders instructions, inserts NOPs, or uses delay slots to avoid hazards. Simple but inflexible.
- **Dynamic**: Hardware detects hazards at runtime, employing forwarding, stalling, and branch prediction—more performant but adds complexity and silicon cost :contentReference[oaicite:5]{index=5}.

### Hazard Detection Unit (HDU)

**Inputs**:

- `IFID_rs1`, `IFID_rs2` (from IF/ID)
- `ID/EX_rd`, `ID/EX_mem_read` (from ID/EX) :contentReference[oaicite:6]{index=6}

**Operation**: On a load-use hazard (when an instruction in EX stage is a load and the next instruction needs that register), the HDU asserts its stall signal.

### Register Control on Stall

- **IF/ID & PC**: Stall PC write enable to fetch the same instruction again.
- **ID/EX**: Flush control signals (insert a bubble) to create a one-cycle gap :contentReference[oaicite:7]{index=7}.

### Forwarding Paths

- **EX/MEM forwarding**: Bypass result from EX/MEM register to ALU input for the next instruction.
- **MEM/WB forwarding**: Bypass data from MEM/WB register when a two-cycle gap exists (e.g. load-use after one NOP).

### Control Hazards & Branch Prediction

We implement a simple “predict-not-taken” strategy:

- If mispredicted, flush the two youngest instructions by zeroing IF/ID and ID/EX, and update the PC to the target.

---

## Power, Performance & Area (PPA) Trade-Offs

### Effects of Increased Stages

- **Performance**: Higher clock frequency, increased throughput—but longer latency per instruction.
- **Power**: Dynamic power ↑ (higher toggle rate); static leakage ↑ (more registers & control logic).
- **Area**: More flip-flops for pipeline registers and extra forwarding/hazard detection hardware :contentReference[oaicite:8]{index=8}.

### Branch Resolution Penalty

Moving branch evaluation from EX to ID reduces misprediction penalty by one cycle (flush only one instruction instead of two), improving effective IPC.

### Unbalanced Stage Impact

A disproportionately long EX stage dictates the clock period for all stages, undercutting pipeline speedup. Splitting the EX stage (e.g., two add cycles for 32-bit adder) can rebalance stage delays.

---

## Implementation Highlights

- **Datapath Schematic**: Expanded single-cycle diagram to include IF/ID, ID/EX, EX/MEM, MEM/WB registers.
- **Control Logic**: Generated control signals per stage and injected them into pipeline registers.
- **HDU & Forwarding Unit**: Implemented in SystemVerilog using comparator and multiplexers, with thorough unit tests against Lab 2 benchmarks.
- **Branch Logic**: Integrated simple static predictor with flush control on misprediction.

---

## Lessons Learned

1. **Granularity matters**: Finer division of EX operations yields better clock periods.
2. **Forwarding vs. Stalling**: Forwarding minimizes stalls but can’t handle load-use—stalls are still necessary.
3. **Predict-Not-Taken**: Cheap to implement but higher penalty; hardware budget may justify two-bit predictors.

---

## Conclusion

This lab demonstrated that pipelining transforms CPU throughput at the cost of design complexity. By carefully balancing stage delays, implementing robust hazard detection/forwarding, and weighing PPA trade-offs, we achieved a high-frequency, correct RV32I pipeline. These principles underpin modern high-performance processors and provide a solid foundation for further enhancements—such as deeper pipelines or advanced branch predictors.
