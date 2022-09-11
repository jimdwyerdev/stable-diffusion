import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import {PythonShell} from 'python-shell'

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('generate', (event, arg) => {
  console.log('--generate--')

  const path = require('node:path')
  
  // old way to access python script
  // const spawn = require("child_process").spawn
  // const newPath = path.join(app.getAppPath(), 'scripts/main.py')
  // const pythonProcess = spawn('python', [newPath, arg], { stdio: 'inherit' })
  // pythonProcess.stdout.on('data', (data) => {
  //   console.log('pythong exec')
  //   console.log('python script data', data)
  // })
  // pythonProcess.on('close', (code) => {
  //   console.log(`child process close all stdio with code ${code}`)
  // })

  let options = {
    mode: 'text',
    pythonPath: 'C:\\Users\\NORAD\\AppData\\Local\\Programs\\Python\\Python310\\python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: path.join(app.getAppPath(), 'scripts'),
    args: [JSON.stringify(arg)]
  }
  
  PythonShell.run('main.py', options, function (err, results) {
    // results is an array consisting of messages collected during execution
    event.sender.send('generate', {result: err ? "error" : "success", data: results})
  })

})
