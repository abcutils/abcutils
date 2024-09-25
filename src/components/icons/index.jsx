
import RegExp from './regexp'
import JSON from './json'
import XML from './xml'
import HTML from './html'
import CSS from './css'
import JS from './js'
import SQL from './sql'
import EyeDropper from './eye-dropper'

function createIcon(Component){
  return function(props){
    const color = props.color || 'inherit'
    const height = props.size || 16;
    const width = props.size || 16;
    return <Component style={{color, height, width}} />
  }
}
// https://yesicon.app/bi/regex
export default {
  RegExp: createIcon(RegExp),
  JSON: createIcon(JSON),
  XML: createIcon(XML),
  HTML: createIcon(HTML),
  CSS: createIcon(CSS),
  JS: createIcon(JS),
  SQL: createIcon(SQL),
  EyeDropper: createIcon(EyeDropper)
}