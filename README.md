# Machine learning addition to the micro:bit Python Editor V3

This project details the integration of machine learning into the micro:bit Python Editor V3 project. The end goal of this project is to enable a machine learning model to run on the device and for it to be accessible to code made in the micro:bit Python Editor.

The machine learning model of this projects functions the same as the one used in the [ML-Machine](https://ml-machine.org/) project, whose source code can be found at https://github.com/microbit-foundation/cctd-ml-machine. The user is expected to record training data on the aformentioned website before the use of this project. 

After that data is downloaded, the file can be opened on the Python Editor in the new tab called Machine Learning. By doing so, a machine learning model will be trained in browser and the names of the classes of said model, set by the user and present in the initial data recordings file, will be saved to the "namesOfClasses.txt" file in the project tab.

Once the model has been trained, the user can click on the header button of the Machine Learning tab to display the methods used with the machine learning model, in a similar fashion to the API and Reference tabs. For the last methods, where a class name has to be chosen, similar to the "is_gesture" of the Accelerometer module, the drop down menu that allows the name to be picked will contain the names of the classes of the currently trained and stored module. The user is able to return to the model training page, open a new dataset file, which will in turn train a new model. This will result in different class names being stored in the "namesOfClasses.txt" file and these new names also being available in the drop down menu of the methods.

While the current state of the project does produce a machine learning module in browser, this module is not added to the device alongside the user's code, as intended. However, the aformentioned "namesOfClasses.txt" file is added, which is to be used, both in the current state of the project and the final one, for the device to have a reference of the module's class names, as these are not included in the machine learning model. Additionally, a "ml.py" file is added to the initial project, which uses a new MicroPython module to read the class names from the "namesOfClasses.txt" file in the micro:bit's file system, and then simulates the machine learning model running on the device by choosing a random class name from the read list.

The end result of this project is a new tab to facilitate the training of a machine learning model from data recorded on the [ML-Machine](https://ml-machine.org/) website and the simulation of the model running on the micro:bit device. The user can write code to use the "model" and flash the resulting project on the device.

## Additional materials needed for the development of this project

For this version of the micro:bit Python Editor to be able to compile code correctly in MicroPython and run on the device, changes had to be made to the original https://github.com/microbit-foundation/micropython-microbit-v2 and https://github.com/microbit-foundation/micropython-microbit-stubs GitHub repositories, which can be found at https://github.com/PersonaOASIS/micropython-microbit-v2 and https://github.com/PersonaOASIS/micropython-microbit-stubs respectively. 
It is not necessary to run these two modified projects locally alongside the micro:bit Python Editor, as they were used to produce hex and stub files which have been added to this project. However, if, for further development of this project, changes to the MicroPython code are required, the aformentioned modified GitHub repositories will need to be changed and the resulting hex and stub files will need to replace the existing ones of this project.


The following is the original README content of the micro:bit Python Editor V3, included for further reference and for the way to run this project locally, which remains the same as detailed below:

# micro:bit Python Editor V3

This project is a web-based code editor that targets the [MicroPython](https://micropython.org) version of the [Python programming language](http://python.org/).

Code written with this editor is expected to run on the [BBC micro:bit device](https://microbit.org).

Try it out at https://python.microbit.org/

<figure>
  <img src="https://user-images.githubusercontent.com/44397098/193227581-58d86d58-d679-4244-ac80-2282007a20b9.png" alt="Screenshot of the Python editor showing the code editing area, Reference documentation and micro:bit simulator" width="100%">
  <figcaption>The image shows the micro:bit-branded deployment</figcaption>  
</figure>

## Previous versions

For more background about how this editor relates to the original Python Editor project, see [this explanation](https://github.com/bbcmicrobit/PythonEditor/issues/391).

The V2 editor project is still available at https://python.microbit.org/v/2 and its source code can be found in GitHub at https://github.com/bbcmicrobit/PythonEditor.

## Building and running the editor

We've written a [technical overview](./docs/tech-overview.md) that's a good starting point for working on the Python Editor or for using ideas and components from the app in other projects. We'd love to hear from you if you're making use of this project. You can get in touch via [support](https://support.microbit.org/).

Getting up and running:

1. Ensure you have a working [Node.js environment](https://nodejs.org/en/download/). We recommend using the LTS version of Node and NPM version 8 or newer.
2. Checkout this repository with Git. GitHub have some [learning resources for Git](https://docs.github.com/en/get-started/quickstart/git-and-github-learning-resources) that you may find useful.
3. Install the dependencies by running `npm install` on the command line in the checkout folder.
4. Choose from the NPM scripts documented below. Try `npm start` if you're not sure.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

If you have a connected micro:bit device, then setting the environment variable `TEST_MODE_DEVICE=1` will enable additional tests that will connect to your micro:bit. The tests will overwrite programs and data on the micro:bit.

### `npm run test:e2e`

Launches the test runner in the interactive watch mode running the end to end tests.

These are excluded from the normal test run.

The tests expect the app to already be running on http://localhost:3000, for example via `npm start`.

We use [Puppeteer](https://pptr.dev/) and the helpers provided by [Testing Library](https://testing-library.com/docs/pptr-testing-library/intro/).

The CI tests run these end-to-end tests against a production build.

### `npm run test:all --testPathPattern autocomplete`

An example of how to use jest options to filter to a specific subset of the tests (e2e or unit).

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployments

Most users should use the supported Foundation deployment at https://python.microbit.org/

The editor is deployed by [CircleCI](https://circleci.com/gh/microbit-foundation/python-editor-v3).

The `main` branch is deployed to https://python.microbit.org/v/beta on each push.

Other branches (e.g. for PRs) are deployed to https://review-python-editor-v3.microbit.org/{branch}. Special characters in the branch name are replaced by hyphens.

## License

This software is under the MIT open source license.

[SPDX-License-Identifier: MIT](LICENSE)

Binaries for MicroPython are included for micro:bit V1 ([license](https://github.com/bbcmicrobit/micropython/blob/master/LICENSE)) and micro:bit V2 ([license](https://github.com/microbit-foundation/micropython-microbit-v2/blob/master/LICENSE)). Both are MIT licensed.

Python diagnostics and autocomplete use a fork of Microsoft's Pyright type checker which has been [modified by us](public/workers/PYRIGHT_README.txt) to run as a Web Worker. Pyright is © Microsoft Corporation and [used under an MIT license](public/workers/PYRIGHT_LICENSE.txt).

We use dependencies via the NPM registry as specified by the package.json file under common Open Source licenses.

Full details of each package can be found by running `license-checker`:

```bash
$ npx license-checker --direct --summary --production
```

Omit the flags as desired to obtain more detail.

## Code of Conduct

Trust, partnership, simplicity and passion are our core values we live and
breathe in our daily work life and within our projects. Our open-source
projects are no exception. We have an active community which spans the globe
and we welcome and encourage participation and contributions to our projects
by everyone. We work to foster a positive, open, inclusive and supportive
environment and trust that our community respects the micro:bit code of
conduct. Please see our [code of conduct](https://microbit.org/safeguarding/)
which outlines our expectations for all those that participate in our
community and details on how to report any concerns and what would happen
should breaches occur.
