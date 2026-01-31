---
title: "Analysis of Class Imbalance Impact on Three-Class Image Classification Quality"
excerpt: "A study of deep learning architectures for avatar origin classification (real, drawn, generated) under significant class imbalance conditions, comparing ResNet-50, MobileNetV3, EfficientNet-B0 and ConvNeXt-Tiny performance."
date: "2025-11-10"
slug: "avatar-classification-disbalance"
image: "avatar-classification-preview.png"
type: "article"
tech:
    [
        "Deep Learning",
        "CNN",
        "ResNet-50",
        "MobileNetV3",
        "EfficientNet-B0",
        "ConvNeXt-Tiny",
        "Python",
        "PyTorch",
        "Google Colab",
    ]
isFeatured: true
isTrending: true
isNew: false
stats:
    stars: 15
    forks: 3
readingTime: "20 min"
difficulty: "Advanced"
demoUrl: "https://colab.research.google.com/drive/1IFYsefy8tPpA2mwUu8kQXbjaFZy3h8-M?usp=sharing"
---

# Analysis of Class Imbalance Impact on Three-Class Image Classification Quality

**⚠️ This article is currently under review for publication in the "International Journal of Open Information Technologies" and was presented at the International Congress "MODERN PROBLEMS OF COMPUTER AND INFORMATION SCIENCES" at Moscow State University.**

---

## Abstract

In recent years, the development of generative artificial intelligence models has led to a sharp increase in the number of synthetic images and deepfakes. Modern tools allow creating realistic images of people, which complicates the task of verifying the authenticity of visual content and reduces people's trust in digital media. The article addresses the problem of classifying user avatars by origin type (real, drawn, generated) under conditions of pronounced class imbalance. The study aims to identify the impact of uneven data distribution on the accuracy of classifying images by origin type.

The research compares ResNet-50, MobileNetV3, EfficientNet-B0, and ConvNeXt-Tiny architectures trained on image datasets from open sources. Analysis shows that with a high proportion of the dominant class (≈80%), models demonstrate significant reduction in macro-F1 when transitioning to independent testing, indicating overfitting and loss of generalization ability. ConvNeXt-Tiny showed the greatest resilience to class and domain shift, while MobileNetV3 showed the optimal balance of accuracy and computational efficiency. The obtained results emphasize the importance of accounting for class imbalance when building systems aimed at image classification.

**Keywords:** deepfakes, image classification, class imbalance, neural networks, synthetic images, three-class classification

---

## I. Introduction

In recent years, there has been a rapid increase in the number of synthetic images and deepfakes - content created using generative artificial intelligence models. Previously, such technologies were used primarily for entertainment purposes, but today they are increasingly becoming tools for fraud and disinformation.

According to BI.Zone AntiFraud company, during the period from January 1 to June 1 of the current year, the number of fraud cases using deepfakes increased by 2.3 times compared to the same period last year. Social engineering still remains a more common tool for cybercriminals, but the share of deepfakes in such attacks is growing and has already reached 3–5% [1]. At the global level, statistics are even more alarming: in 2023, the fintech sector faced a 700% increase in such incidents, and the number of fraud cases using deepfakes worldwide increased tenfold. It is predicted that by 2027, losses from fraud using generative AI in the US could reach $40 billion [2].

Simultaneously with the increase in the number of abuses, the availability of tools for generating deepfakes and the quality of created images is rapidly increasing. Today, there are numerous programs and online services for image generation on the internet. Modern generative models such as StyleGAN and Stable Diffusion make forgeries increasingly realistic. The most famous example is the project This Person Does Not Exist, which creates realistic images of people.

Under such conditions, it becomes especially important to develop image authenticity recognition systems capable of distinguishing real photographs from synthetic ones. Considering that government agencies and companies are required to maintain official pages on social networks such as VKontakte and Odnoklassniki, the need for automatic profile image verification becomes an important element of digital security.

Modern cybersecurity methods increasingly use artificial intelligence technologies - for data analysis, threat prediction, and improving the efficiency of information system protection [3]. The machine learning principles and recognition methods embedded in these systems can also be applied to the task of synthetic image detection.

