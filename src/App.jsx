import Home from './Pages/Home'
import {Route,Routes} from 'react-router-dom'
import SingleProducts from './Pages/SingleProducts'

function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/details/:productId' element={<SingleProducts/>}></Route>
      </Routes>
    </div>
  )
}

export default App