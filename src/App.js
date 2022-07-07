import './App.css';
import json from './assets/data/input.json';
import Home from './pages/Home';

function App() {

  /**
   * First, transform start in minutes (- 539 for starting at 9am), get stop minute of event and sort to get all event by start
   * @type {Array[Object]}
   */
  const jsonFormatted = json.map((el) => {
    const splitStart = el.start.split(':');
    const newStart = (parseInt(splitStart[0], 10) * 60 + parseInt(splitStart[1], 10) - 539);
    const stop = newStart + el.duration;
    return {
      ...el,
      start: newStart,
      height: stop - newStart,
      stop
    }
  }).sort((a, b) => a.start - b.start);

  /**
   * Initialize agenda object with first element and column position 1
   * @type {Array[Object]}
   */
  let agenda = [{
    ...jsonFormatted[0],
    column: 1
  }]
  
  /**
   * For each element, get his column number by checking the other element near and push it in agenda Array
   */
  jsonFormatted.slice(1).forEach((element) => {
    const column = calculColumn(agenda, element);
    
    agenda.push({
      ...element,
      column,
    })
  })
  
  /**
   * if checkPositin return true, column ++ and if checkPosition return false, return column
   * @param {Array[Object]} array 
   * @param {Object} element 
   * @returns {number}
   */
  function calculColumn(array, element){
    let column = 1;
    while(checkPosition(array, element, column)){
      column++
    }
    return column
  }
  
  /**
   * For each element in array, check if element.start < elementInArray.stop and column === elementInArray.column
   * return true if it is and false if not
   * @param {Array[Object]} array 
   * @param {Object} element 
   * @param {number} column 
   * @returns {Boolean}
   */
  function checkPosition(array, element, column){
    return array.some((el) => {
      return element.start < el.stop && column === el.column
    })
  }

  return <Home className='home' agenda={agenda} />
}

export default App;
