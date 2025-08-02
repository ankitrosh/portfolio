---
title: "Personalized Story Generation with Fine-Tuned LLMs"
date: "2024-03-15"
description: "How we distilled, quantized, and parameter-efficiently fine-tuned an LLM to produce more coherent, creative short stories."
excerpt: "By combining knowledge distillation, 4-bit quantization, and LoRA-based PEFT on the Writing Prompts dataset, we achieved marked gains in readability, diversity, and narrative consistency."
categories: ["Machine Learning", "Natural Language Processing"]
tags: ["LLM", "Fine-Tuning", "Quantization", "PEFT", "Story Generation"]
---

# Personalized Story Generation with Fine-Tuned LLMs

Generative LLMs can spin up stories from simple prompts—but off-the-shelf models often struggle with consistency and style. In this project, we distilled a large “teacher” model into a smaller “student,” applied 4-bit quantization, and leveraged QLoRA-based PEFT to fine-tune on the Kaggle Writing Prompts dataset. The result: a compact LLM that writes more readable, diverse, and emotionally engaging short stories.

## Dataset & Evaluation Metrics

- **Writing Prompts**: 300K human-written stories paired with prompts, covering genres like Fantasy, Sci-Fi, and Thriller.
- **Readability**: Flesch Reading Ease & Gunning Fog Index to measure clarity and accessibility.
- **Diversity**: Shannon Entropy to quantify vocabulary richness.
- **Tone**: Sentiment polarity & subjectivity to assess emotional engagement and factual balance.

By evaluating baseline models (ChatGPT, Gemini, DeepSeek) on these metrics, we identified DeepSeek-R1 as the best candidate for fine-tuning.

## Model Compression Techniques

1. **Knowledge Distillation**

   - Teacher: DeepSeek-R1
   - Student: DeepSeek-R1-Distill-Qwen-1.5B
   - Transfers narrative knowledge into a 1.5B-parameter model for lower inference cost.

2. **4-Bit Quantization**

   - Used BitsAndBytes to map weights from 32-bit to 4-bit, reducing memory footprint by >75%.

3. **Parameter-Efficient Fine-Tuning (QLoRA)**
   - Applied LoRA adapters on top of attention layers, freezing the bulk of the transformer.
   - Resulted in only ~0.08% of parameters being trainable (≈1.5M out of 1.78B).

## Fine-Tuning Pipeline

- **Environment**: Google Colab T4 (12.7 GB RAM, 15 GB GPU)
- **Data Split**: 5K training / 1K validation prompts–story pairs (due to 4 hr runtime limit)
- **Training Strategies**:
  - Causal language modeling with cross-entropy loss
  - Gradient accumulation (to simulate larger batches)
  - Early stopping and mixed-precision training

We ran experiments for 1 and 5 epochs to gauge diminishing returns under compute constraints.

## Results & Insights

| Metric              | Base DeepSeek-R1 | Distill-1 Epoch | Distill-5 Epoch |
| ------------------- | ---------------- | --------------- | --------------- |
| Flesch Reading Ease | Fifty-two        | **Sixty-three** | Sixty-one       |
| Gunning Fog Index   | 12.7             | **10.4**        | 10.7            |
| Shannon Entropy     | 5.2              | 4.9             | **5.0**         |
| Sentiment Polarity  | 0.12             | 0.15            | 0.14            |
| Subjectivity        | 0.63             | **0.48**        | 0.50            |

- **Readability** surged: +11 points on Flesch and –2.3 on Fog after one epoch.
- **Diversity** remained high, with slight gains at 5 epochs.
- **Tone**: more positive polarity and lower subjectivity, yielding balanced narratives.

## Sample Generation

**Prompt:**

> Write a 200-word horror tale about a lonely lighthouse keeper.

**Fine-Tuned Output (excerpt):**

> The lamp’s glow trembled against the storm-tossed waves as Marcus climbed the spiral stair…  
> Whispers echoed through the rusted railings—each breath a promise of something waiting beneath the foam…

Readers rated this version higher on coherence and atmosphere compared to the base model.

## Future Work

- **Long-form Stories & Poetry**: Extend beyond short prompts.
- **Larger Compute**: Leverage GPU clusters or on-prem servers for full 300K examples.
- **Multimodal Extension**: Incorporate image or audio prompts for richer narratives.
- **Advanced Metrics**: Human evaluation and learned quality predictors.

## Conclusion

By strategically combining distillation, quantization, and PEFT, we transformed a bloated LLM into a nimble storyteller that outperforms its base counterpart on key readability and diversity metrics. This pipeline demonstrates how resource-constrained teams can still achieve high-quality personalized content generation with modern LLM techniques.
