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

```quiz:fill:<input type string or number>:<answer>
4 / 2 = [ ]
```

# Fill in typing example for string type

This is an example for a string fill in.

---

```quiz:fill:string:is
Winters [ ] coming!
```

# Check List Quiz

Check list quiz is for questions with multiple selection answers.

---

Which of the following is a programming language?

```quiz:checkList
- [ ] HTML
- [ ] CSS
- [x] JavaScript
- [x] Python
```

# Radio Quiz

Radio quiz is almost the same as Check List Quiz but with only one option selection as correct answer.

---

Which one is the correct output of the `print(10 * 10)` code snippet?

```quiz:radio
- [x] 100
- [ ] 1000
- [ ] 1000
- [ ] 10000
```

# Pick And Fill Quiz

This quiz type is look like fill in but have differences. User can't type to fill the blanks and also question could have multiple blanks. There are multiple options to pick from and fill the blanks.

---

Fill in spaces by picking words from the list.

```quiz:pickAndFill:[will|can|should|must|might|could]
You [should] finish your homework today, and you [can] ask the teacher if you need help.
```
