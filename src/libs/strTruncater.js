

function TruncateAtWord(str, max, ellipsis = '…') {
    if (str.length <= max) return str;
    let trimmed = str.substr(0, max);
    if (str[max] !== ' ') {
        trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')));
    }
    return trimmed + ellipsis;
}

export default TruncateAtWord;