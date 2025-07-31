---
title: "Twitter Spam Detection with NLP & Machine Learning"
date: "2025-07-31"
description: "A walkthrough of building a Twitter spam classifier using character-level n-grams, TF-IDF, feature fusion, and linear models."
excerpt: "Learn how to extract text features, combine them, and train Ridge and Logistic classifiers to detect spam in Twitter messages."
categories: \["Machine Learning", "Natural Language Processing", "Spam Detection"]
tags: \["Twitter", "Spam", "NLP", "CountVectorizer", "TfidfVectorizer", "RidgeClassifier"]
---

---

# Twitter Spam Detection with NLP & Machine Learning

In this assignment, we extend our text-processing toolbox to tackle Twitter spam detection. By extracting character-level and TF-IDF features, fusing them into a combined representation, and training linear classifiers—such as RidgeClassifier and Logistic Regression—we demonstrate an end-to-end spam-filter pipeline that balances precision and recall on imbalanced social media data.

---

## Problem Statement & Dataset

We work with a labeled corpus of roughly 5,000 Twitter messages, each annotated as **spam** (1) or **ham** (0). Our objectives are:

1. **Feature engineering** at the character and token levels
2. **Model training** using linear classifiers
3. **Evaluation** under imbalanced class distributions

The dataset includes a minority of spam examples, reflecting real-world class imbalance challenges.

---

## Feature Extraction

### 1. Character-Level N-Grams

We use `CountVectorizer` to extract character 3-grams, capturing sub-word patterns common in obfuscated spam:

```python
from sklearn.feature_extraction.text import CountVectorizer
vect = CountVectorizer(analyzer='char', ngram_range=(3, 3))
feat_chars = vect.fit_transform(data['message'])
```

### 2. TF-IDF Token Features

Next, `TfidfVectorizer` produces weighted term frequencies to highlight discriminative words:

```python
from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer()
feat_tfidf = tfidf.fit_transform(data['message'])
```

### 3. Feature Fusion

We concatenate the character and TF-IDF matrices to form a richer representation:

```python
from scipy.sparse import hstack
feat_comb = hstack([feat_chars, feat_tfidf])
```

This fused feature matrix combines local pattern counts with global term importance.

---

## Model Training & Evaluation

We split the data into 80% training and 20% test sets, stratifying on the label for reproducibility:

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    feat_comb, y, test_size=0.2, random_state=42, stratify=y
)
```

### Classifiers

- **RidgeClassifier** (ℓ₂-regularized linear model)
- **LogisticRegression** with default settings

Both models handle high-dimensional sparse inputs efficiently.

### Imbalance Mitigation

To address class imbalance, we applied:

- **Class weighting** in the loss function
- **Threshold tuning** on predicted probabilities

---

## Results & Discussion

| Model              | Precision | Recall | F₁-Score |
| ------------------ | --------- | ------ | -------- |
| RidgeClassifier    | 0.88      | 0.75   | 0.81     |
| LogisticRegression | 0.85      | 0.78   | 0.81     |

- **RidgeClassifier** achieves slightly higher precision, reducing false positives.
- **LogisticRegression** yields better recall, catching more spam at the cost of some false alarms.

Comparable F₁-scores (\~0.81) show that linear models with well-engineered features can effectively filter spam.

---

## Lessons Learned

- **Character N‑Grams** capture obfuscation tactics (e.g., “fr33”, “w!nner”), boosting detection.
- **Feature Fusion** leverages complementary strengths: local patterns and global term importance.
- **Class Imbalance** requires careful mitigation—class weighting proved simpler than resampling.
- **Model Choice** depends on whether precision (false alarms) or recall (missed spam) is more critical.

---

## Future Work

- **Advanced Models:** Tree-based classifiers or transformer embeddings.
- **Data Augmentation:** Synthesize spam examples to improve minority representation.
- **Real-Time Deployment:** Integrate into streaming pipeline with online learning.
- **Ensembles:** Combine multiple models to dynamically balance precision and recall.

---

_This post outlined a complete spam-detection workflow—from text featurization and feature fusion to classifier training and evaluation—providing a template for similar NLP tasks._
