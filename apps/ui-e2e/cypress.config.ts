import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'
import { defineConfig } from 'cypress'

export default defineConfig({
  // e2e: nxE2EPreset(__dirname),
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: '**/*.feature',
    supportFile: './src/integration/index.ts',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config)

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )

      // Make sure to return the config object as it might have been modified by the plugin.
      return config
    },
  },
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  modifyObstructiveCode: false,
  video: true,
  videosFolder: '../../dist/cypress/apps/sandbox-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/sandbox-e2e/screenshots',
  chromeWebSecurity: false,
})
