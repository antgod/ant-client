import React from 'react'
import { Router, Switch, Route, Redirect } from 'dva/router'
import dynamic from 'dva/dynamic'
import Apply from '../page/apply'
import applyAction from '../actions/apply'
import List from '../page/list'
import listAction from '../actions/list'
import Routes from '../page/route'
import routeAction from '../actions/route'
import Forbid from '../page/forbid'
import Guide from '../../components/Guide'

function RouterConfig({ history, app }) {
  const RoutePage = dynamic({
    app,
    models: () => [routeAction],
    component: () => Routes,
  })

  const ApplyPage = dynamic({
    app,
    models: () => [applyAction],
    component: () => Apply,
  })

  const ListPage = dynamic({
    app,
    models: () => [listAction],
    component: () => List,
  })

  return (
    <div>
      <Guide></Guide>
      <Router history={history}>
        <Switch>
          <Route path="/route" component={RoutePage} />
          <Route path="/apply" component={ApplyPage} />
          <Route path="/forbid" component={Forbid} />
          <Route path="/list" component={ListPage} />
          <Route render={() => <Redirect to="/route" />} />
        </Switch>
      </Router>
    </div>
  )
}

export default RouterConfig
