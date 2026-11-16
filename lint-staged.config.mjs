const sourceFilePattern = /\.(?:c|m)?js$/

const markdownFilePattern = /\.(?:md|mdx)$/

const jsonFilePattern = /(?:^|\/)package\.json$/

const generatedRedesignPattern = /(?:^|\/)scripts\/[^/]+-redesign\.user\.js$/

const bannerTextPattern = /(?:^|\/)src\/[^/]+\/header\.js$/

const quoteShellArgument = (filePath) =>
  `'${filePath.replaceAll("'", "'\\''")}'`

const getFileArguments = (filePaths) =>
  filePaths.map(quoteShellArgument).join(" ")

export default {
  "*": (stagedFilePaths) => {
    // Generated redesign bundles are checked from src, not as staged source.
    // header.js files are metadata banner text, not program source.
    const sourceFilePaths = stagedFilePaths.filter(
      (filePath) =>
        sourceFilePattern.test(filePath) &&
        !generatedRedesignPattern.test(filePath.replaceAll("\\", "/")) &&
        !bannerTextPattern.test(filePath.replaceAll("\\", "/"))
    )
    const jsonFilePaths = stagedFilePaths.filter((filePath) =>
      jsonFilePattern.test(filePath)
    )
    const markdownFilePaths = stagedFilePaths.filter((filePath) =>
      markdownFilePattern.test(filePath)
    )

    const commands = []

    if (sourceFilePaths.length > 0) {
      const fileArguments = getFileArguments(sourceFilePaths)
      commands.push(
        `oxfmt --no-error-on-unmatched-pattern ${fileArguments}`,
        `oxlint --no-error-on-unmatched-pattern ${fileArguments}`
      )
    }

    if (jsonFilePaths.length > 0) {
      const fileArguments = getFileArguments(jsonFilePaths)
      commands.push(`oxfmt --no-error-on-unmatched-pattern ${fileArguments}`)
    }

    if (markdownFilePaths.length > 0) {
      const fileArguments = getFileArguments(markdownFilePaths)
      commands.push(`markdownlint-cli2 --no-globs --fix ${fileArguments}`)
    }

    return commands
  },
}
