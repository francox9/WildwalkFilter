import { h, render } from 'preact';
import './style.scss'
import App from './App.jsx'

const box = document.querySelector('.wt-boxes-container'),
    container = document.createElement('div')

box.insertBefore(container, box.firstChild)

render((
    <App/>
), container);