Despite the large number of existing solutions, the task of classifying images by their origin type remains insufficiently studied. Unlike works focused on binary classification "real/synthetic", this article considers a three-class formulation of the problem under conditions of strong class imbalance, which allows investigating the impact of this imbalance on the quality of avatar classification.

---

## II. Research Objective

**Research Objective** – Determining the impact of class imbalance on the quality of avatar classification by origin type for digital identification tasks.

**Research Tasks:**

1. Forming a training sample based on datasets from the Kaggle platform;
2. Training models based on selected architectures;
3. Conducting experiments to assess the impact of class imbalance on classification quality;
4. Forming conclusions based on experimental results.

---

## III. Existing Approaches to Detecting Generated Images

Existing approaches to image detection and classification can be divided into several groups.

**Statistical approaches** became one of the first directions in image authenticity analysis tasks. They are based on studying various image components, such as pixel value distributions, which allows identifying inconsistencies arising during image editing or generation.

This group includes, for example, Error Level Analysis (ELA). This method identifies image areas with different compression levels, which allows detecting traces of editing or generation. However, the ELA method has significant limitations: it is applicable exclusively to lossy compression formats, primarily JPEG, and moreover, the practical effectiveness of the method decreases due to its vulnerability to recompression [4].

This group also includes Benford's Law (also known as the law of the first digit or significant digit law). This law is often used in forensics to detect image falsification. It can also be used for detecting generated images, but does not work for all generators. For example, images generated by StyleGAN2 often do not comply with Benford's Law, while images generated by StyleGAN3 have almost the same percentage of compliance as real images [5].

**Deep learning methods** use multilayer neural networks that independently extract informative features from images. Examples of such methods include:

- **Convolutional Neural Networks (CNN)** – they are trained on large datasets and can identify various patterns characteristic of certain objects. For example, CNNs are used for face detection and recognition in surveillance systems [6]. This feature can also be used to identify patterns characteristic of real and generated images.

- **GAN detectors and fingerprinting** – methods in this group use features (fingerprints) left by different generators, which allows determining not only the synthetic origin of an image but also the generative model with which it was created. Such methods show high accuracy on known generators but perform poorly on new ones.

**Other methods:** metadata analysis (can be easily bypassed by removing or falsifying data), searching for original images (works well on partially modified images but useless for completely generated ones), watermark analysis (adding labels during generation is not too widespread, making this approach ineffective at the moment. Also, labels can be removed or distorted).

---

## IV. Mathematical Formulation of the Problem

**Image Classification** – is a fundamental task in the field of Computer Vision, consisting of analyzing and assigning an image to one or several predefined categories (classes) by assigning appropriate labels.

Let there be a set of images X = {x₁, x₂,...,xₙ} each of which belongs to one of the classes Y = {y₁, y₂, y₃}, where:

- y₁ – real photographs;
- y₂ – drawn images;
- y₃ – generated images.

It is necessary to build a model f(x) = y, which predicts class label y based on input image x.

---

## V. Used Architectures

This research used deep learning architectures representing different generations of convolutional neural networks. The goal of experiments was not to maximize the accuracy of individual architectures, but to assess their resilience to class imbalance in the training sample. Information about used architectures is presented in Table 1.

**Table 1 – Used Architectures and Their Features**

```text

| Architecture Name | Key Feature                                          | Practical Advantage                        |
| ----------------- | ---------------------------------------------------- | ------------------------------------------ |
| ResNet-18         | Residual connections (skip connections)              | Fast convergence with moderate depth       |
| ResNet-50         | Deep residual connections (Bottleneck Blocks)        | Better ability to extract complex features |
| MobileNetV3       | HardSwish, Squeeze-and-Excitation, auto-optimization | High accuracy with small parameter count   |
| EfficientNet-B0   | Balanced layer scaling (MBConv)                      | Minimal computations with high accuracy    |
| ConvNeXt-Tiny     | CNN and ViT hybrid (patches, GELU, LayerNorm)        | Improved quality with compact structure    |

```

---

## VI. Training Sample

