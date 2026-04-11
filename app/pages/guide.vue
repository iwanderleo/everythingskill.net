<template>
  <div class="bg-white">
    <div class="mx-auto max-w-container px-6 py-12">
      <div class="xl:grid xl:grid-cols-[1fr_192px] xl:gap-16 items-start">

        <!-- ── Main content ── -->
        <article class="min-w-0">

          <!-- Back link -->
          <NuxtLink
            :to="localePath('/')"
            class="inline-flex items-center gap-1.5 text-sm text-mid-gray hover:text-charcoal transition-colors mb-10"
          >
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            {{ $t('guidePage.backLink') }}
          </NuxtLink>

          <!-- Hero -->
          <header class="mb-14">
            <div class="inline-flex items-center gap-1.5 rounded-pill px-3 py-1 mb-5 text-xs font-semibold text-mid-gray" style="box-shadow: rgba(34,42,53,0.08) 0 0 0 1px;">
              <Icon name="lucide:book-open" class="w-3 h-3" />
              {{ $t('guidePage.badge') }}
            </div>
            <h1 class="font-display text-display-section text-charcoal mb-4">{{ $t('guidePage.heroTitle') }}</h1>
            <p class="text-[18px] text-mid-gray" style="font-weight: 300; line-height: 1.7;">{{ $t('guidePage.heroSubtitle') }}</p>
            <p class="mt-3 text-sm text-mid-gray" style="font-weight: 300;">{{ $t('guidePage.heroMeta') }}</p>
          </header>

          <!-- ───── Section 1: What is it ───── -->
          <section id="what-is" class="scroll-mt-24 mb-14">
            <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">{{ $t('guidePage.s1Title') }}</h2>
            <p class="text-mid-gray text-base mb-4" style="line-height: 1.80; font-weight: 300;">{{ $t('guidePage.s1Body1') }}</p>
            <p class="text-mid-gray text-base mb-7" style="line-height: 1.80; font-weight: 300;">{{ $t('guidePage.s1Body2') }}</p>

            <!-- Directory tree -->
            <div class="mb-4">
              <p class="text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70 mb-2">{{ $t('guidePage.minimalLabel') }}</p>
              <pre class="code-preview rounded-xl px-5 py-4 font-mono text-sm overflow-x-auto text-charcoal" style="line-height: 1.7;">my-skill/
└── SKILL.md</pre>
            </div>

            <!-- Example SKILL.md -->
            <div class="mb-7">
              <p class="text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70 mb-2">SKILL.md</p>
              <pre class="code-preview rounded-xl px-5 py-4 font-mono text-sm overflow-x-auto text-charcoal" style="line-height: 1.7;">---
name: code-review
description: Reviews code for bugs, security issues, and style violations.
  Use when the user asks for a code review or submits a pull request.
---

# Code Review

## When to use
Use this skill when the user submits code for feedback.

