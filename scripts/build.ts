import {build} from 'vite'
import {generateDtsBundle} from 'dts-bundle-generator'
import {resolve} from 'path'
import {writeFile} from 'fs/promises'
import metadata from '@monitor/metadata'

const packageDir = (name: string) => resolve(__dirname, `../packages/${name}`)
const outputDir = (name: string) =>
  resolve(__dirname, `../packages/${name}/dist`)

const fileName: Record<string, string> = {
  es: `index.mjs`,
  cjs: `index.cjs`,
  iife: `index.iife.js`,
}

async function buildAll() {
  await Promise.all(
    metadata.map(async item => {
      const entry = packageDir(`${item.name}/${item.entry}`)
      const outDir = outputDir(item.name)

      await build({
        root: packageDir(item.name),
        build: {
          lib: {
            entry: entry,
            name: item.name,
            formats: item.formats,
            fileName: format => fileName[format],
          },
          outDir,
        },
      })

      const dtsBundle = generateDtsBundle([
        {
          filePath: entry,
        },
      ])
      await writeFile(`${outDir}/index.d.ts`, dtsBundle)
    }),
  )
}

// run build all
;(async () => {
  await buildAll()
})()
