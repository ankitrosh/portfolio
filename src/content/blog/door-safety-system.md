---
title: "Building a Smart Security Door and Monitoring System with ESP32 & FreeRTOS"
date: "2025-05-25"
description: "A deep dive into dual-core FreeRTOS programming, sensor integration, and real-time embedded design for a responsive security system."
excerpt: "Integrating RFID access control, motion detection, and real-time logging on an ESP32 demonstrates the power of multitasking in IoT security applications."
categories: ["Embedded Systems", "IoT", "Security"]
tags: ["ESP32", "FreeRTOS", "RFID", "Security", "Dual-Core", "IoT"]
---

# Building a Smart Security Door and Monitoring System with ESP32 & FreeRTOS

This project implements a Smart Security Door and Monitoring System that seamlessly integrates RFID-based access control, intrusion sensing via PIR and ultrasonic sensors, and real-time event logging with an RTC. By leveraging the ESP32’s dual-core architecture and FreeRTOS primitives—queues, semaphores, and timers—we achieved responsive, non-blocking operation capable of handling concurrent tasks across two processor cores :contentReference[oaicite:10]{index=10}.

---

## System Overview

We structured the system into two cores to isolate critical functions:

- **Core 1** handles RFID authentication, servo-based door unlocking, LCD status updates, and time-stamped logging via the DS3231 RTC.
- **Core 2** continuously samples motion (PIR) and proximity (ultrasonic) sensors at 50 Hz, enqueues sensor data, and triggers visual alerts when unauthorized presence is detected :contentReference[oaicite:11]{index=11}.

A serial print interface provides real-time debugging, while a one-shot software timer auto-locks the door and turns off the LCD backlight after inactivity.

---

## Hardware Components

Key peripherals include:

- **RC522 RFID Reader** for user authentication
- **SG90 Servo Motor** to actuate the door latch
- **PIR Motion Sensor & Ultrasonic Module** for dual-mode intrusion detection
- **DS3231 RTC** for reliable event timestamps
- **LCD Display** to indicate lock status and floodlight functionality :contentReference[oaicite:12]{index=12}

Power is delivered via a wall supply or MB102 breadboard regulator, ensuring stable operation under load.

---

## Dual-Core Task Architecture

By pinning tasks to cores, we avoided blocking interactions:

- **Core 1 Tasks**: `taskRFIDReader` polls for tags every 500 ms, queues UID strings; `taskPrinter` consumes UIDs, validates against a hard-coded list, and notifies the servo and LCD tasks upon authorization or denial :contentReference[oaicite:13]{index=13}.
- **Core 2 Tasks**: `sensorReadTask` samples ultrasonic echoes and PIR readings via ISR-driven notifications at a steady 20 ms interval; `sensorProcessTask` aggregates a sliding window of five samples to detect movement and proximity, then signals the LCD floodlight with timestamped logging :contentReference[oaicite:14]{index=14}.

Inter-task communication uses two FreeRTOS queues (RFID and sensor), while a binary semaphore protects the shared I²C bus for LCD and RTC access.

---

## Real-Time Logging & Actuation

Upon successful tag validation, the system:

1. **Unlocks** the door via a servo notification.
2. **Logs** the event with a precise RTC timestamp over I²C.
3. **Starts** a one-shot lock timer to re-engage the latch after 10 s.
4. **Turns on** the LCD backlight; a second timer reverts it after inactivity :contentReference[oaicite:15]{index=15}.

Unauthorized attempts trigger an immediate lock and denial log entry, ensuring a complete audit trail.

---

## Challenges & Solutions

- **Concurrency Management**: FreeRTOS queues decouple I/O sampling from processing, and semaphores arbitrate I²C bus usage, preventing data races :contentReference[oaicite:16]{index=16}.
- **Non-Blocking Sensor I/O**: We replaced busy-wait loops with hardware timers and ISR notifications, achieving sub-microsecond timing for ultrasonic echoes without blocking Core 2 :contentReference[oaicite:17]{index=17}.
- **Resource Safety**: Dual-core task assignment and careful API use (e.g., `xTaskCreatePinnedToCore`) ensured tasks on one core did not stall those on the other.

---

## Lessons Learned

- **Dual-Core Efficiency**: Partitioning input and output tasks across cores maximizes responsiveness.
- **RTOS Primitives**: Queues and semaphores provide clear, maintainable concurrency control.
- **Hardware Abstraction**: Centralizing pin and peripheral definitions in shared headers simplified multi-task access and scaled well as features grew :contentReference[oaicite:18]{index=18}.

---

## Conclusion

By combining the ESP32’s dual-core capabilities with FreeRTOS’s multitasking features, we built a secure, responsive Smart Security Door system. This project highlights the importance of clear task separation, real-time logging, and robust synchronization in IoT security applications—and provides a solid foundation for future enhancements like networked logging, camera integration, or biometric authentication.
::contentReference[oaicite:9]{index=9}
