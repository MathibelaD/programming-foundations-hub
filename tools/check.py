#!/usr/bin/env python3
"""Lints the lessons in content/.

Checks
------
- every ::: block is closed, and blocks are never nested
- untitled hint/solution blocks come straight after something they can belong to
- internal links (#/phase-xx/NN-slug) point at lessons that exist
- the concept ladder: code blocks do not use features before the phase that teaches them
- front matter has title, summary, minutes and stage

Run:  python3 tools/check.py
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "content")

OPEN = re.compile(r"^:::[ \t]*([a-z][a-z-]*)[ \t]*(.*)$")
CLOSE = re.compile(r"^:::[ \t]*$")
FENCE = re.compile(r"^(```|~~~)")
LINK = re.compile(r"\]\(#/([a-z0-9-]+/[a-z0-9-]+)(?:#[^)]*)?\)")
ANSWERABLE = {"exercise", "challenge", "predict", "debug", "project", "hint", "solution", "refactor", "try"}

# (first phase allowed, regex, description). Only checked inside ```js fences.
LADDER = [
    (2, r"\bif\s*\(", "if"),
    (2, r"===|!==", "strict comparison"),
    (3, r"\bwhile\s*\(", "while loop"),
    (3, r"\bfor\s*\(", "for loop"),
    (4, r"\bfunction\b", "function"),
    (4, r"=>", "arrow function"),
    (5, r"\.push\(|\.pop\(|\.splice\(", "array methods"),
    (6, r"JSON\.|require\(\"fs\"\)", "JSON / fs"),
    (7, r"\.(forEach|map|filter|find|findIndex|some|every|reduce|sort)\(", "callback array methods"),
    (8, r"module\.exports|require\(\"\./", "modules"),
    (99, r"\bvar\s+\w", "var"),
    (99, r"\bclass\s+\w|\basync\b|\bawait\b|\.then\(", "classes/async"),
]
# Lessons that intentionally show a later concept (as a teaser or a comparison)
LADDER_EXEMPT = {
    "phase-00-start-here/02-what-is-programming",
    "phase-00-start-here/03-the-map",
    "phase-01-storing-information/03-let-and-const",   # explains why not var
    "phase-08-becoming-a-programmer/06-what-to-learn-next",
    "phase-08-becoming-a-programmer/07-glossary",
}


def lessons():
    for pdir in sorted(os.listdir(CONTENT)):
        full = os.path.join(CONTENT, pdir)
        if not os.path.isdir(full):
            continue
        for name in sorted(os.listdir(full)):
            if name.endswith(".md") and not name.startswith("_"):
                yield pdir, name[:-3], os.path.join(full, name)


def main():
    all_ids = {f"{p}/{n}" for p, n, _ in lessons()}
    problems = []

    for pdir, slug, path in lessons():
        lid = f"{pdir}/{slug}"
        phase = int(re.match(r"phase-(\d+)", pdir).group(1))
        text = open(path, encoding="utf-8").read()
        say = lambda line, msg: problems.append(f"{lid}:{line}: {msg}")

        fm = re.match(r"\A---\n(.*?)\n---\n", text, re.S)
        if not fm:
            say(1, "missing front matter")
        else:
            for key in ("title", "summary", "minutes", "stage"):
                if not re.search(rf"^{key}:", fm.group(1), re.M):
                    say(1, f"front matter missing '{key}'")

        current, prev_kind, fence, lang, opened_at = None, None, None, "", 0
        for i, line in enumerate(text.split("\n"), 1):
            f = FENCE.match(line)
            if fence:
                if f and line.strip().startswith(fence):
                    fence = None
                    continue
                if lang in ("js", "javascript") and lid not in LADDER_EXEMPT:
                    code = re.sub(r"//.*$", "", line)
                    code = re.sub(r"([\"'`]).*?\1", '""', code)
                    for first, pattern, what in LADDER:
                        if phase < first and re.search(pattern, code):
                            say(i, f"uses {what} before phase {first}: {line.strip()}")
                continue
            if f:
                fence = f.group(1)
                lang = line.strip()[3:].strip().lower()
                continue
            if CLOSE.match(line):
                if not current:
                    say(i, "stray ::: close with no open block")
                prev_kind, current = current, None
                continue
            m = OPEN.match(line)
            if m:
                if current:
                    say(i, f"::: {m.group(1)} opened inside ::: {current} (line {opened_at}); blocks cannot nest")
                kind = m.group(1)
                # A titled solution ("Full solution: ...") may stand alone; untitled ones answer the block above
                standalone = kind == "solution" and m.group(2).strip()
                if kind in ("hint", "solution") and prev_kind not in ANSWERABLE and not standalone:
                    say(i, f"::: {kind} follows '{prev_kind}', not an exercise-like block")
                current, opened_at = kind, i
                continue
            if line.strip() and not current:
                prev_kind = None
            for target in LINK.findall(line):
                if target not in all_ids:
                    say(i, f"broken link #/{target}")
        if current:
            say(opened_at, f"::: {current} never closed")
        if fence:
            say(0, "unclosed code fence")

    for p in problems:
        print(p)
    print(f"\n{len(all_ids)} lessons checked, {len(problems)} problem(s).")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
