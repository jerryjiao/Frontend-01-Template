# 第6周总结

这周的两个概念：

### 有限状态机

+ 每一个状态都是一个机器
  + 在每一个机器里，我们可以做计算、存储、输出等
  + 所有的这些机器接受的输入是一致的
  + 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，应该是纯函数（无副作用）

+ 每一个机器知道下一个状态
  + 每个机器都有确定的下一个状态（Moore）
  + 每个机器根据输入决定下一个状态（Mealy）


### CSS computing

1. 收集CSS规则
  + 遇到style标签时，将CSS规则保存起来
  + 调用CSS Parser来分析CSS规则

2. 添加调用
  + 当我们创建一个元素后，立即计算CSS
  + 理论上，当我们分析一个元素时，所有CSS规则已经收集完毕
  + 在真实的浏览器中，可能遇到写在body里的style标签，需要重新计算CSS的情况(这里暂时忽略)

3. 获取父元素序列
  + 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
  + 我们从上一步骤的stack可以获取本元素所有的父元素
  + 因为我们首先获取的是“当前元素”，所以我们获取和计算父元素匹配的顺序是从内向外

4. 拆分选择器
  + 选择器也要从当前元素向外排练
  + 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

5. 计算选择器与元素匹配
  + 根据选择器的类型和元素属性，计算是否与当前元素匹配
  + 这里紧紧实现了三种基本选择器，实际的浏览器中要处理符合选择器

6. 生成computed属性
  + 一旦选择匹配，就应用选择器到元素上，形成computedStyle

7. 确定规则覆盖关系
  + CSS规则根据specificity和后来优先规则覆盖
  + specificity是个四元组，越左边权重越高
  + 一个CSS规则的specificity根据包含的简单选择器相加而成

### 反思

没时间是我自己的借口，其实挺惭愧的。好多东西没跟上