import json

# Helper to safely parse input string to dictionary
def ensure_dict(input_data):
    """Safely converts a JSON string to a dictionary."""
    if isinstance(input_data, str):
        return json.loads(input_data)
    return input_data

def format_binary_search_input(testcase):
    data = ensure_dict(testcase["input"])
    arr = data.get("arr", [])
    target = data.get("target")
    formatted_str = f"{len(arr)}\n{' '.join(map(str, arr))}\n{target}"
    return {"input": formatted_str}

def format_recursive_binary_search_input(testcase):
    data = ensure_dict(testcase["input"])
    arr = data.get("arr", [])
    target = data.get("target")
    formatted_str = f"{len(arr)}\n{' '.join(map(str, arr))}\n{target}"
    return {"input": formatted_str}

def format_linear_search_input(testcase):
    data = ensure_dict(testcase["input"])
    arr = data.get("arr", [])
    target = data.get("target")
    formatted_str = f"{len(arr)}\n{' '.join(map(str, arr))}\n{target}"
    return {"input": formatted_str}

def format_bubble_sort_input(testcase):
    data = ensure_dict(testcase["input"])
    arr = data.get("arr", [])
    formatted_str = f"{len(arr)}\n{' '.join(map(str, arr))}"
    return {"input": formatted_str}

def format_selection_sort_input(testcase):
    data = ensure_dict(testcase["input"])
    arr = data.get("arr", [])
    formatted_str = f"{len(arr)}\n{' '.join(map(str, arr))}"
    return {"input": formatted_str}

def format_insertion_sort_input(testcase):
    data = ensure_dict(testcase["input"])
    arr = data.get("arr", [])
    formatted_str = f"{len(arr)}\n{' '.join(map(str, arr))}"
    return {"input": formatted_str}

def format_merge_sort_input(testcase):
    data = ensure_dict(testcase["input"])
    arr = data.get("arr", [])
    formatted_str = f"{len(arr)}\n{' '.join(map(str, arr))}"
    return {"input": formatted_str}

def format_quick_sort_input(testcase):
    data = ensure_dict(testcase["input"])
    arr = data.get("arr", [])
    formatted_str = f"{len(arr)}\n{' '.join(map(str, arr))}"
    return {"input": formatted_str}

def format_dfs_input(testcase):
    data = ensure_dict(testcase["input"])
    n = data.get("n", 0)
    edges = data.get("edges", [])
    start = data.get("start")
    edge_lines = '\n'.join([f"{u} {v}" for u, v in edges])
    formatted_str = f"{n} {len(edges)}\n{edge_lines}\n{start}"
    return {"input": formatted_str}

def format_bfs_input(testcase):
    data = ensure_dict(testcase["input"])
    n = data.get("n", 0)
    edges = data.get("edges", [])
    start = data.get("start")
    edge_lines = '\n'.join([f"{u} {v}" for u, v in edges])
    formatted_str = f"{n} {len(edges)}\n{edge_lines}\n{start}"
    return {"input": formatted_str}


def format_input(problem_id, testcase):
    """
    Master function to call the appropriate formatter based on the problem_id.
    """
    input_formatters = {
        1: format_binary_search_input,
        2: format_recursive_binary_search_input,
        3: format_linear_search_input,
        4: format_bubble_sort_input,
        5: format_selection_sort_input,
        6: format_insertion_sort_input,
        7: format_merge_sort_input,
        8: format_quick_sort_input,
        9: format_dfs_input,
        10: format_bfs_input,
    }
    formatter = input_formatters.get(problem_id)
    if not formatter:
        raise ValueError(f"No formatter found for problem_id {problem_id}")
    return formatter(testcase)