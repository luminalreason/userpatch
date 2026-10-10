const sourceFilePattern = /\.(?:c|m)?js$/

const markdownFilePattern = /\.(?:md|mdx)$/

const jsonFilePattern = /(?:^|\/)package\.json$/

const quoteShellArgument = (filePath) =>
  `'${filePath.replaceAll("'", "'\\''")}'`

const getFileArguments = (filePaths) =>
  filePaths.map(quoteShellArgument).join(" ")

export default {
  "*": (stagedFilePaths) => {
    const sourceFilePaths = stagedFilePaths.filter((filePath) =>
      sourceFilePattern.test(filePath)
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
