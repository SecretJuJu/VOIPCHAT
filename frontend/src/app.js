const {app, BrowserWindow,systemPreferences} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  console.log("ask for media access")
  systemPreferences.askForMediaAccess("microphone").then(res1=>{
    console.log(res1)
    systemPreferences.askForMediaAccess("camera").then(res2=>{
      console.log(res2)
    }).catch(err => {console.log(err)})
  }).catch(err => {console.log(err)})
  mainWindow.loadFile('index.html')
  
}



app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    
    if (BrowserWindow.getAllWindows().length === 0) createWindow()

    const win = new BrowserWindow()
    win.webContents.openDevTools()
    
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
