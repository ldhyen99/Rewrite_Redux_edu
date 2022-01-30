import React from 'react';

import StoreContainer from './Redux/storeContainer';
import { reducer } from './Redux/store/reducers';
import { GeneralizedComponent } from './Components/GeneralizedComponent';

let StoreContainedGeneralizedComponent = StoreContainer(GeneralizedComponent, {
  reducer,
});

function App() {
  return <StoreContainedGeneralizedComponent myProp="foo" />;
}

export default App;
