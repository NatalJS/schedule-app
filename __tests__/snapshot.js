import React from 'react';
import renderer from 'react-test-renderer';

import Store from '../src/Store';
import Schedule from '../src/components/Schedule';

const mockData = require('./mock.json');

test('Snapshot testing', () => {
  const data = mockData;
  const component = renderer.create(
    <Store data={data}>
      {store => <Schedule store={store} />}
    </Store>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
