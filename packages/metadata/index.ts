import {MetadataItem} from './types'

export * from './types'

export default [
  {
    name: 'core',
    entry: 'src/index.ts',
    formats: ['es', 'cjs', 'iife'],
  },
] as MetadataItem[]