## Process
1. Read the code carefully
2. Check for bugs and edge cases
3. Look for security vulnerabilities
4. Provide actionable feedback with examples</pre>
            </div>

            <!-- Rule callout -->
            <div class="skill-card p-5 flex items-start gap-3">
              <Icon name="lucide:zap" class="w-4 h-4 text-charcoal mt-0.5 flex-shrink-0" />
              <p class="text-sm font-semibold text-charcoal">{{ $t('guidePage.s1Rule') }}</p>
            </div>
          </section>

          <!-- Divider -->
          <div class="border-t mb-14" style="border-color: rgba(34,42,53,0.06);" />

          <!-- ───── Section 2: Why Skills Matter ───── -->
          <section id="why-matters" class="scroll-mt-24 mb-14">
            <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">{{ $t('guidePage.s2Title') }}</h2>
            <p class="text-mid-gray text-base mb-7" style="line-height: 1.80; font-weight: 300;">{{ $t('guidePage.s2Body') }}</p>

            <ul class="space-y-5">
              <li v-for="n in 5" :key="n" class="flex items-start gap-3.5">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-mid-gray/10 flex items-center justify-center mt-0.5">
                  <Icon name="lucide:check" class="w-3.5 h-3.5 text-charcoal" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-charcoal mb-0.5">{{ $t(`guidePage.s2f${n}Title`) }}</p>
                  <p class="text-sm text-mid-gray" style="line-height: 1.75; font-weight: 300;">{{ $t(`guidePage.s2f${n}Desc`) }}</p>
                </div>
              </li>
            </ul>
          </section>

          <!-- Divider -->
          <div class="border-t mb-14" style="border-color: rgba(34,42,53,0.06);" />

          <!-- ───── Section 6: Create Your First Skill ───── -->
          <section id="create" class="scroll-mt-24 mb-14">
            <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">{{ $t('guidePage.s6Title') }}</h2>
            <p class="text-mid-gray text-base mb-7" style="line-height: 1.80; font-weight: 300;">{{ $t('guidePage.s6Intro') }}</p>

            <ol class="space-y-6">
              <!-- Step 1 -->
              <li class="flex gap-4">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-mid-gray/10 flex items-center justify-center text-[11px] font-semibold text-charcoal mt-0.5">1</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-charcoal mb-1">{{ $t('guidePage.s6Step1Title') }}</p>
                  <p class="text-sm text-mid-gray mb-3" style="line-height: 1.65; font-weight: 300;">{{ $t('guidePage.s6Step1Desc') }}</p>
                  <pre class="code-preview rounded-lg px-4 py-3 font-mono text-sm text-charcoal overflow-x-auto" style="line-height: 1.6;">mkdir my-skill && cd my-skill</pre>
                </div>
              </li>

              <!-- Step 2 -->
              <li class="flex gap-4">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-mid-gray/10 flex items-center justify-center text-[11px] font-semibold text-charcoal mt-0.5">2</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-charcoal mb-1">{{ $t('guidePage.s6Step2Title') }}</p>
                  <p class="text-sm text-mid-gray mb-3" style="line-height: 1.65; font-weight: 300;">{{ $t('guidePage.s6Step2Desc') }}</p>
                  <pre class="code-preview rounded-lg px-4 py-3 font-mono text-sm text-charcoal overflow-x-auto" style="line-height: 1.7;">---
name: my-skill
description: Does X when the user asks for Y.
  Handles A, B, and C scenarios.
---

# My Skill

## When to use
Use this skill when the user needs to...

## Process
1. First, do this
2. Then, check that
3. Finally, output the result</pre>
                </div>
              </li>

              <!-- Step 3 -->
              <li class="flex gap-4">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-mid-gray/10 flex items-center justify-center text-[11px] font-semibold text-charcoal mt-0.5">3</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-charcoal mb-1">{{ $t('guidePage.s6Step3Title') }}</p>
                  <p class="text-sm text-mid-gray mb-3" style="line-height: 1.65; font-weight: 300;">{{ $t('guidePage.s6Step3Desc') }}</p>
                  <pre class="code-preview rounded-lg px-4 py-3 font-mono text-sm text-charcoal overflow-x-auto" style="line-height: 1.7;">my-skill/
├── SKILL.md        # Required: instructions + metadata
├── scripts/        # Optional: executable code
├── references/     # Optional: documentation
└── assets/         # Optional: templates, resources</pre>
                </div>
              </li>

              <!-- Step 4 -->
              <li class="flex gap-4">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-mid-gray/10 flex items-center justify-center text-[11px] font-semibold text-charcoal mt-0.5">4</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-charcoal mb-1">{{ $t('guidePage.s6Step4Title') }}</p>
                  <p class="text-sm text-mid-gray mb-3" style="line-height: 1.65; font-weight: 300;">{{ $t('guidePage.s6Step4Desc') }}</p>
                  <pre class="code-preview rounded-lg px-4 py-3 font-mono text-sm text-charcoal overflow-x-auto" style="line-height: 1.7;"># Claude Code (project-level)
