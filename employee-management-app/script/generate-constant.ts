import { promises as fs } from 'fs'
import path from 'path'

const main = async () => {
  const constantLocaleDirPath = path.join('.', 'src', 'common', 'constants')

  const filenames = await fs.readdir(constantLocaleDirPath)

  const translationKeys = await Promise.all(
    filenames.map(async (filename) => {
      const file = await fs.readFile(
        path.join(constantLocaleDirPath, filename),
        'utf8'
      )
      const data = file
        .split('[')[1]
        .split(']')[0]
        .split(/,/)
        .map((el) => el.replace(/\n|'/g, '').trim())
        .filter(Boolean)
      return data
    })
  )

  const result = await translationKeys.flat()
  const parsedToObject = Object.fromEntries(result.map((v) => [v, v]))

  return parsedToObject
}

const updateLocalisationFiles = async (constants: Record<string, string>) => {
  const localisationDirPath = path.join('.', 'public', 'locales')

  const filenames = await fs.readdir(localisationDirPath)

  await Promise.all(
    filenames.map(async (filename) => {
      if (filename !== '__lng__') {
        const file = await fs.readFile(
          path.join(localisationDirPath, filename, 'common.json'),
          'utf8'
        )

        const parsedFileToJSON: Record<string, string> = JSON.parse(file)

        // append constants data into object
        Object.keys(constants).forEach((key) => {
          if (!Object.prototype.hasOwnProperty.call(parsedFileToJSON, key)) {
            Object.assign(parsedFileToJSON, { [key]: constants[key] })
          }
        })

        // write to destination json file
        fs.writeFile(
          path.join(localisationDirPath, filename, 'common.json'),
          JSON.stringify(parsedFileToJSON, null, 2),
          'utf8'
        )
      }
    })
  )
}

main()
  .then((data) => {
    updateLocalisationFiles(data)
  })
  .catch((error) => {
    console.error(error)
  })