For model training, face images were collected from datasets on the Kaggle platform [7]. For each image class, several datasets were selected to ensure greater sample diversity and improve model generalization ability by including images differing in style, quality, and shooting conditions. Description of the training sample composition is presented in Table 2. All images are in JPG format.

**Table 2 – Description of Training Sample Composition**

```text

| Class                | Dataset Name                                    | Image Size |
| -------------------- | ----------------------------------------------- | ---------- |
| **Real Photographs** | Real vs Fake Faces                              | 600×600    |
|                      | Deepfake and Real Images                        | 256×256    |
|                      | CelebFaces Dataset                              | 64×64      |
| **Generated Images** | Detect AI-Generated Faces: High-Quality Dataset | 768×768    |
|                      | Fake-Vs-Real-Faces (Hard)                       | 300×300    |
|                      | Person Face Dataset                             | 1024×1024  |
| **Drawn Images**     | Anime Face Dataset                              | 63×63      |
|                      | LEGO Minifigure Faces                           | 1024×1024  |
|                      | CUHK Face Sketch Database (CUFS)                | 64×80      |
```

Examples of images for each class are presented in Figure 1.

![Examples of images for each class](1.png)

_Figure 1 – Examples of images for each class_

Analysis of class distribution showed that the main part of the dataset consists of drawn images (about 82%), while real and generated image classes are distributed approximately evenly.

The class distribution diagram is presented in Figure 2.

![Class distribution diagram](2.png)

_Figure 2 – Class distribution diagram_

---

## VII. Model Training

Training was performed on a combined dataset (80/10/10 split), previously normalized to 224×224 px resolution. To compensate for class imbalance, weighted coefficients in the loss function, AdamW optimizer, and ReduceLROnPlateau scheduler were applied.

Face detection and background cropping were not performed, which partially determined the use of background features in classification.

---

## VIII. Experiment

The study compared neural network architectures ResNet-50, MobileNetV3, EfficientNet-B0, and ConvNeXt-Tiny, including their Few-Shot variants.

**Experiment Objective** – Investigate the impact of class imbalance on the quality of avatar classification by origin type (real, drawing, generated) for digital identification tasks.

Figure 3 presents F1-score comparison for different architectures.

![F1-score comparison for different architectures](3.png)

_Figure 3 – F1-score comparison for different architectures_

The highest F1-score values were obtained for ResNet-50, ConvNeXt-Tiny Stage 2, and MobileNetV3 Full, confirming the effectiveness of pre-trained convolutional architectures with limited data.

Few-Shot models naturally show F1 reduction, reflecting the dependence of classification quality on sample size and weight freezing strategy.

Table 3 presents training results on the main dataset.

**Table 3 – Training Results on Main Dataset**

```text

| Model                   | Training Type          | F1   | Accuracy |
| ----------------------- | ---------------------- | ---- | -------- |
| ResNet-50               | Full training          | 0.98 | 0.99     |
| MobileNetV3             | Full training          | 0.96 | 0.96     |
| ConvNeXt-Tiny (Stage 2) | Progressive unfreezing | 0.96 | 0.98     |
```

For generalization ability assessment, an independent test set of 1340 images excluded from the training process was used. Metrics were calculated using macro-averaging (Macro F1, Balanced Accuracy) with consideration of stratified splitting by data sources, allowing control of possible class shift and domain imbalance.

Table 4 presents independent testing results.

**Table 4 – Independent Testing Results (Macro F1 and Balanced Accuracy)**

```text

| Model             | ResNet-50 | MobileNetV3 | ConvNeXt-Tiny (Stage 2) |
| ----------------- | --------- | ----------- | ----------------------- |
| Macro F1          | 0.255     | 0.220       | 0.129                   |
| Balanced Accuracy | 0.230     | 0.235       | 0.104                   |
| F1 (AI)           | 0.000     | 0.000       | 0.032                   |
| F1 (Drawing)      | 0.032     | 0.014       | 0.014                   |
| F1 (Real)         | 0.732     | 0.647       | 0.373                   |
```

The F1 drop when transitioning to an independent sample demonstrates high model sensitivity to class imbalance and data source, confirming the limited ability of convolutional architectures to generalize under domain shifts.

