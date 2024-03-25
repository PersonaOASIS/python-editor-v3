/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */

import { fromByteArray } from "base64-js";
import { MAIN_FILE } from "./fs";

/**
 * We can now initialize a project with multiple files.
 * Handling is in place for backwards compatibility for V2 projects
 * where only the main file content is initialized as a string.
 */
export interface PythonProject {
  // File content as base64.
  files: Record<string, string>;
  projectName?: string;
}

/**
 *
 * @param project PythonProject.
 * @returns PythonProject where all file content has been converted to base64.
 */
export const projectFilesToBase64 = (
  files: Record<string, string>
): Record<string, string> => {
  for (const file in files) {
    files[file] = fromByteArray(new TextEncoder().encode(files[file]));
  }
  return files;
};

export const defaultMainFileContent = `# Imports go at the top
from microbit import *


# Code in a 'while True:' loop repeats forever
while True:
    display.show(Image.HEART)
    sleep(1000)
    display.scroll('Hello')
`;

//remember to change in stubs to have mlreader not be an error
export const defaultML = `# A mockup of a machine learning micropython module
from microbit import *
import random
import mlreader


def get_class_names():
    
    namesList = mlreader.read_class_names()
    return namesList

def current_action():

    list = mlreader.read_class_names()
    sizeList = len(list) - 1
    rnd = random.randrange(sizeList)
    return list[rnd]

def is_action(action):

    list = mlreader.read_class_names()
    if action in list:
        sizeList = len(list) - 1
        rnd = random.randrange(sizeList)
        if action == list[rnd]:
            return True
        else:
            return False
    else:
        return False

def was_action(action):
    list = mlreader.read_class_names()
    if action in list:
        sizeList = len(list) - 1
        rnd = random.randrange(sizeList)
        if action == list[rnd]:
            return True
        else:
            return False
    else:
        return False
`;

export const defaultText = `shake still`;

export const defaultInitialProject: PythonProject = {
  files: projectFilesToBase64({
    [MAIN_FILE]: defaultMainFileContent,
    ["ml.py"]: defaultML,
    ["namesOfClasses.txt"]: defaultText,
  }),
};
