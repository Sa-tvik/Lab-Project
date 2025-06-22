export function ParseProblem(rawProblem) {
    const { title, tags, order_id } = rawProblem;
    const fullText = rawProblem.description || "";

    const [descPart, examplesPartRaw, constraintsPartRaw] = fullText.split(/Examples:|Constraints:/);

    let examples = [];
    try {
        examples = JSON.parse(examplesPartRaw?.trim() || "[]");
    } catch (err) {
        console.error("Failed to parse examples:", err);
    }

    const constraints = constraintsPartRaw
        ?.trim()
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean) || [];

    return {
        title,
        tags,
        order_id,
        description: descPart?.trim() || "",
        examples,
        constraints,
    };
}