With class drawing dominance (≈ 82%), models maintain high accuracy on the main set but lose resilience on balanced data, where macro-F1 decreases almost fourfold.

This result reflects the natural reaction of CNN architectures to class and domain shift and confirms the key research objective – identifying the impact of data imbalance on model behavior.

Figure 4 presents per-class F1-score comparison for different architectures.

![Per-class F1-score comparison](4.png)

_Figure 4 – Per-class F1-score comparison for different architectures_

Per-class analysis revealed pronounced model bias toward the dominant class. With approximately 80% of drawing category images, all architectures demonstrate consistently high metric values for this group, while indicators for real and generated are noticeably lower.

Particularly strong decline is observed in compact and few-shot models, reflecting the tendency of convolutional networks to overfit on the majority and ignore rare categories.

ConvNeXt-Tiny showed the greatest resilience to domain shift due to deep architecture and progressive weight unfreezing, ensuring feature preservation at different generalization levels.

ResNet-50, despite high accuracy, overfits faster due to rigid residual block hierarchy and limited filter adaptability.

MobileNetV3 with few-shot training maintains relative resilience thanks to optimized activations and depthwise convolutions, providing the best balance of speed and accuracy with small data volume.

Figure 5 shows attention maps of ResNet-50 for generated class images.

![ResNet-50 attention maps for generated class](5.png)

_Figure 5 – ResNet-50 attention maps for generated class images_

Attention maps of ResNet-50 for generated class images incorrectly classified as drawing. The model focuses on texture and color transitions rather than facial features, leading to overestimation of "drawn" features.

Figure 6 shows attention maps of ConvNeXt-Tiny for real class images.

![ConvNeXt-Tiny attention maps for real class](6.png)

_Figure 6 – ConvNeXt-Tiny attention maps for real class images_

Attention maps of ConvNeXt-Tiny for real class images incorrectly classified as generated. Activations are shifted toward background and highlights, indicating the influence of irrelevant visual factors.

Visual analysis confirms that compact networks more often confuse background with face, while deep architectures selectively respond to textural features, enhancing bias toward the dominant class.

Figure 7 shows t-SNE feature embeddings for ConvNeXt-Tiny Stage 1 model.

![t-SNE feature embeddings](7.png)

_Figure 7 – t-SNE feature embeddings for ConvNeXt-Tiny Stage 1 model_

The diagram demonstrates dense separation of drawn avatars and partial intersection of real and generated areas, reflecting the visual similarity of synthetic images with real faces.

Errors were more frequently observed in images with atypical lighting, low detail, and anime-style avatars, confirming model dependence on data style characteristics.

Table 5 shows data on Accuracy and Macro-F1 changes with increasing proportion of dominant class drawing.

**Table 5 – Accuracy and Macro-F1 Changes with Increasing Proportion of Dominant Class Drawing**

```text

| Scenario | Model                    | Accuracy (micro) | Macro-F1 |
| -------- | ------------------------ | ---------------- | -------- |
| 50-25-25 | EfficientNet-B0          | 0.123            | 0.145    |
| 70-15-15 | ResNet18 FewShot 12 ep   | 0.068            | 0.094    |
| 80-10-10 | MobileNetV3 FewShot 4 ep | 0.129            | 0.083    |
| 80-10-10 | ConvNeXt-Tiny Stage 2    | 0.023            | 0.018    |
```

Additional assessment with changing class proportions in the test sample showed a natural decrease in accuracy and Macro-F1 with increasing drawing proportion.

When exceeding 70% proportion of the dominant class, Macro-F1 falls below 0.3 for all architectures.

ConvNeXt-Tiny demonstrates minimal decrease (~25%), indicating its greater resilience to class and domain shift.

---

## IX. Experiment Results

The conducted experiments confirmed high sensitivity of CNN architectures to class and domain imbalance. Increase in the proportion of the dominant class leads to overfitting and loss of ability to recognize rare categories.

Comparison of ResNet-50, MobileNetV3, EfficientNet-B0, and ConvNeXt-Tiny architectures showed that with F1≈0.96-0.98 on imbalanced data, macro-F1 decreases to 0.13-0.26 on independent test, reflecting overfitting to the dominant class drawing.

