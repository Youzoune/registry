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
  name: string
  displayName?: string
  description?: string
  author?: string
  style: string
  rsc: boolean
  tsx: boolean
  tailwind: any
  aliases: any
  metadata?: {
    version?: string
    tags?: string[]
    category?: string
    license?: string
    featured?: boolean
    previewComponent?: string
  }
  registry: RegistryItem[]
}

async function buildAllRegistries() {
  try {
    console.log('🔨 Building all registries...')

    // Check if we have the new multi-registry structure
    const registriesDir = path.join(process.cwd(), 'registries')
    const legacyRegistryPath = path.join(process.cwd(), 'registry.json')
    
    let registryFiles: string[] = []
    
    // Handle both legacy single registry and new multi-registry structure
    if (await exists(registriesDir)) {
      const files = await fs.readdir(registriesDir)
      registryFiles = files.filter(f => f.endsWith('.json')).map(f => path.join(registriesDir, f))
    } else if (await exists(legacyRegistryPath)) {
      // Legacy mode - single registry.json
      registryFiles = [legacyRegistryPath]
      console.log('📦 Using legacy registry.json (consider migrating to registries/ directory)')
    } else {
      console.error('❌ No registry configuration found')
      console.log('💡 Run: bun run scripts/create-registry.ts my-registry --display="My Registry" --description="..." --author="..."')
      process.exit(1)
    }

    if (registryFiles.length === 0) {
      console.log('⚠️  No registry files found')
      return
    }

    // Ensure the public/r directory exists
    const publicRDir = path.join(process.cwd(), 'public', 'r')
    await fs.mkdir(publicRDir, { recursive: true })

    let totalProcessed = 0
    const allRegistries: Array<{name: string, displayName: string, description: string, componentCount: number, featured: boolean}> = []

    // Process each registry
    for (const registryFile of registryFiles) {
      console.log(`📋 Processing registry: ${path.basename(registryFile)}`)
      
      try {
        const registryContent = await fs.readFile(registryFile, 'utf8')
        const registry: Registry = JSON.parse(registryContent)
        
        // Determine registry name and output directory
        const registryName = registry.name || path.basename(registryFile, '.json')
        const isLegacy = registryFile.endsWith('registry.json')
        const outputDir = isLegacy ? publicRDir : path.join(publicRDir, registryName)
        
        // Create output directory
        await fs.mkdir(outputDir, { recursive: true })

        // Process each registry item
        for (const item of registry.registry) {
          console.log(`  📦 Processing ${item.name}...`)

          // Read file contents for each file in the item
          const processedItem = { ...item }

          for (const file of processedItem.files) {
            try {
              // Handle both legacy and new path structures
              let filePath = path.join(process.cwd(), file.path)
              
              // If file doesn't exist, try with src/ prefix for legacy compatibility
              if (!(await exists(filePath)) && !file.path.startsWith('src/')) {
                filePath = path.join(process.cwd(), 'src', file.path)
              }
              
              if (await exists(filePath)) {
                const content = await fs.readFile(filePath, 'utf8')
                file.content = content
                
                // Set default target if not specified
                if (!file.target) {
                  const basename = path.basename(file.path)
                  file.target = `components/${basename}`
                }
              } else {
                console.warn(`⚠️  Could not read file: ${file.path}`)
                file.content = file.content || ''
              }
            } catch (error) {
              console.warn(`⚠️  Error reading file ${file.path}:`, error)
              file.content = file.content || ''
            }
          }

          // Write the processed item to output directory
          const outputPath = path.join(outputDir, `${item.name}.json`)
          await fs.writeFile(outputPath, JSON.stringify(processedItem, null, 2))

          console.log(`    ✅ Generated ${item.name}.json`)
          totalProcessed++
        }

        // Create registry-specific index file
        const indexContent = {
          name: registryName,
          displayName: registry.displayName || registryName,
          description: registry.description || `Registry for ${registryName}`,
          author: registry.author,
          version: registry.metadata?.version || '1.0.0',
          style: registry.style,
          componentCount: registry.registry.length,
          items: registry.registry.map((item) => ({
            name: item.name,
            type: item.type,
            description: item.description,
          })),
        }

        const indexPath = isLegacy ? 
          path.join(outputDir, 'index.json') : 
          path.join(outputDir, 'index.json')
        
        await fs.writeFile(indexPath, JSON.stringify(indexContent, null, 2))

        // Add to global registry list
        allRegistries.push({
          name: registryName,
          displayName: registry.displayName || registryName,
          description: registry.description || `Registry for ${registryName}`,
          componentCount: registry.registry.length,
          featured: registry.metadata?.featured || false
        })

        console.log(`✅ Registry "${registryName}" built successfully (${registry.registry.length} components)`)
        
      } catch (error) {
        console.error(`❌ Failed to process registry ${registryFile}:`, error)
      }
    }

    // Create global registries index (for multi-registry setups)
    if (registryFiles.length > 1 || !registryFiles[0].endsWith('registry.json')) {
      const globalIndex = {
        name: 'registries',
        description: 'Available component registries',
        registries: allRegistries.sort((a, b) => {
          // Featured registries first, then by name
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.name.localeCompare(b.name)
        }),
        totalComponents: totalProcessed,
        totalRegistries: allRegistries.length,
        updatedAt: new Date().toISOString()
      }

      await fs.writeFile(
        path.join(publicRDir, 'registries.json'),
        JSON.stringify(globalIndex, null, 2)
      )
      
      console.log(`📋 Global registries index created`)
    }

    console.log(`🎉 Build completed successfully!`)
    console.log(`📊 Statistics:`)
    console.log(`   - Registries processed: ${allRegistries.length}`)
    console.log(`   - Total components: ${totalProcessed}`)
    console.log(``)
    console.log(`🔍 Test your registries:`)
    if (allRegistries.length === 1 && registryFiles[0].endsWith('registry.json')) {
      console.log(`   curl http://localhost:3000/r/index.json`)
    } else {
      console.log(`   curl http://localhost:3000/r/registries.json`)
      allRegistries.forEach(reg => {
        console.log(`   curl http://localhost:3000/r/${reg.name}/index.json`)
      })
    }
    
  } catch (error) {
    console.error('❌ Failed to build registries:', error)
    process.exit(1)
  }
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

// Run the build
if (import.meta.main) {
  buildAllRegistries()
}

export { buildAllRegistries }