import dva123 from 'dva'
import createLoading from 'dva-loading'
// import List from './page/list'
import listAction from './actions/list'

// const app = dva({})

// app.router(() => null)

app.model(listAction)

// app.start('#react-content')
