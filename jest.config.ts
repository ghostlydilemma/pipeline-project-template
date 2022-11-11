import { getJestProjects } from '@nrwl/jest'

process.env.TZ = 'UTC'

export default {
  projects: getJestProjects(),
}
