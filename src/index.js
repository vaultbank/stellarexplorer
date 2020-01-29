import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const key = 'THEME'

function setTheme(theme) {
    require(`./css/${theme}.css`)
    localStorage.setItem(key, theme)
}

function getTheme(){
    const theme = localStorage.getItem(key)
    if(theme && (theme === 'light' || theme === 'dark')){
         require(`./css/${theme}.css`)
    }
    else {
        setTheme('dark')
    }
}
const {hash} = window.location
if(hash){
    const hashList = hash.split('#')
    let theme = ''
    if(hashList.length > 2){
        theme = hashList[hashList.length -1]
    } else {
        theme = hash.replace('#', '')
    }
    try {
        setTheme(theme)
    } catch(err){
        getTheme()
    }
} else {
    getTheme()
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
