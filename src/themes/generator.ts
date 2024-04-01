import { workspace } from 'vscode'
import * as defaultSettings from '../defaultConfig.json'
import colorObjArr from '../utils/colorObjArr'
import { Theme } from './Theme'
export const generateTheme = {
  default: async function () {
    return await Theme.init(defaultSettings)
  },
  fromSettings: async function (themeName?: string) {
    const configuration = workspace.getConfiguration('oneMidnight')
    let colorObj = {}
    colorObjArr.forEach((item) => {
      let value = configuration.get<object>('color')[item]
      if (value) {
        colorObj[item] = value
      }
    })
    const buildConfig = {
      bold: configuration.get<boolean>('bold', defaultSettings.bold),
      editorTheme:
        themeName ||
        configuration.get<string>('editorTheme', defaultSettings.editorTheme),
      italic: configuration.get<boolean>('italic', defaultSettings.italic),
      vivid: configuration.get<boolean>('vivid', defaultSettings.vivid),
      ...colorObj,
    }
    return await Theme.init(buildConfig)
  },
}
