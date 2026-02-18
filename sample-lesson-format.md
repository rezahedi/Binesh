---
id: lesson-001
title: "Welcome to Python"
description: "An introduction to Python programming for beginners."
author: "John Doe"
parts: 5
tags: ["Python", "Programming", "Beginners"]
---

# Markdown format including Math or medias like images, SVGs or videos

All base Markdown format including **bold**, _italic_, [links](#), or math formula $E = mc^2$.

Math could be a block like the following:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

```math
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
```

Media like images, SVGs and also videos

![Photo Sample](/_temp/Molecules-nHpvAL.png)

# Fill in typing

Fill-in quiz can have only one fill-in blank slot, here is the format of fill-in quiz:

---

What is the output of $4 / 2$?

```quiz
{ "type": "fill", "inputType": "number", "answer": "2", "content": "4 / 2 = [ ]" }
```

# Fill in typing example for string type

This is an example for a string fill in.

---

```quiz
{ "type": "fill", "inputType": "string", "answer": "is", "content": "Winters [ ] coming!" }
```

# Check List Quiz

Check list quiz is for questions with multiple selection answers.

---

Which of the following is a programming language?

```quiz
{ "type": "checkList", "options": ["HTML", "CSS", "JavaScript", "Python"], "answers": ["JavaScript", "Python"] }
```

# Radio Quiz

Radio quiz is almost the same as Check List Quiz but with only one option selection as correct answer.

---

Which one is the correct output of the `print(10 * 10)` code snippet?

```quiz
{ "type": "radio", "options": ["100", "10", "1000", "10000"], "answer": "100" }
```

# Pick And Fill Quiz

This quiz type is look like fill in but have differences. User can't type to fill the blanks and also question could have multiple blanks. There are multiple options to pick from and fill the blanks.

---

Fill in spaces by picking words from the list.

```quiz
{ "type": "pickAndFill", "options": ["will", "can", "should", "must", "might", "could"], "answers": ["should", "can"], "content": "You [ ] finish your homework today, and you [ ] ask the teacher if you need help." }
```

# Placement Quiz

The following quiz style is placement, drag options and drop in dropping zones, works best for labeling, classification or ordering. It has two main parts, options could be words, or images. Second part is dropping zones, could have two or more but not more than count of options.

---

Put each one in its place.

```quiz
{ "type": "placement", "aspectRatio": "1/2", "zones": ["A", "B", "C", "D"], "options": [{ "zone": "B", "content": "Test 1" }, { "zone": "D", "content": "Test 2" }, { "zone": "A", "content": "Test 3" }, { "zone": "C", "content": "Test 4" }] }
```

# Sentence Builder Quiz

Sentence Builder quiz is more of an ordering quiz, where options should be picked in a specific order.

---

Create a perfect sentence.

```quiz
{ "type": "sentenceBuilder", "options": ["This", "is", "a short", "sentence."] }
```
