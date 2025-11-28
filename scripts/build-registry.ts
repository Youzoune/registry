#!/usr/bin/env bun

import fs from 'fs/promises'
import path from 'path'

interface RegistryItem {
  name: string
  type: string
  description: string
  dependencies: string[]
  devDependencies: string[]
  registryDependencies: string[]
  files: Array<{
    path: string
    content?: string
    type: string
    target?: string
  }>
  tailwind?: any
  cssVars?: any
  meta?: any
}

interface Registry {
  style: string
  rsc: boolean
  tsx: boolean
  tailwind: any
  aliases: any
  registry: RegistryItem[]
}

async function buildRegistry() {
  try {
    console.log('🔨 Building Youzoune Registry...')

    // Read the registry configuration
    const registryPath = path.join(process.cwd(), 'registry.json')
    const registryContent = await fs.readFile(registryPath, 'utf8')
    const registry: Registry = JSON.parse(registryContent)

    // Ensure the public/r directory exists
    const publicRDir = path.join(process.cwd(), 'public', 'r')
    await fs.mkdir(publicRDir, { recursive: true })

    // Process each registry item
    for (const item of registry.registry) {
      console.log(`📦 Processing ${item.name}...`)

      // Read file contents for each file in the item
      const processedItem = { ...item }

      for (const file of processedItem.files) {
        try {
          const filePath = path.join(process.cwd(), file.path)
          const content = await fs.readFile(filePath, 'utf8')
          file.content = content
        } catch (error) {
          console.warn(`⚠️  Could not read file: ${file.path}`)
          file.content = ''
        }
      }

      // Write the processed item to public/r/{name}.json
      const outputPath = path.join(publicRDir, `${item.name}.json`)
      await fs.writeFile(outputPath, JSON.stringify(processedItem, null, 2))

      console.log(`✅ Generated ${item.name}.json`)
    }

    // Create an index file with all available items
    const indexContent = {
      name: 'youzoune-registry',
      description: 'Youzoune public registry for shadcn/ui components',
      items: registry.registry.map((item) => ({
        name: item.name,
        type: item.type,
        description: item.description,
      })),
    }

    await fs.writeFile(
      path.join(publicRDir, 'index.json'),
      JSON.stringify(indexContent, null, 2),
    )

    console.log('🎉 Registry build completed successfully!')
    console.log(`📁 Generated ${registry.registry.length} registry items`)
  } catch (error) {
    console.error('❌ Failed to build registry:', error)
    process.exit(1)
  }
}

// Run the build
buildRegistry()
