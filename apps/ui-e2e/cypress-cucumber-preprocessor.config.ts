import * as path from 'path'

const stepDefinitionsPath = path.resolve(process.cwd(), './src/integration')
const outputFolder = path.resolve(process.cwd(), '../../cyreport/cucumber-json')

module.exports = {
  nonGlobalStepDefinitions: true,
  stepDefinitions: stepDefinitionsPath,
  commonPath: stepDefinitionsPath,
  cucumberJson: {
    generate: true,
    outputFolder: outputFolder,
    filePrefix: '',
    fileSuffix: '.cucumber',
  },
}