ConvNeXt-Tiny showed the smallest metric decline and high resilience, ResNet-50 overfits faster, and MobileNetV3 maintains the best balance of accuracy and computational efficiency.

---

## X. Conclusion

The work implements a complete pipeline for classifying avatars by origin type (real, drawing, generated) with consideration of class and domain imbalance.

The conducted research confirms that class imbalance has a key impact on the resilience of neural networks in image classification. With dominance of one class (over 70%), macro-F1 decreases below 0.3 for all architectures, however ConvNeXt demonstrates the smallest decrease (≈25%), indicating its resilience to class shift.

ConvNeXt-Tiny demonstrated the smallest metric decline, MobileNetV3 – the best balance of speed and quality.

Results confirm the necessity of accounting for class shift and domain imbalance during training and the promise of hybrid CNN–ViT models for improving classification resilience.

These results are important for digital identification tasks, where the number of authentic images is limited, and the volume of synthetic content is constantly growing.

---

## 📜 Certificate of Conference Participation

![Certificate of participation in the International Congress "Modern Problems of Computer and Information Sciences"](certificat.png)

_Certificate of participation in the International Congress "Modern Problems of Computer and Information Sciences" at Moscow State University_

---

## 🚀 Resources and Links

### **Live Experiment**

- **[Google Colab Notebook](https://colab.research.google.com/drive/1IFYsefy8tPpA2mwUu8kQXbjaFZy3h8-M?usp=sharing)** – Full implementation with code and experiments

### **Source Code**

- **[GitHub Repository](https://github.com/Figrac0/Avatar-Type-Recognition)** – Complete source code and datasets

### **Related Publications**

1. L. H. Singh, P. Charanarur, and N. K. Chaudhary, "Advancements in detecting Deepfakes: AI algorithms and future prospects − a review", Discover Internet of Things, vol. 5, p. 53, 2025.
2. V.E. Ponomarev, "Forensic analysis of AI-modified digital images: applicability of new and classical analysis methods", Legal Science, no. 9, pp. 430-434, 2025.
3. S.P. Nikitenkova, "Application of Benford's Law in deepfake image detection", Bulletin of Tomsk State University. Management, Computer Engineering and Informatics, no. 64, pp. 128-137, 2023.

### **Conference**

- **[International Congress "Modern Problems of Computer and Information Sciences"](http://it-edu.oit.cmc.msu.ru/)** – Moscow State University

---

## 📋 Bibliography

[1] Vedomosti. "Number of fraud cases using deepfakes increased by 2.3 times" [Online]. Available: https://www.vedomosti.ru/technology/articles/2025/06/19/1118123-chislo-sluchaev-moshennichestva-s-ispolzovaniem-dipfeikov-viroslo Accessed: Oct. 30, 2025.

[2] L. H. Singh, P. Charanarur, and N. K. Chaudhary, "Advancements in detecting Deepfakes: AI algorithms and future prospects − a review", Discover Internet of Things, vol. 5, p. 53, 2025. doi: 10.1007/s43926-025-00154-0.

[3] D.E. Namiot, E.A. Ilyushin, I.V. Chizhov, "Artificial intelligence and cybersecurity", International Journal of Open Information Technologies, vol 10, no. 9, 2022, ISSN 2307-8162.

[4] V.E. Ponomarev, "Forensic analysis of AI-modified digital images: applicability of new and classical analysis methods", Legal Science, no. 9, pp. 430-434, 2025. doi: 10.24412/2220-5500-2025-9-430-434.

[5] S.P. Nikitenkova, "Application of Benford's Law in deepfake image detection", Bulletin of Tomsk State University. Management, Computer Engineering and Informatics, no. 64, pp. 128-137, 2023. doi: 10.17223/19988605/64/13.

[6] A.B. Mudrich, K.V. Ezhova, "Face detection and recognition in surveillance systems", International Journal of Open Information Technologies, vol. 12, no. 3, 2024, ISSN: 2307-8162.

[7] Kaggle. [Online]. Available: https://www.kaggle.com/ Accessed: Oct. 30, 2025.
