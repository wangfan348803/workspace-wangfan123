---
name: generate-wechat-ai-article
description: Researches an AI company, model, product launch, policy move, funding event, or industry trend on the web and writes a polished Chinese Markdown article for WeChat Official Account. Use when the user wants a readable公众号文章 rather than a raw news brief, and reliability matters. The skill prioritizes official sources first, falls back to high-quality industry media only when needed, separates facts from analysis, and uses cautious language when public evidence is incomplete.
---

# Generate WeChat AI Article

生成适合微信公众号发布的中文 Markdown 文章，输入通常是一个 AI 行业相关的主体、事件、产品发布、公司动态、融资、政策变化或趋势话题。

这个 skill 的核心不是“把新闻拼起来”，而是先做分级取源，再做事实整理，最后写成一篇可读性较强、判断边界清楚的公众号文章。

## When To Use

在这些场景优先使用本 skill：

- 用户明确要“微信公众号文章”“公众号风格解读”“面向中文读者的 AI 行业文章”
- 用户只给出一个 AI 相关主题，希望你联网搜集信息后成文
- 用户强调信息可靠性、来源级别、不要把推测写成事实
- 用户需要 Markdown 成稿，后续可能继续排版或发布到公众号

不适合的场景：

- 只需要几条快讯或一句话摘要
- 需要学术综述、论文精读或投资备忘录等非公众号体裁
- 主题与 AI 行业无关

## Workflow

### 1. Clarify The Topic

先把用户输入归类成以下一种或多种：

- 公司或机构动态
- 模型/产品发布
- 融资、并购、合作
- 政策、监管、标准
- 行业趋势或热点事件

如果用户的主题过于宽泛，优先收窄到一个最核心的观察对象，再围绕它补充上下游背景。

### 2. Apply The Source Ladder

本 skill 统一使用下面的来源优先级：

- `P0`：官方来源。官网、官方博客、官方文档、官方 GitHub、官方项目页、官方新闻稿、官方社媒账号等
- `P1`：高质量行业资讯平台、主流科技媒体、权威研究机构或数据库
- `P2`：搜索结果中排名靠前的补充材料，用于补细节、时间线或交叉验证

用户原始需求中同时出现了 `P8` 和 `P0`。为保证执行一致性，本 skill 将“官方来源”统一视为 `P0`。若用户后续再次写 `P8`，按 `P0` 理解。

执行顺序必须是：

1. 先找 `P0`
2. 仅当 `P0` 无法覆盖关键问题时，再补 `P1`
3. 仍有缺口时，再谨慎使用 `P2`

不要一上来混用多个级别的材料，也不要让 `P2` 盖过 `P0`。

### 3. Build A Fact Sheet Before Writing

写作前先在内部整理一个简短事实表，至少包括：

- 事件是什么
- 发生在什么时候
- 涉及哪些主体
- 哪些说法有 `P0` 支撑
- 哪些说法只有 `P1` 或 `P2`
- 还缺哪些公开信息

如果关键事实没有 `P0`，不要把它写成确定事实；应明确这是“媒体称”“公开信息显示”“目前可见资料表明”等。

具体判定规则见 [source-ladder.md](references/source-ladder.md)。

### 4. Separate Facts From Analysis

正文必须把“事实”和“分析”分开处理：

- `事实`：可被来源直接支撑的内容，尽量写得清楚、具体、可核对
- `分析`：基于事实做出的判断、影响推演、趋势解释，必须使用审慎表达

允许写分析，但必须满足两个条件：

1. 分析要建立在前文已交代的事实之上
2. 不确定处要显式降级表达，不得伪装成已确认事实

### 5. Write For WeChat Readability

成稿应更像公众号文章，而不是硬新闻摘要：

- 开头先交代“为什么这件事值得关注”
- 主体段落有推进感，不要堆砌材料
- 尽量给读者补足上下文，解释这件事放在行业里意味着什么
- 语言自然、克制，不用夸张标题党

具体结构与写法见 [article-structure.md](references/article-structure.md)。

## Output Requirements

默认输出为中文 Markdown 文章，适合继续用于公众号排版。至少包含以下部分：

1. 标题
2. 导语
3. 核心信息
4. 背景补充
5. 影响分析
6. 总结

推荐在文末附上：

- `信息来源`：按 `P0 / P1 / P2` 分组列出
- `说明`：若公开资料不足，简要注明哪些部分仍待更多信息验证

## Writing Rules

- 优先写清楚，再追求“像文章”
- 标题不要故作耸动，避免“炸裂”“颠覆一切”之类表达
- 如果一条结论仅有单一非官方来源，不要写成定论
- 如果来源之间存在冲突，明确指出分歧，不强行统一
- 如果事件仍在发展，使用“截至发稿前”“目前公开信息显示”等时间边界
- 引述数字、日期、版本名、发布主体时，尽量给出具体值
- 不要编造未公开的商业动机、市场结果或用户数据

## Default Article Skeleton

```markdown
# 标题

## 导语

用 1 到 2 段说明这件事是什么、为什么值得关注。

## 核心信息

先交代已经确认的关键事实。

## 背景补充

补充公司、产品、竞品、政策或历史时间线，帮助读者理解上下文。

## 影响分析

明确这是分析层。讨论它可能影响哪些公司、产品路线、开发者生态、商业格局或监管方向。

## 总结

回到最重要的判断，说明当前最确定的部分和仍待观察的部分。

## 信息来源

### P0

- 来源 1

### P1

- 来源 2

### P2

- 来源 3
```

## Response Pattern

当用户直接要求成文时，直接输出成稿。

当用户要求“先查资料再写”时，按下面顺序执行：

1. 联网调研并完成事实表
2. 确认是否已有足够证据支撑成文
3. 若足够，直接输出文章
4. 若不足，仍输出文章，但在分析和结尾里明确边界，并在 `信息来源` 后补一段说明

## Concrete Examples

- “写一篇关于 OpenAI 最新模型发布的公众号文章，要可靠一点，不要太像新闻稿。”
- “帮我围绕 Anthropic 和 Claude 的最新动态写一篇公众号文章，中文 Markdown。”
- “我想写 AI Agent 行业近一周的变化，先查资料，再整理成一篇适合公众号的文章。”
- “围绕某家国产大模型公司的融资消息写一篇解读，但不要把传闻写成事实。”

## References

- 来源分级、交叉验证和审慎表达：读 [source-ladder.md](references/source-ladder.md)
- 文章结构、语气和可读性要求：读 [article-structure.md](references/article-structure.md)
