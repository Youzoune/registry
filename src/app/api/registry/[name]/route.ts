import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } },
) {
  try {
    const { name } = params

    // Lire le fichier registry.json
    const registryPath = path.join(process.cwd(), 'registry.json')
    const registryContent = fs.readFileSync(registryPath, 'utf8')
    const registry = JSON.parse(registryContent)

    // Trouver l'élément demandé
    const item = registry.registry.find((item: any) => item.name === name)

    if (!item) {
      return NextResponse.json(
        { error: 'Registry item not found' },
        { status: 404 },
      )
    }

    // Lire le contenu des fichiers
    const filesWithContent = item.files.map((file: any) => {
      const filePath = path.join(process.cwd(), file.path)

      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8')
        return {
          ...file,
          content,
          target: file.target || `components/${path.basename(file.path)}`,
        }
      }

      return {
        ...file,
        content: file.content || '',
        target: file.target || `components/${path.basename(file.path)}`,
      }
    })

    // Retourner l'élément avec le contenu des fichiers
    const result = {
      ...item,
      files: filesWithContent,
    }

    return NextResponse.json(result, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('Error serving registry item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
