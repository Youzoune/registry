import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } },
) {
  try {
    const { name } = params
    const filePath = path.join(process.cwd(), 'public/r', `${name}.json`)

    // Check if the file exists
    try {
      const data = await fs.readFile(filePath, 'utf8')
      const json = JSON.parse(data)

      return NextResponse.json(json, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    } catch (_) {
      return NextResponse.json(
        { error: `Registry item '${name}' not found` },
        {
          status: 404,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
