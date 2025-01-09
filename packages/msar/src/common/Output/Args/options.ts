import cli from '@battis/qui-cli';

export const defaults = {
  outputOptions: {
    outputPath: process.cwd()
  }
};

export const options = {
  outputPath: {
    short: 'o',
    description: `Path to output directory or file to save command output (default: ${cli.colors.quotedValue(`"${defaults.outputOptions.outputPath}"`)})`,
    default: defaults.outputOptions.outputPath
  }
};
