---
title: "Real-Time Speech Emotion Recognition on Edge Devices with CNNs & MFE Augmentation"
date: "2025-07-31"
description: "How we built and deployed a lightweight CNN‐based emotion detector on an Arduino Nano 33 BLE Sense using Mel-filterbank Energy features."
excerpt: "Leveraging 1D CNNs and on-the-fly MFE preprocessing, we achieved robust on-device emotion classification for five emotional states."
categories: ["Machine Learning", "Embedded Systems", "Signal Processing"]
tags: ["CNN", "TinyML", "Emotion Recognition", "MFE", "Edge AI", "Arduino"]
---

# Real-Time Speech Emotion Recognition on Edge Devices with CNNs & MFE Augmentation

Deploying emotion recognition models on low-power hardware requires both compact architectures and realistic training data. In this project, we collected a balanced dataset of spoken phrases, extracted Mel-filterbank Energy (MFE) features, trained a 1D CNN in Edge Impulse Studio, and deployed the quantized model to an Arduino Nano 33 BLE Sense—all while visualizing live predictions via a Streamlit dashboard.

---

## Dataset and Challenge

### Data Collection

We recorded **250** audio clips (50 samples each for Happy, Sad, Angry, Fear, and Silence) in a controlled indoor environment, using identical spoken phrases to focus on tone rather than content :contentReference[oaicite:8]{index=8}.

### Data Preprocessing

Raw audio was converted into Mel-filterbank Energy representations and split 80:20 into **203** training and **47** test samples. We initially tested MFCCs but found MFE better captures emotional intonation :contentReference[oaicite:9]{index=9}.

### Core Challenges

- **Resource constraints:** Fitting both model and preprocessing on a microcontroller
- **Class balance:** Ensuring equal representation for each emotion
- **Realistic distortion:** Emulating recording variability without overfitting

---

## CNN Architecture

- **Input layer:** 3,960 MFE features
- **Reshape:** Aligns features into 40-column segments
- **1D Conv + Pooling (×2):** 8 then 16 filters (kernel=3)
- **Dropout:** 25% rate to prevent overfitting
- **Flatten + Softmax:** Outputs probabilities for 5 emotion classes
- **Quantization:** int8 compression for on-device efficiency :contentReference[oaicite:10]{index=10}.

---

## Training and Validation

- **Loss:** Categorical cross-entropy
- **Optimizer:** Adam (lr=0.001)
- **Epochs:** 30 with early stopping (patience=5)
- **Batch size:** 64

On the validation set, the model achieved an accuracy of **9.27%** with a loss of **0.24** :contentReference[oaicite:11]{index=11}.

---

## Deployment Pipeline

1. **Edge Impulse Studio** for end-to-end data acquisition, signal processing, model training, and quantization.
2. **Arduino Nano 33 BLE Sense** flashed with the int8 model—running MFE extraction and inference entirely on-device.
3. **Live Testing:** Verified real-time emotion predictions printed to the serial console :contentReference[oaicite:12]{index=12}.

---

## Web-Based Visualization

We built a **Streamlit** dashboard that reads serial output, plots live bar graphs of predicted emotions, and updates in real time—providing a clear demonstration interface for stakeholders :contentReference[oaicite:13]{index=13}.

---

## Lessons Learned

- **1D vs. 2D CNNs:** 1D convolutions along the MFE axis yielded better performance and lower complexity.
- **Feature choice:** MFE outperformed MFCC for emotion-focused tasks by highlighting energy patterns over spectral content.
- **On-the-fly augmentation:** Edge Impulse’s real-time jittering prevented overfitting without slowing inference.

---

## Future Work

- **GAN-based augmentation:** Generate synthetic emotional speech variants to address class imbalance and speaker diversity.
- **Voice activity & anomaly detection:** Pre-filter non-speech segments using isolation forests or autoencoders.
- **Multimodal fusion:** Combine audio features with facial micro-expressions or text sentiment for enhanced accuracy.
- **Emotion intensity estimation:** Extend classification to continuous intensity scoring via ordinal regression :contentReference[oaicite:14]{index=14}.

---

_This project demonstrates an efficient pipeline—from data collection and MFE preprocessing to CNN design, edge deployment, and live visualization—enabling accessible, privacy-preserving emotion recognition on embedded hardware._
