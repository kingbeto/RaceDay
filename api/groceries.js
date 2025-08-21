const fs = require('fs')
const path = require('path')

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    if (req.method === 'GET') {
      const { weekId } = req.query
      
      // Load grocery data from JSON file
      const dataPath = path.join(process.cwd(), 'app', 'data', 'grocery-lists.json')
      
      if (!fs.existsSync(dataPath)) {
        return res.status(404).json({
          success: false,
          error: 'Grocery data not found'
        })
      }
      
      const rawData = fs.readFileSync(dataPath, 'utf8')
      const groceryData = JSON.parse(rawData)
      
      if (weekId) {
        // Return grocery list for specific week
        const weekGroceries = groceryData[weekId]
        
        if (weekGroceries) {
          res.status(200).json({
            success: true,
            data: weekGroceries
          })
        } else {
          res.status(404).json({
            success: false,
            error: `No grocery list found for week ${weekId}`
          })
        }
      } else {
        // Return all grocery data
        res.status(200).json({
          success: true,
          data: groceryData
        })
      }
    } else {
      res.status(405).json({
        success: false,
        error: 'Method not allowed'
      })
    }
  } catch (error) {
    console.error('Error in groceries API:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}
