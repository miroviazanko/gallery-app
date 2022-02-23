export function getUrlLastPart(url) {
    const paths = url.split("/").filter(entry => entry !== "");
    const lastPath = paths[paths.length - 1];
    return lastPath;
}