cp -r my-skill .claude/skills/

# Cursor
cp -r my-skill .cursor/skills/

# OpenAI Codex
cp -r my-skill .agents/skills/</pre>
                </div>
              </li>
            </ol>
          </section>

          <!-- Divider -->
          <div class="border-t mb-14" style="border-color: rgba(34,42,53,0.06);" />

          <!-- ───── Section 4: SKILL.md Format ───── -->
          <section id="skill-md" class="scroll-mt-24 mb-14">
            <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">{{ $t('guidePage.s4Title') }}</h2>
            <p class="text-mid-gray text-base mb-7" style="line-height: 1.80; font-weight: 300;">{{ $t('guidePage.s4Intro') }}</p>

            <!-- Required fields -->
            <h3 class="text-sm font-semibold text-charcoal mb-3">{{ $t('guidePage.s4RequiredTitle') }}</h3>
            <div class="overflow-x-auto mb-6">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr style="border-bottom: 1px solid rgba(34,42,53,0.08);">
                    <th class="text-left py-2.5 pr-6 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70 w-28">{{ $t('guidePage.tableFieldCol') }}</th>
                    <th class="text-left py-2.5 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70">{{ $t('guidePage.tableDescCol') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y" style="border-color: rgba(34,42,53,0.05);">
                  <tr>
                    <td class="py-3 pr-6 font-mono text-xs font-semibold text-charcoal">name</td>
                    <td class="py-3 text-mid-gray text-sm" style="line-height: 1.65;">{{ $t('guidePage.s4NameDesc') }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 font-mono text-xs font-semibold text-charcoal">description</td>
                    <td class="py-3 text-mid-gray text-sm" style="line-height: 1.65;">{{ $t('guidePage.s4DescDesc') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Optional fields -->
            <h3 class="text-sm font-semibold text-charcoal mb-3">{{ $t('guidePage.s4OptionalTitle') }}</h3>
            <div class="overflow-x-auto mb-7">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr style="border-bottom: 1px solid rgba(34,42,53,0.08);">
                    <th class="text-left py-2.5 pr-6 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70 w-28">{{ $t('guidePage.tableFieldCol') }}</th>
                    <th class="text-left py-2.5 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70">{{ $t('guidePage.tableDescCol') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y" style="border-color: rgba(34,42,53,0.05);">
                  <tr v-for="field in optionalFields" :key="field.name">
                    <td class="py-3 pr-6 font-mono text-xs font-semibold text-charcoal">{{ field.name }}</td>
                    <td class="py-3 text-mid-gray text-sm" style="line-height: 1.65;">{{ $t(field.descKey) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Full example -->
            <p class="text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70 mb-2">{{ $t('guidePage.fullExampleLabel') }}</p>
            <pre class="code-preview rounded-xl px-5 py-4 font-mono text-sm overflow-x-auto text-charcoal mb-6" style="line-height: 1.7;">---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents.
  Use when working with PDF files or when the user mentions PDFs, forms,
  or document extraction.
license: Apache-2.0
compatibility: Requires pdfplumber, pypdf. Works with Claude Code or similar.
metadata:
  author: example-org
  version: "1.0"
---

# PDF Processing

## Quick start
Use pdfplumber for text extraction:

    import pdfplumber
    with pdfplumber.open("document.pdf") as pdf:
        text = pdf.pages[0].extract_text()

## Advanced features
See [FORMS.md](FORMS.md) for the complete form-filling guide.</pre>

            <!-- Tip -->
            <div class="skill-card p-5 flex items-start gap-3">
              <Icon name="lucide:lightbulb" class="w-4 h-4 text-charcoal mt-0.5 flex-shrink-0" />
              <p class="text-sm text-mid-gray" style="line-height: 1.65; font-weight: 300;">{{ $t('guidePage.s4Tip') }}</p>
            </div>
          </section>

          <!-- Divider -->
          <div class="border-t mb-14" style="border-color: rgba(34,42,53,0.06);" />

          <!-- ───── Section 5: Supported Platforms ───── -->
          <section id="platforms" class="scroll-mt-24 mb-14">
            <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">{{ $t('guidePage.s5Title') }}</h2>
            <p class="text-mid-gray text-base mb-7" style="line-height: 1.80; font-weight: 300;">{{ $t('guidePage.s5Intro') }}</p>

            <!-- Platform badges -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="p in platforms"
                :key="p"
                class="inline-flex items-center px-3 py-1.5 rounded-pill text-xs font-medium text-charcoal"
                style="box-shadow: rgba(34,42,53,0.08) 0 0 0 1px; background: rgba(34,42,53,0.02);"
              >{{ p }}</span>
            </div>

            <!-- Install paths -->
            <h3 class="text-sm font-semibold text-charcoal mb-3">{{ $t('guidePage.installPathsTitle') }}</h3>
            <div class="space-y-3">
              <div v-for="tool in installPaths" :key="tool.name" class="flex items-start gap-4">
                <span class="text-xs font-semibold text-charcoal w-28 flex-shrink-0 pt-0.5">{{ tool.name }}</span>
                <pre class="code-preview rounded-lg px-3 py-1.5 font-mono text-xs text-charcoal flex-1">{{ tool.path }}</pre>
              </div>
            </div>
          </section>

          <!-- Divider -->
          <div class="border-t mb-14" style="border-color: rgba(34,42,53,0.06);" />

          <!-- ───── Section 3: How it works ───── -->
          <section id="how-it-works" class="scroll-mt-24 mb-14">
            <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">{{ $t('guidePage.s3Title') }}</h2>
            <p class="text-mid-gray text-base mb-7" style="line-height: 1.80; font-weight: 300;">{{ $t('guidePage.s3Intro') }}</p>

            <div class="space-y-4">
              <div v-for="n in 3" :key="n" class="skill-card p-5">
                <div class="flex items-start gap-4">
                  <span class="flex-shrink-0 w-6 h-6 rounded-full bg-mid-gray/10 flex items-center justify-center text-[11px] font-semibold text-charcoal">{{ n }}</span>
                  <div>
                    <p class="text-sm font-semibold text-charcoal mb-1">{{ $t(`guidePage.s3L${n}Title`) }}</p>
                    <p class="text-sm text-mid-gray" style="line-height: 1.75; font-weight: 300;">{{ $t(`guidePage.s3L${n}Desc`) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Loading table -->
            <div class="mt-7 overflow-x-auto">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr style="border-bottom: 1px solid rgba(34,42,53,0.08);">
                    <th class="text-left py-2.5 pr-4 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70">{{ $t('guidePage.tableColLevel') }}</th>
                    <th class="text-left py-2.5 pr-4 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70">{{ $t('guidePage.tableColWhen') }}</th>
                    <th class="text-left py-2.5 pr-4 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70">{{ $t('guidePage.tableColCost') }}</th>
                    <th class="text-left py-2.5 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70">{{ $t('guidePage.tableColWhat') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y" style="--tw-divide-opacity: 1; border-color: rgba(34,42,53,0.05);">
                  <tr v-for="row in loadingTable" :key="row.level">
                    <td class="py-3 pr-4 font-semibold text-charcoal text-xs">{{ row.level }}</td>
                    <td class="py-3 pr-4 text-mid-gray text-xs" style="line-height: 1.6;">{{ row.when }}</td>
                    <td class="py-3 pr-4 font-mono text-[11px] text-mid-gray">{{ row.cost }}</td>
                    <td class="py-3 text-mid-gray text-xs">{{ row.what }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Divider -->
          <div class="border-t mb-14" style="border-color: rgba(34,42,53,0.06);" />

          <!-- ───── Section 7: Skills vs MCP ───── -->
          <section id="vs-mcp" class="scroll-mt-24 mb-14">
            <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">{{ $t('guidePage.s7Title') }}</h2>
            <p class="text-mid-gray text-base mb-7" style="line-height: 1.80; font-weight: 300;">{{ $t('guidePage.s7Intro') }}</p>

            <div class="overflow-x-auto mb-6">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr style="border-bottom: 1px solid rgba(34,42,53,0.08);">
                    <th class="text-left py-3 pr-6 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70 w-28" />
                    <th class="text-left py-3 pr-6 text-[11px] font-semibold uppercase tracking-wider text-charcoal">{{ $t('guidePage.s7SkillCol') }}</th>
                    <th class="text-left py-3 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70">{{ $t('guidePage.s7McpCol') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y" style="border-color: rgba(34,42,53,0.05);">
                  <tr v-for="row in mcpTable" :key="row.label">
                    <td class="py-3 pr-6 text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70">{{ $t(row.labelKey) }}</td>
                    <td class="py-3 pr-6 text-sm font-medium text-charcoal" style="line-height: 1.6;">{{ $t(row.skillKey) }}</td>
                    <td class="py-3 text-mid-gray text-sm" style="line-height: 1.6;">{{ $t(row.mcpKey) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="skill-card p-5 flex items-start gap-3">
              <Icon name="lucide:link" class="w-4 h-4 text-charcoal mt-0.5 flex-shrink-0" />
              <p class="text-sm text-mid-gray" style="line-height: 1.65; font-weight: 300;">{{ $t('guidePage.s7Together') }}</p>
            </div>
          </section>

          <!-- Divider -->
          <div class="border-t mb-14" style="border-color: rgba(34,42,53,0.06);" />

          <!-- ───── Section 8: FAQ ───── -->
          <section id="faq" class="scroll-mt-24 mb-14">
            <h2 class="font-display text-display-feature text-charcoal mb-8" style="line-height: 1.30;">{{ $t('guidePage.faqTitle') }}</h2>

            <div class="space-y-0 divide-y" style="border-color: rgba(34,42,53,0.06);">
              <div v-for="n in 6" :key="n" class="py-6">
                <p class="text-sm font-semibold text-charcoal mb-2">{{ $t(`guidePage.faq${n}q`) }}</p>
                <p class="text-sm text-mid-gray" style="line-height: 1.75; font-weight: 300;">{{ $t(`guidePage.faq${n}a`) }}</p>
              </div>
            </div>
          </section>

          <!-- ───── CTA ───── -->
          <div class="skill-card p-8 text-center">
            <h2 class="font-display text-display-feature text-charcoal mb-3" style="line-height: 1.30;">{{ $t('guidePage.ctaTitle') }}</h2>
            <p class="text-sm text-mid-gray mb-6" style="line-height: 1.65; font-weight: 300;">{{ $t('guidePage.ctaDesc', { count: skillCount }) }}</p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <NuxtLink :to="localePath('/skills')" class="btn-primary">
                {{ $t('guidePage.ctaBtn1') }}
              </NuxtLink>
              <NuxtLink :to="localePath('/submit')" class="btn-secondary">
                {{ $t('guidePage.ctaBtn2') }}
              </NuxtLink>
            </div>
          </div>

        </article>

        <!-- ── Sticky ToC ── -->
        <aside class="hidden xl:block">
          <div class="sticky top-24">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70 mb-3">{{ $t('guidePage.tocTitle') }}</p>
            <nav class="space-y-0.5">
              <a
                v-for="item in toc"
                :key="item.id"
                :href="`#${item.id}`"
                class="block py-1.5 pl-2 text-sm text-mid-gray hover:text-charcoal transition-colors rounded-md hover:bg-light-gray"
              >{{ $t(item.labelKey) }}</a>
            </nav>

            <div class="mt-8 pt-6" style="border-top: 1px solid rgba(34,42,53,0.06);">
              <NuxtLink
                :to="localePath('/skills')"
                class="block text-xs text-mid-gray hover:text-charcoal transition-colors"
              >
                {{ $t('guidePage.tocBrowse') }} →
              </NuxtLink>
            </div>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { skills } from '~/data/skills'
const { t, locale } = useI18n()
const localePath = useLocalePath()
const skillCount = computed(() => skills.length)
const pageUrl = computed(() => `https://everythingskill.net${localePath('/guide')}`)

// ── SEO — follows same useHead(computed()) pattern as all other pages ──
useHead(computed(() => ({
  title: locale.value === 'zh'
    ? '什么是 Agent Skill？SKILL.md 完整指南 | EverythingSkill'
    : 'What is an Agent Skill? Complete Guide to SKILL.md | EverythingSkill',
  meta: [
    {
      name: 'description',
      content: locale.value === 'zh'
        ? '了解什么是 Agent Skill，SKILL.md 如何工作，哪些平台支持它，以及如何创建你的第一个 Skill。AI Skill 开放格式完整指南。'
        : 'Learn what an Agent Skill is, how SKILL.md works, which platforms support it, and how to create your first skill. The complete open-format guide.',
    },
    {
      property: 'og:title',
      content: locale.value === 'zh'
        ? '什么是 Agent Skill？SKILL.md 完整指南'
        : 'What is an Agent Skill? Complete Guide to SKILL.md',
    },
    {
      property: 'og:description',
      content: locale.value === 'zh'
        ? '了解什么是 Agent Skill，SKILL.md 如何工作，哪些平台支持它，以及如何创建你的第一个 Skill。'
        : 'Learn what an Agent Skill is, how SKILL.md works, which platforms support it, and how to create your first skill.',
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: pageUrl.value },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            headline: 'What is an Agent Skill? Complete Guide to SKILL.md',
            description: 'Learn what an Agent Skill is, how SKILL.md works, which platforms support it, and how to create your first skill. The complete guide to the open AI skill format.',
            url: 'https://everythingskill.net/guide',
            dateModified: '2026-04-11',
            publisher: { '@type': 'Organization', name: 'EverythingSkill', url: 'https://everythingskill.net' },
            mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://everythingskill.net/guide' },
          },
          {
            '@type': 'HowTo',
            name: 'How to Create Your First Agent Skill',
            description: 'Create an Agent Skill in 4 steps: create the directory, write SKILL.md, optionally add supporting files, and install it in your AI tool.',
            step: [
              { '@type': 'HowToStep', position: 1, name: 'Create the directory', text: 'Create a folder named after your skill using only lowercase letters, numbers, and hyphens.' },
              { '@type': 'HowToStep', position: 2, name: 'Write SKILL.md', text: 'Add YAML frontmatter with name and description fields, followed by Markdown instructions.' },
              { '@type': 'HowToStep', position: 3, name: 'Add supporting files (optional)', text: 'Add scripts/, references/, and assets/ directories as needed.' },
              { '@type': 'HowToStep', position: 4, name: 'Install into your AI tool', text: 'Copy the skill folder into .claude/skills/, .cursor/skills/, or .agents/skills/ depending on your platform.' },
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Do I need to code to create a skill?', acceptedAnswer: { '@type': 'Answer', text: 'No. A skill is just a Markdown file. If you can write a text document, you can create a skill.' } },
              { '@type': 'Question', name: 'Can I use the same skill across Claude, Cursor, and OpenAI Codex?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The SKILL.md format is an open standard supported by 25+ platforms. Write once, use everywhere.' } },
              { '@type': 'Question', name: 'What is the difference between a skill and a system prompt?', acceptedAnswer: { '@type': 'Answer', text: 'A system prompt is always loaded. A skill is loaded on demand — only when relevant to the current task.' } },
              { '@type': 'Question', name: 'How many skills can I install?', acceptedAnswer: { '@type': 'Answer', text: 'As many as you like. Since only metadata (~100 tokens per skill) is loaded at startup, dozens of skills carry minimal context cost.' } },
              { '@type': 'Question', name: 'What kinds of skills can I create?', acceptedAnswer: { '@type': 'Answer', text: 'Any kind — technical, workflow, and persona skills. Anything can be distilled into a skill.' } },
              { '@type': 'Question', name: 'What is the difference between Skills and MCP?', acceptedAnswer: { '@type': 'Answer', text: 'Skills package instructions in Markdown files. MCP connects agents to external tools via JSON-RPC servers. They are complementary.' } },
            ],
          },
        ],
      }),
    },
  ],
})))
// ── Data ──
const toc = [
  { id: 'what-is', labelKey: 'guidePage.toc1' },
  { id: 'why-matters', labelKey: 'guidePage.toc2' },
  { id: 'create', labelKey: 'guidePage.toc6' },
  { id: 'skill-md', labelKey: 'guidePage.toc4' },
  { id: 'platforms', labelKey: 'guidePage.toc5' },
  { id: 'how-it-works', labelKey: 'guidePage.toc3' },
  { id: 'vs-mcp', labelKey: 'guidePage.toc7' },
  { id: 'faq', labelKey: 'guidePage.toc8' },
]

const loadingTable = computed(() => [
  { level: t('guidePage.tableRow1Level'), when: t('guidePage.tableRow1When'), cost: '~100 tokens', what: 'name + description' },
  { level: t('guidePage.tableRow2Level'), when: t('guidePage.tableRow2When'), cost: '< 5,000 tokens', what: 'SKILL.md body' },
  { level: t('guidePage.tableRow3Level'), when: t('guidePage.tableRow3When'), cost: t('guidePage.tableRow3Cost'), what: t('guidePage.tableRow3What') },
])

const optionalFields = [
  { name: 'license', descKey: 'guidePage.s4LicenseDesc' },
  { name: 'compatibility', descKey: 'guidePage.s4CompatDesc' },
  { name: 'metadata', descKey: 'guidePage.s4MetaDesc' },
]

const platforms = [
  'Claude Code', 'Claude.ai', 'Cursor', 'OpenAI Codex',
  'VS Code / GitHub Copilot', 'Windsurf', 'Gemini CLI', 'Amp',
  'Roo Code', 'Goose', 'Cline', 'OpenCode', 'TRAE',
  'Kiro', 'JetBrains', 'OpenHands', 'Replit', 'Factory',
  'Manus', 'Zed', 'Qodo', 'Letta', 'Mistral Vibe', 'Agentman',
  'VT Code', 'Piebald',
]

const installPaths = computed(() => [
  { name: 'Claude Code', path: `.claude/skills/  or  ~/.claude/skills/` },
  { name: 'Cursor', path: `.cursor/skills/` },
  { name: 'OpenAI Codex', path: `.agents/skills/  or  ~/.agents/skills/` },
  { name: 'Windsurf', path: `.windsurf/skills/` },
])

const mcpTable = [
  { labelKey: 'guidePage.s7Row1Label', skillKey: 'guidePage.s7Row1Skill', mcpKey: 'guidePage.s7Row1Mcp' },
  { labelKey: 'guidePage.s7Row2Label', skillKey: 'guidePage.s7Row2Skill', mcpKey: 'guidePage.s7Row2Mcp' },
  { labelKey: 'guidePage.s7Row3Label', skillKey: 'guidePage.s7Row3Skill', mcpKey: 'guidePage.s7Row3Mcp' },
  { labelKey: 'guidePage.s7Row4Label', skillKey: 'guidePage.s7Row4Skill', mcpKey: 'guidePage.s7Row4Mcp' },
  { labelKey: 'guidePage.s7Row5Label', skillKey: 'guidePage.s7Row5Skill', mcpKey: 'guidePage.s7Row5Mcp' },
]
</script>
