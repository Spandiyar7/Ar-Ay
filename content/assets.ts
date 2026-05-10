const githubPagesBasePath = process.env.GITHUB_PAGES === "true" ? "/Ar-Ay" : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? githubPagesBasePath;

export function assetPath(path: `/${string}`) {
  return `${basePath}${path}`;
}
