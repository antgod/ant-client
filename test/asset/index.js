import dva from 'dva'
import createLoading from 'dva-loading'
import Router from './router'
import '../common/patch'
import './index.less'

const app = dva()

app.use(createLoading())

app.router(Router)

app.start('#react-content')
