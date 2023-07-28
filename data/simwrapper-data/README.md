# simwrapper-data: SFCTA Public SimWrapper Visualizations
In order to serve the files in `simwrapper-data` to the `sfcta/simwrapper` instance (deployed on its `gh-pages` branch), Github Pages is enabled on the entire `main` branch of this repo.

However, this is currently (May 2023) not used on the `sfcta/simwrapper` side, as this entire repo is checked out as a submodule within the `public/data` directory, due to the SimWrapper not handling having this repo's GitHub Pages as its Data Source well.