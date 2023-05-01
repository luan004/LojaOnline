

export function formatCep(value) {
    value = value.replace(/\D/g, "");
    if (value.length < 6 || value.includes('-')) {
        return value;
    }
    const fp = value.substring(0, 5);
    const sp = value.substring(5);
    return fp + "-" + sp;
}