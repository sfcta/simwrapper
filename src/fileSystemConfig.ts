import { FileSystemConfig } from '@/Globals'

const fileSystems: FileSystemConfig[] = [
  {
    name: 'Sample Data',
    slug: 'samples',
    description: 'Some test data for SFCTA',
    baseURL: 'https://svn.vsp.tu-berlin.de/repos/public-svn/shared/billy/simwrapper/sample-data',
    thumbnail: '/simwrapper/images/thumb-localfiles.jpg',
  },
  {
    name: 'Localhost',
    slug: 'local',
    description: 'Run mini-file-server to browse files on your PC',
    baseURL: 'http://localhost:8000',
    thumbnail: '/simwrapper/images/thumb-localfiles.jpg',
  },
  {
    name: 'Public Scenarios',
    slug: 'public',
    description: 'Simulation results from VSP at TU-Berlin',
    baseURL: 'https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries',
    thumbnail: '/simwrapper/images/thumb-chart.jpg',
    skipList: ['episim/battery'],
    hidden: true,
  },
]

for (let port = 8000; port < 8500; port++) {
  fileSystems.push({
    name: 'Localhost ' + port,
    slug: `${port}`,
    description: 'Localhost ' + port,
    description_de: 'Localhost ' + port,
    baseURL: 'http://localhost:' + port,
    thumbnail: '/simwrapper/images/thumb-localfiles.jpg',
    hidden: true,
  })
}

export default fileSystems
