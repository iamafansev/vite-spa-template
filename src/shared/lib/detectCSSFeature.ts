/**
 * Detects if a given CSS feature is supported by the browser.
 *
 * This function checks for the presence of a CSS feature in the browser's
 * `document` object. It also checks for vendor-prefixed versions of the
 * feature.
 *
 * @param featureName - The name of the CSS feature to detect.
 * @returns `true` if the feature is supported, `false` otherwise.
 */
export const detectCSSFeature = (featureName: string): boolean => {
  let feature = false;
  const domPrefixes = ["Webkit", "Moz", "ms", "O"];
  const elm = document.createElement("div");
  const featurenameCapital =
    featureName.charAt(0).toUpperCase() + featureName.slice(1);

  if (featureName in elm.style) {
    feature = true;
  } else {
    for (const prefix of domPrefixes) {
      if (prefix + featurenameCapital in elm.style) {
        feature = true;
        break;
      }
    }
  }

  return feature;
};
