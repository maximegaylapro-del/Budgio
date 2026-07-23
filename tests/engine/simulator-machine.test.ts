import { describe, it, expect } from "vitest";
import { reducer, initState, visibleGroups } from "@/lib/engine/simulator-machine";
import type { QuestionGroup } from "@/types/simulator";

const TOTAL = 3;

describe("simulator-machine reducer", () => {
  it("starts on intro then moves to first question", () => {
    const s0 = initState({ a: 1 });
    expect(s0.phase).toBe("intro");
    const s1 = reducer(s0, { type: "START" }, TOTAL);
    expect(s1.phase).toBe("question");
    expect(s1.stepIndex).toBe(0);
  });

  it("advances through steps and reaches result at the end", () => {
    let s = reducer(initState({}), { type: "START" }, TOTAL);
    s = reducer(s, { type: "NEXT" }, TOTAL); // step 1
    s = reducer(s, { type: "NEXT" }, TOTAL); // step 2 (last)
    expect(s.stepIndex).toBe(2);
    s = reducer(s, { type: "NEXT" }, TOTAL); // -> result
    expect(s.phase).toBe("result");
  });

  it("BACK from result returns to last question", () => {
    const s = reducer({ phase: "result", stepIndex: 2, answers: {} }, { type: "BACK" }, TOTAL);
    expect(s.phase).toBe("question");
    expect(s.stepIndex).toBe(TOTAL - 1);
  });

  it("BACK from first question returns to intro", () => {
    const s = reducer({ phase: "question", stepIndex: 0, answers: {} }, { type: "BACK" }, TOTAL);
    expect(s.phase).toBe("intro");
  });

  it("ANSWER stores a value immutably", () => {
    const s0 = initState({ region: "ville" });
    const s1 = reducer(s0, { type: "ANSWER", id: "region", value: "rural" }, TOTAL);
    expect(s1.answers.region).toBe("rural");
    expect(s0.answers.region).toBe("ville"); // pas de mutation
  });

  it("RESTART resets to defaults and intro", () => {
    const s = reducer(
      { phase: "result", stepIndex: 2, answers: { x: 9 } },
      { type: "RESTART", defaults: { x: 1 } },
      TOTAL,
    );
    expect(s).toEqual({ phase: "intro", stepIndex: 0, answers: { x: 1 } });
  });
});

describe("visibleGroups", () => {
  const groups: QuestionGroup[] = [
    { id: "g1", questions: [{ id: "a", type: "text", title: "A" }] },
    {
      id: "g2",
      questions: [{ id: "b", type: "text", title: "B", showIf: (ans) => ans.a === "yes" }],
    },
  ];

  it("hides groups whose questions are all filtered out", () => {
    expect(visibleGroups(groups, { a: "no" })).toHaveLength(1);
    expect(visibleGroups(groups, { a: "yes" })).toHaveLength(2);
  });
});
